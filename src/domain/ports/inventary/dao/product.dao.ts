import { ProductEntity } from "src/infrastructure/modules/inventary/entities/product.entity";


export abstract class ProductDao {
  abstract listProduct(): Promise<any[]> 
  abstract detailProduct(id:string): Promise<ProductEntity> 
}
