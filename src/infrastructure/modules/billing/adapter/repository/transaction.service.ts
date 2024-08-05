
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { TransactionRepository } from 'src/domain/ports/billing/repository/transaction.repository';
import { TransactionEntity } from '../../entity/transaction.entity';
import { TransactionDao } from 'src/domain/ports/billing/dao/transaction.dao';
import { STATUS_TRANSACTION } from 'src/infrastructure/config/constants/status_transactions';

@Injectable()
export class TransactionService implements TransactionRepository {
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    private transactionDao:TransactionDao
  ) {}

  async initReference(): Promise<string> {
    const lastReference = await this.transactionDao.getLastTransactionReference()

    let newReferenceNumber: number;
    if (lastReference) {
      const lastNumber = parseInt(lastReference.replace('STORE_PAY', ''), 10);
      newReferenceNumber = lastNumber + 1;
    } else {
      newReferenceNumber = 1;
    }
    const newReferenceStr = `STORE_PAY${newReferenceNumber.toString().padStart(8, '0')}`;

    await this.createTransaction(newReferenceStr)
    return newReferenceStr
  }


  async createTransaction(reference:string):Promise<boolean> {
    await this.entityManager
      .createQueryBuilder()
      .insert()
      .into(TransactionEntity)
      .values({
        reference: reference,
        status_transaction: STATUS_TRANSACTION.START
      })
      .execute();
  
    return true
  }
}

