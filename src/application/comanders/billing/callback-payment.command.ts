import { CallbackPaymentDto, PaymentDto } from "src/application/comanders/dtos/customer.dto";

export class CallbackPaymentCommand {
  constructor(
      public readonly payment: CallbackPaymentDto
  ) {
  }
}
