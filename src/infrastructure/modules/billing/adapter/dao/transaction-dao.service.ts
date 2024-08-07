
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { TransactionEntity } from '../../entity/transaction.entity';
import { TransactionDao } from 'src/domain/ports/billing/dao/transaction.dao';
import { Transaction } from 'src/domain/models/transaction';

export class TransactionDaoService implements TransactionDao {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async getLastTransactionReference () {
    const query = this.entityManager.createQueryBuilder<TransactionEntity>('Transaction', 'tra')
      .select(['tra.id', 'tra.reference', 'tra.created_date']).orderBy('tra.created_date', 'DESC');

    const result = await query.getOne();
    return result?.reference
  }

  async getTransaction (id:string):Promise<Transaction> {
    const query = this.entityManager
      .createQueryBuilder<TransactionEntity>('Transaction', 'tra')
      .select(['tra.id', 'tra.reference', 'tra.created_date', 'tra.mount', 'tra.quantity', 'tra.status_transaction'])
      .where('tra.id = :id', { id });

    const result = await query.getOne();
    return new Transaction(result.id, result.reference, result.status_transaction, result.quantity)
  }
}

