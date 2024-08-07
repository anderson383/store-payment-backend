import {
  Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../../../config/entity/base.entity';
import { ShippingAddress } from 'src/domain/models/shipping-address';
import { ShippingAddressEntity } from './shipping-address.entity';


@Entity({ name: 'Transaction' })
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
  reference: string;

  @Column({ unique: true, nullable: true })
  referenceProvider: string

  @Column()
  mount: number

  @Column()
  quantity: number

  @Column()
  status_transaction: string;

  @ManyToOne(() => ShippingAddressEntity)
  shipping: ShippingAddressEntity

  @Column({
    nullable: true
  })
  shippingId: string
}

