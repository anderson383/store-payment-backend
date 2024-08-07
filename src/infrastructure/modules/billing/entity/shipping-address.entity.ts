import {
  Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../../../config/entity/base.entity';
import { CustomerEntity } from './customer.entity';
import { ProductEntity } from '../../inventary/entities/product.entity';


@Entity({ name: 'ShippingAddress' })
export class ShippingAddressEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    phone: string;

  @Column()
    address: string;

  @Column()
    deparment: string;

  @Column()
    city: string;

  @ManyToOne(() => ProductEntity)
    product: ProductEntity

  @ManyToOne(() => CustomerEntity)
    customer: CustomerEntity

  @Column()
    customerId: string

  @Column({
    nullable: true
  })
    productId: string
}

