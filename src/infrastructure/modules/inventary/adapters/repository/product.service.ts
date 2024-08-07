
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { PaymentDto } from 'src/application/comanders/dtos/customer.dto';
import { Customer } from 'src/domain/models/customer';
import { CustomerRepository } from 'src/domain/ports/billing/repository/customer.repository';
import { ProductRepository } from 'src/domain/ports/inventary/repository/product.repository';
import { ProductEntity } from '../../entities/product.entity';

export class ProductService implements ProductRepository {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async updateStock(id: string, stock: number): Promise<string> {
    const result = await this.entityManager
      .createQueryBuilder()
      .update(ProductEntity)
      .set({
        stock: stock,
      })
      .where("id = :id", { id })
      .returning('*')
      .execute();

    return 'update'
  }
}
