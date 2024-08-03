import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product/product.controller';
import { ProductDao } from 'src/domain/product/dao/product.dao';
import { ProductDaoService } from './adapters/dao/product/product-dao.service';

@Module({
  providers: [
    {
      provide: ProductDao,
      useClass: ProductDaoService
    }
  ],
  controllers: [
    ProductController
  ]
})
export class InventaryModule {}
