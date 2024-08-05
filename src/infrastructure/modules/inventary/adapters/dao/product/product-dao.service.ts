import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
@Injectable()
export class ProductDaoService  {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  listProductForCategory(idCategory:string): Promise<any[]> {
    const query = this.entityManager
      .createQueryBuilder<any>('Product', 'prod')
      .select(['prod.id', 'prod.name', 'prod.description', 'prod.images'])
      .where('prod.category = :category', {category: idCategory});

    return query.getMany();
  }
}
