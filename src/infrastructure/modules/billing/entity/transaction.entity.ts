import {
  Column, Entity, ManyToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../../../config/entity/base.entity';


@Entity({ name: 'Transaction' })
export class TransactionEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ unique: true })
  reference: string;


  @Column()
  status_transaction: string;
}

