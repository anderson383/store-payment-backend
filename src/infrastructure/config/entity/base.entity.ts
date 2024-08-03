import {
  Column, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP'
  })
    created_date: Date;

  @Column({
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'NOW()'
  })
    updated_date: Date;

  @Column({default: true})
    status: boolean;

  // @ManyToOne(() => UserEntity, {nullable: true})
  //   created_user: UserEntity;

  // @ManyToOne(() => UserEntity, {nullable: true})
  //   updated_user: UserEntity;
}
