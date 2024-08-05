import {
  Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../../../config/entity/base.entity';
import { CustomerEntity } from './customer.entity';


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

  @ManyToOne(() => CustomerEntity)
    customer: CustomerEntity

  @Column()
    customerId: string
}

