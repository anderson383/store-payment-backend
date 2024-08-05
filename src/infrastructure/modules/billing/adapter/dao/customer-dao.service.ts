
import {EntityManager} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CustomerDao } from 'src/domain/ports/billing/dao/customer.dao';

@Injectable()
export class CustomerDaoService implements CustomerDao {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

}
