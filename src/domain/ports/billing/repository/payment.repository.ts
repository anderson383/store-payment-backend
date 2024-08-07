import { CreditCardDto } from "src/application/comanders/dtos/customer.dto";
import { TransactionResponseType } from "src/infrastructure/config/types/provider-payment";


export abstract class PaymentRepository {
  abstract _reference: string;
  abstract tokenizeTarjetCard(creditCardData: CreditCardDto): Promise<void>;
  abstract getObtainToken(): Promise<string | void>;
  abstract generateSignature(): Promise<string | void>;
  abstract createTransaction(email:string): Promise<TransactionResponseType>;
  abstract getStatusTransaction(idTransaction: string): Promise<string>;

  set reference(reference: string) {
    this._reference = reference
  }
}