import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ProductDao } from "src/domain/ports/inventary/dao/product.dao";
import { DetailProductQuery } from "./detail-product.query";


@QueryHandler(DetailProductQuery)
export class DetailProductHandler  implements IQueryHandler<DetailProductQuery>{

  constructor (private readonly _productDao: ProductDao) {

  }

  async execute (query: DetailProductQuery) {
    return this._productDao.detailProduct(query.id)
  }
}