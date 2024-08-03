
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CustomerEntity } from '../../entity/customer.entity';
import { CustomerRepository } from 'src/domain/user/repository/customer.repository';

export class CustomerService implements CustomerRepository {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async create(user: any): Promise<any> {
    await this.entityManager
      .createQueryBuilder()
      .insert()
      .into(CustomerEntity)
      .values({
        name: user.fullName,
        email: user.email,

      })
      .execute();

    return 'Customer creado correctamente :)';
  }
}
