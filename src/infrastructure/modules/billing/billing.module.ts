import { Module } from '@nestjs/common';
import { BillingController } from './controllers/customer.controller';
import { CustomerRepository } from 'src/domain/ports/billing/repository/customer.repository';
import { CustomerService } from './adapter/repository/customer.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ShippingAddressRepository } from 'src/domain/ports/billing/repository/shipping-address.repository';
import { ShippingAddressService } from './adapter/repository/shipping-address.service';
import { CreatePaymentHandler } from 'src/application/comanders/billing/create-payment.handler';
import { PaymentRepository } from 'src/domain/ports/billing/repository/payment.repository';
import { PaymentService } from './adapter/repository/payment.service';
import { TransactionRepository } from 'src/domain/ports/billing/repository/transaction.repository';
import { TransactionService } from './adapter/repository/transaction.service';
import { TransactionDao } from 'src/domain/ports/billing/dao/transaction.dao';
import { TransactionDaoService } from './adapter/dao/transaction-dao.service';
import { InventaryModule } from '../inventary/inventary.module';
import { CallbackPaymentHandler } from 'src/application/comanders/billing/callback-payment.handler';

@Module({
  imports: [
    CqrsModule,
    InventaryModule
  ],
  providers: [
    CreatePaymentHandler,
    CallbackPaymentHandler,
    {
      provide: CustomerRepository,
      useClass: CustomerService
    },
    {
      provide: ShippingAddressRepository,
      useClass: ShippingAddressService
    },
    {
      provide: PaymentRepository,
      useClass: PaymentService
    },
    {
      provide: TransactionRepository,
      useClass: TransactionService
    },
    {
      provide: TransactionDao,
      useClass: TransactionDaoService
    }
  ],
  controllers: [BillingController]
})
export class BillingModule {}

