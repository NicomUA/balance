import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Utils } from '../core/utils';
import { TransactionCreateDTO, Transaction } from './transaction.dto';
import { TransactionEntity } from './transaction.entity';

@Injectable()
export class TransactionsService {
  // injecting repository
  @InjectRepository(TransactionEntity) repo: Repository<TransactionEntity>;

  getList(): Promise<TransactionEntity[]> {
    // get transactions sorted by createdAt
    return this.repo.find({ order: { createdAt: 'ASC' } });
  }

  getOne(id: string): Promise<TransactionEntity> {
    return this.repo.findOne(id);
  }

  async create(data: TransactionCreateDTO): Promise<TransactionEntity> {
    const { amount, ...transactionData } = data;
    const tr = this.repo.create({
      ...transactionData,
      // converting dollars to cents for better accuracy
      amount: Utils.toCents(amount),
    });
    await tr.save();
    return tr;
  }
  async calculateFee(entity: TransactionEntity): Promise<Transaction> {
    // check fee in entity or use 1%
    const fee = entity.fee || 1;
    // total marketplace fee for calculation
    const marketplaceAmount = Utils.round(entity.amount * (fee / 100));
    // marketplace fee
    const marketplace = Utils.round(marketplaceAmount * 0.7);
    // balance fee
    const balance = Utils.round(marketplaceAmount - marketplace);
    // vendor change
    const vendor = Utils.round(entity.amount - marketplaceAmount);

    return {
      ...entity,
      marketplace,
      balance,
      vendor,
    } as Transaction;
  }
}
