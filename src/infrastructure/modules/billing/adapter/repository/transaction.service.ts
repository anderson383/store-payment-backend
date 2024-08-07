
import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { TransactionRepository, UpdateTransactionData } from 'src/domain/ports/billing/repository/transaction.repository';
import { TransactionEntity } from '../../entity/transaction.entity';
import { TransactionDao } from 'src/domain/ports/billing/dao/transaction.dao';
import { STATUS_TRANSACTION } from 'src/infrastructure/config/constants/status_transactions';
import { Transaction } from 'src/domain/models/transaction';

@Injectable()
export class TransactionService implements TransactionRepository {
  private mount:number;
  private quantity: number;
  constructor(
    @InjectEntityManager() private entityManager: EntityManager,
    private transactionDao:TransactionDao
  ) {}

  setMountsQuantity(mount: number, quantity: number) {
    this.mount = mount
    this.quantity = quantity
  }

  async initReference(): Promise<Transaction> {
    const lastReference = await this.transactionDao.getLastTransactionReference()
    let newReferenceNumber: number;
    if (lastReference) {
      const lastNumber = parseInt(lastReference.replace('STORE_PAY', ''), 10);
      newReferenceNumber = lastNumber + 1;
    } else {
      newReferenceNumber = 1;
    }
    const newReferenceStr = `STORE_PAY${newReferenceNumber.toString().padStart(8, '0')}`;

    return await this.createTransaction(newReferenceStr)
  }


  async createTransaction(reference:string):Promise<Transaction> {
    const result = await this.entityManager
      .createQueryBuilder()
      .insert()
      .into(TransactionEntity)
      .values({
        mount: this.mount / 100,
        quantity: this.quantity,
        reference: reference,
        status_transaction: STATUS_TRANSACTION.START
      })
      .returning('*') 
      .execute();

    const insertCust = result.raw[0];
    return new Transaction(insertCust.id, insertCust.reference, insertCust.status_transaction, insertCust.quantity)
  }

  async updateTransaction(id:string, updateData: UpdateTransactionData):Promise<Transaction> {
    const result = await this.entityManager
      .createQueryBuilder()
      .update(TransactionEntity)
      .set(updateData)
      .where("id = :id", { id })
      .returning('*') 
      .execute();

    const insertCust = result.raw[0];
    return new Transaction(insertCust.id, insertCust.reference, insertCust.status_transaction, insertCust.quantity)
  }
}

