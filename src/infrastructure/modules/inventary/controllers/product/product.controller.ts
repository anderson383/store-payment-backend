import {
  Controller, Get, Param
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { DetailProductQuery } from 'src/application/queries/inventary/detail-product.query';
import { ListProductQuery } from 'src/application/queries/inventary/list-products.query';

@Controller('product')
export class ProductController {
  constructor(
    private query: QueryBus
  ) {}

  @Get()
  listProducts() {
    return this.query.execute(
      new ListProductQuery()
    )
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.query.execute(
      new DetailProductQuery(
        id
      )
    )
  }
}
