import { Module } from '@nestjs/common';
import { CustomerController } from './controllers/customer.controller';

@Module({
  providers: [],
  controllers: [CustomerController]
})
export class BillingModule {}

