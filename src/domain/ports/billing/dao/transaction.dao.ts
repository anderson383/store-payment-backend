import { Transaction } from "src/domain/models/transaction";


export abstract class TransactionDao {
  abstract getLastTransactionReference(): Promise<string>;
  abstract getTransaction (id:string):Promise<Transaction>
}
