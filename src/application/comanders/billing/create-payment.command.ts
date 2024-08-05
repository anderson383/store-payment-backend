import { PaymentDto } from "src/application/comanders/dtos/customer.dto";

export class CreatePaymentCommand {
  constructor(
      public readonly payment: PaymentDto
  ) {
  }
}
