
import { EntityManager, Transaction } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { TransactionEntity } from '../../entity/transaction.entity';
import { TransactionDao } from 'src/domain/ports/billing/dao/transaction.dao';

export class TransactionDaoService implements TransactionDao {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async getLastTransactionReference () {
    const query = this.entityManager.createQueryBuilder<TransactionEntity>('Transaction', 'tra')
      .select(['tra.id', 'tra.reference', 'tra.created_date']).orderBy('tra.created_date', 'DESC');

    const result = await query.getOne();
    return result?.reference
  }
}

