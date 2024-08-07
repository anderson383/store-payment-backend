import {
  Column, Entity
} from 'typeorm';
import { BaseEntity } from 'src/infrastructure/config/entity/base.entity';

@Entity({ name: 'Product' })
export class ProductEntity extends BaseEntity {
  @Column({
    length: 100,
    type: 'varchar'
  })
    name: string;
  @Column({type: 'text'})
    description: string;

  @Column({type: 'int'})
  stock: number;

  @Column({type: 'int'})
  price: number;

  @Column({
    type: 'text',
    array: true
  })
    images: string[];
}
