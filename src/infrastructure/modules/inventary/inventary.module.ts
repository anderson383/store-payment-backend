import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product/product.controller';
import { ProductDaoService } from './adapters/dao/product/product-dao.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ListProductHandler } from 'src/application/queries/inventary/list-products.handler';
import { ProductDao } from 'src/domain/ports/inventary/dao/product.dao';
import { DetailProductHandler } from 'src/application/queries/inventary/detail-product.handler';
import { ProductRepository } from 'src/domain/ports/inventary/repository/product.repository';
import { ProductService } from './adapters/repository/product.service';

@Module({
  imports: [
    CqrsModule,
  ],
  providers: [
    ListProductHandler,
    DetailProductHandler,
    {
      provide: ProductDao,
      useClass: ProductDaoService,
    },
    {
      provide: ProductRepository,
      useClass: ProductService
    }
  ],
  controllers: [
    ProductController
  ],
  exports: [
    {
      provide: ProductDao,
      useClass: ProductDaoService,
    },
    {
      provide: ProductRepository,
      useClass: ProductService
    }
  ]
})
export class InventaryModule {}
