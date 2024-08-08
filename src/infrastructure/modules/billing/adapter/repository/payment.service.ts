import { Injectable } from '@nestjs/common';
import { PaymentRepository } from 'src/domain/ports/billing/repository/payment.repository';
import axios, { AxiosHeaders, AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/infrastructure/config/env/env-variables.enum';
import { Logger } from '@nestjs/common';
import { AcceptanceTokenType, TokenizePaymentType, TransactionDetailResponse, TransactionResponseType } from 'src/infrastructure/config/types/provider-payment';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { CreditCardDto } from 'src/application/comanders/dtos/customer.dto';
import { CreditCard } from 'src/domain/models/credit-card';
const logger = new Logger('PaymentService');

@Injectable()
export class PaymentService implements PaymentRepository {
  private endpointProvider: string;
  private headers: (RawAxiosRequestHeaders) | AxiosHeaders;
  private providerKey:string;
  private providerIntegrity: string;
  private acceptanceToken: string = '';
  private signature: string = '';
  private creditCard: CreditCard;
  private tokenizePayment: TokenizePaymentType['data']
  private currency: string = 'COP'
  _reference: string = '';

  constructor(private config: ConfigService) {
    this.endpointProvider = this.config.get<string>(EnvVariables.PROVIDER_PAYMENT);
    this.providerKey = this.config.get<string>(EnvVariables.PROVIDER_KEY);
    this.providerIntegrity = this.config.get<string>(EnvVariables.PROVIDER_INTEGRITY);
    this.headers = {
      Authorization: `Bearer ` + this.providerKey
    }
  }

  async tokenizeTarjetCard(creditCardData: CreditCardDto): Promise<void> {
    try {
      this.creditCard = new CreditCard(
        creditCardData.number,
        creditCardData.cvc,
        creditCardData.expiry,
        creditCardData.name,
        creditCardData.cuotes,
        creditCardData.amount
      );
      logger.log('Sending tarjet card to provider: ');
      const { data: { data } } = await axios.post<TokenizePaymentType>(`${this.endpointProvider}/v1/tokens/cards`, {
          ...this.creditCard.getCreditCard()
      }, { headers: { ...this.headers } })

      this.tokenizePayment = data
    } catch(err) {
      logger.fatal('Error sending tarjet card to provider: ');
      console.error(err.response.data.error)
      throw new Error(err.response.data.error)
    }
  }

  async getObtainToken(): Promise<string | void> {
    try {
      logger.log('Get token from provider');
      const { data: { data } } = await axios.get<AcceptanceTokenType>(`${this.endpointProvider}/v1/merchants/${this.providerKey}`)

      this.acceptanceToken = data.presigned_acceptance.acceptance_token
      return this.acceptanceToken
    } catch(err) {
      logger.fatal('Error get token from provider');
      console.error(err)
      throw new Error(err.response.data.error)
    }
  }

  async generateSignature () {
    const encondedText = new TextEncoder().encode(`${this._reference}${this.creditCard.amount}${this.currency}${this.providerIntegrity}`);
    const hashBuffer = await (crypto as any).subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    this.signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return this.signature
  } 

  async createTransaction(email:string): Promise<TransactionResponseType> {
    try {
      logger.log('Create transaction: ');
      const { data } = await axios.post<TransactionResponseType>(`${this.endpointProvider}/v1/transactions`, {
        "amount_in_cents": this.creditCard.amount,
        "reference": this._reference,
        "currency": this.currency,
        "customer_email": email,
        "signature": this.signature,
        "acceptance_token": this.acceptanceToken,
        "payment_method": {
            "type": "CARD",
            "installments": this.creditCard.installments,
            "token": this.tokenizePayment.id,
        }
    }, { headers: { ...this.headers } })
      return data;
    } catch(err) {
      logger.fatal('Error create transactions: ');
      console.error(err.response.data.error)
      throw new Error(err.response.data.error)
    }
  }

  async getStatusTransaction(idTransaction: string): Promise<string> {
    try {
      logger.log('Create transaction: ');
      const { data } = await axios.get<TransactionDetailResponse>(`${this.endpointProvider}/v1/transactions/${idTransaction}`, { headers: { ...this.headers } })
      logger.log('Status transaction: ', data.data.status);
      return data.data.status;
    } catch(err) {
      logger.fatal('Error create transactions: ');
      console.error(err.response.data.error)
      throw new Error(err.response.data.error)
    }
  }

  set reference(reference: string) {
    this._reference = reference
  }
}

