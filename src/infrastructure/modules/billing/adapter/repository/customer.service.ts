
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CustomerEntity } from '../../entity/customer.entity';
import { CustomerDto, PaymentDto } from 'src/application/comanders/dtos/customer.dto';
import { Customer } from 'src/domain/models/customer';
import { CustomerRepository } from 'src/domain/ports/billing/repository/customer.repository';

export class CustomerService implements CustomerRepository {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async create(customerData: CustomerDto): Promise<Customer> {
    const result = await this.entityManager
      .createQueryBuilder()
      .insert()
      .into(CustomerEntity)
      .values({
        name: customerData.name,
        email: customerData.email,
        lastname: customerData.lastname
      })
      .returning('*') 
      .execute();

    const insertCust = result.raw[0];
    return new Customer(insertCust.id, insertCust.name, insertCust.lastname, insertCust.email);
  }
}
