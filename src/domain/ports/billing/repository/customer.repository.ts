import { CustomerDto, PaymentDto } from "src/application/comanders/dtos/customer.dto";
import { Customer } from "src/domain/models/customer";

export abstract class CustomerRepository {
  abstract create(customer: CustomerDto): Promise<Customer>;
}
