import {
  Body,
  Controller, Get, Param, Post, Request, UseGuards, Query, Res
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePaymentCommand } from 'src/application/comanders/billing/create-payment.command';
import { PaymentDto } from 'src/application/comanders/dtos/customer.dto';

@Controller('billing/payment')
export class CustomerController {

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
}
