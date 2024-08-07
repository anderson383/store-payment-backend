import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { ListProductQuery } from "./list-products.query";
import { ProductDao } from "src/domain/ports/inventary/dao/product.dao";


@QueryHandler(ListProductQuery)
export class ListProductHandler  implements IQueryHandler<ListProductQuery>{

  constructor (private readonly _productDao: ProductDao) {

  }

  async execute (query: ListProductQuery) {
    return this._productDao.listProduct()
  }
}