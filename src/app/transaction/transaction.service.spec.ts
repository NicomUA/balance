import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { fakeRepo } from '../core/fake.repo';
import { TransactionEntity } from './transaction.entity';
import { TransactionsService } from './transaction.service';

const fakeTransaction = {
  id: 'id',
  buyerId: 'buyerId',
  amount: 100,
} as TransactionEntity;

describe('TransactionsService', () => {
  let service: TransactionsService;
  let repo: Repository<TransactionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        fakeRepo<TransactionEntity>('TransactionEntity', fakeTransaction),
      ],
    }).compile();

    repo = module.get<Repository<TransactionEntity>>(
      getRepositoryToken(TransactionEntity),
    );
    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.calculateFee).toBeDefined();
    expect(service.create).toBeDefined();
    expect(service.getOne).toBeDefined();
    expect(service.getList).toBeDefined();
  });

  it('getOne: should return entity', async () => {
    jest.spyOn(service.repo, 'findOne');

    const entity = await service.getOne('id');

    expect(entity).toBeDefined();
    expect(entity.id).toBe('id');
    expect(repo.findOne).toBeCalled();
  });

  it('getList: should return entity', async () => {
    jest.spyOn(service.repo, 'find');
    const entity = await service.getList();

    expect(entity).toBeDefined();
    expect(repo.find).toBeCalled();
  });

  it('create: should create entity', async () => {
    jest.spyOn(service.repo, 'create');
    const entity = await service.create(fakeTransaction);
    expect(entity).toBeDefined();
    expect(repo.create).toBeCalled();
  });

  it('calculateFee: should calculate datra', async () => {
    const entity = await service.calculateFee({
      amount: 100,
    } as TransactionEntity);

    expect(entity).toBeDefined();
    expect(entity.amount).toBe(100);
    expect(entity.balance).toBe(0.3);
    expect(entity.marketplace).toBe(0.7);
    expect(entity.vendor).toBe(99);
  });
});
