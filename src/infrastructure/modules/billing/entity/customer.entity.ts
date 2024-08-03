import {
  Column, Entity, ManyToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { BaseEntity } from '../../../config/entity/base.entity';


@Entity({ name: 'Customer' })
export class CustomerEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    name: string;

  @Column()
    lastname: string;

  @Column()
    email: string;
}

