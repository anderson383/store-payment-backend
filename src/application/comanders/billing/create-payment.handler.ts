import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import {  BadRequestException } from '@nestjs/common';
import { CustomerRepository } from 'src/domain/ports/billing/repository/customer.repository';
import { CreatePaymentCommand } from "./create-payment.command";
import { ShippingAddressRepository } from "src/domain/ports/billing/repository/shipping-address.repository";
import { PaymentRepository } from "src/domain/ports/billing/repository/payment.repository";
import { TransactionRepository } from "src/domain/ports/billing/repository/transaction.repository";
import { ProductDao } from "src/domain/ports/inventary/dao/product.dao";
import { ProductRepository } from "src/domain/ports/inventary/repository/product.repository";
import { STATUS_CODES } from "http";
import { STATUS_TRANSACTION } from "src/infrastructure/config/constants/status_transactions";

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler implements ICommandHandler<CreatePaymentCommand>{

  transactionId: string;

  constructor(
    private readonly _repositoryCustomer: CustomerRepository,
    private readonly _repositoryShippingAddress: ShippingAddressRepository,
    private readonly _paymentRepository: PaymentRepository,
    private readonly _transactionRepository: TransactionRepository,
    private readonly _productDaoService: ProductDao,
    private readonly _productService: ProductRepository
  ) {}


  async execute({ payment }: CreatePaymentCommand) {
    const { customer, shippingAddress, creditCard, product } = payment
    this._transactionRepository.setMountsQuantity(creditCard.amount, product.quantity)
    const newTransaction = await this._transactionRepository.initReference()
    try {
      const productData = await this._productDaoService.detailProduct(product.id)
      this._paymentRepository.reference = newTransaction.reference
  
      await this._paymentRepository.tokenizeTarjetCard(creditCard)
  
      await this._paymentRepository.getObtainToken()
  
      await this._paymentRepository.generateSignature()
  
      const transactionProvider = await this._paymentRepository.createTransaction(customer.email)
  
      this._productService.updateStock(productData.id, productData.stock - product.quantity)
      const customerSaved = await this._repositoryCustomer.create(customer)
  
      const shippingData = await this._repositoryShippingAddress.create({
        address: shippingAddress.address,
        city: shippingAddress.city,
        customerId:customerSaved.id,
        deparment: shippingAddress.deparment,
        phone: shippingAddress.phone,
        productId: productData.id
      })
      
      await this._transactionRepository.updateTransaction(newTransaction.id, {
        referenceProvider: transactionProvider.data.id,
        status_transaction: transactionProvider.data.status,
        shippingId: shippingData.id
      })
  
      return {
        transactionId: newTransaction.id,
        transactionProviderId: transactionProvider.data.id,
        productId: productData.id
      }
    } catch (error) {
      await this._transactionRepository.updateTransaction(newTransaction.id, {
        status_transaction: STATUS_TRANSACTION.REJECTED
      })
      return new BadRequestException({ status: STATUS_TRANSACTION.REJECTED, 'message': 'Payment rejected' })
    }
  }
}
