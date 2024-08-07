import { PaymentDto } from "src/application/comanders/dtos/customer.dto";
import { Customer } from "src/domain/models/customer";

export abstract class ProductRepository {
  abstract updateStock(id: string, stock: number): Promise<string>;
}
