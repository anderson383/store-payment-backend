import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product/product.controller';
import { ProductDaoService } from './adapters/dao/product/product-dao.service';

@Module({
  providers: [
  ],
  controllers: [
    ProductController
  ]
})
export class InventaryModule {}
