import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CustomerRepository } from 'src/domain/ports/billing/repository/customer.repository';
import { CreatePaymentCommand } from "./create-payment.command";
import { ShippingAddressRepository } from "src/domain/ports/billing/repository/shipping-address.repository";
import { PaymentRepository } from "src/domain/ports/billing/repository/payment.repository";
import { TransactionRepository } from "src/domain/ports/billing/repository/transaction.repository";


@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler implements ICommandHandler<CreatePaymentCommand>{

  constructor(
    private readonly _repositoryCustomer: CustomerRepository,
    private readonly _repositoryShippingAddress: ShippingAddressRepository,
    private readonly _paymentRepository: PaymentRepository,
    private readonly _transactionRepository: TransactionRepository
  ) {}


  async execute({ payment }: CreatePaymentCommand) {

    const { customer, shippingAddress, creditCard } = payment

    const newReference = await this._transactionRepository.initReference()
    this._paymentRepository.reference = newReference

    await this._paymentRepository.tokenizeTarjetCard(creditCard)

    await this._paymentRepository.getObtainToken()

    await this._paymentRepository.generateSignature()

    const transaction = await this._paymentRepository.createTransaction(customer.email)

    console.log(payment)
    // const { customer } = command
    // const customerSaved = await this._repositoryCustomer.create(customer)

    // const shippingAddress = await this._repositoryShippingAddress.create({
    //   address: customer.address,
    //   city: customer.city,
    //   customerId:customerSaved.id,
    //   deparment: customer.deparment,
    //   phone: customer.phone
    // })

    // customerSaved.addressShipping = [ shippingAddress ]
    
    return ''
  }
}
