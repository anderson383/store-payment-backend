import {
  Body,
  Controller, Get, Param, Post, Request, UseGuards, Query, Res
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CallbackPaymentCommand } from 'src/application/comanders/billing/callback-payment.command';
import { CreatePaymentCommand } from 'src/application/comanders/billing/create-payment.command';
import { CallbackPaymentDto, PaymentDto } from 'src/application/comanders/dtos/customer.dto';

@Controller('billing/payment')
export class BillingController {

  constructor (
    private command: CommandBus,
    private query: QueryBus
  ) {

  }

  @Post()
  create(@Body() customerData: PaymentDto) {
    return this.command.execute(
      new CreatePaymentCommand(customerData)
    );
  }

  @Post('/callback')
  callbackPayment(@Body() customerData: CallbackPaymentDto) {
    return this.command.execute(
      new CallbackPaymentCommand(customerData)
    )
  }
}
