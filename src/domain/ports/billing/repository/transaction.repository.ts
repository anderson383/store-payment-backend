import { Transaction } from "src/domain/models/transaction";

export interface UpdateTransactionData {
  referenceProvider?: string;
  status_transaction?: string;
  shippingId?: string
}
export abstract class TransactionRepository {
  abstract initReference(): Promise<Transaction>;
  abstract updateTransaction(id:string, data:UpdateTransactionData):Promise<Transaction>
  abstract setMountsQuantity(mount: number, quantity: number): void;
}
