import { CreditCardDto } from "src/application/comanders/dtos/customer.dto";


export abstract class PaymentRepository {
  abstract _reference: string;
  abstract tokenizeTarjetCard(creditCardData: CreditCardDto): Promise<void>;
  abstract getObtainToken(): Promise<string | void>;
  abstract generateSignature(): Promise<string | void>;
  abstract createTransaction(email:string): Promise<void>;

  set reference(reference: string) {
    this._reference = reference
  }
}