import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { ProductDao } from 'src/domain/ports/inventary/dao/product.dao';
import { ProductEntity } from '../../../entities/product.entity';
@Injectable()
export class ProductDaoService implements ProductDao {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  listProduct(): Promise<any[]> {
    const query = this.entityManager
      .createQueryBuilder<any>('Product', 'prod')
      .select(['prod.id', 'prod.name', 'prod.description', 'prod.images', 'prod.stock', 'prod.price'])

    return query.getMany();
  }

  detailProduct(id:string): Promise<ProductEntity> {
    const query = this.entityManager
      .createQueryBuilder<ProductEntity>('Product', 'prod')
      .select(['prod.id', 'prod.name', 'prod.description', 'prod.images', 'prod.stock', 'prod.price'])
      .where('prod.id = :id', { id })

    return query.getOne();
  }
}
