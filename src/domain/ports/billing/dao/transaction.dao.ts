import { PaymentDto } from "src/application/comanders/dtos/customer.dto";
import { Customer } from "src/domain/models/customer";

export abstract class TransactionDao {
  abstract getLastTransactionReference(): Promise<string>;
}
