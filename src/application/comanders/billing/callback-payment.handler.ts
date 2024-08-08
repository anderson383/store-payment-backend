import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { PaymentRepository } from "src/domain/ports/billing/repository/payment.repository";
import { TransactionRepository } from "src/domain/ports/billing/repository/transaction.repository";
import { ProductDao } from "src/domain/ports/inventary/dao/product.dao";
import { ProductRepository } from "src/domain/ports/inventary/repository/product.repository";
import { STATUS_TRANSACTION } from "src/infrastructure/config/constants/status_transactions";
import { TransactionDao } from "src/domain/ports/billing/dao/transaction.dao";
import { CallbackPaymentCommand } from "./callback-payment.command";

@CommandHandler(CallbackPaymentCommand)
export class CallbackPaymentHandler implements ICommandHandler<CallbackPaymentCommand>{

  transactionId: string;

  constructor(
    private readonly _paymentRepository: PaymentRepository,
    private readonly _transactionRepository: TransactionRepository,
    private readonly _productDaoService: ProductDao,
    private readonly _productService: ProductRepository,
    private readonly _transactionDao: TransactionDao
  ) {}


  async execute(callbackData: CallbackPaymentCommand) {
    const { transactionId, transactionProviderId, productId } = callbackData.payment
    try {
      const transactionData = await this._transactionDao.getTransaction(transactionId)
      const productData = await this._productDaoService.detailProduct(productId)
      let statusTransactionProvider;
      let countCallback = 0

      while (countCallback<=20) {
        statusTransactionProvider = await this._paymentRepository.getStatusTransaction(transactionProviderId)
        if (statusTransactionProvider === STATUS_TRANSACTION.APPROVED) countCallback = 21
        countCallback++;
      }
      if (transactionData.status_transaction === STATUS_TRANSACTION.PENDING) {
        await this._transactionRepository.updateTransaction(transactionId, {
          status_transaction: statusTransactionProvider,
        })
        
        if (statusTransactionProvider === STATUS_TRANSACTION.APPROVED) {
          this._productService.updateStock(productData.id, productData.stock - transactionData.quantity)
        }
      }
  
      return statusTransactionProvider
    } catch (error) {
      await this._transactionRepository.updateTransaction(transactionId, {
        status_transaction:  STATUS_TRANSACTION.REJECTED
      })
      return STATUS_TRANSACTION.REJECTED
    }
  }
}
