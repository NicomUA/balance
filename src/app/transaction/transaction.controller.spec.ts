import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mockRepoProvider, mockServiceProvider } from '../core/mock.repo';
import { ExchangeService } from '../exchange/exchange.service';
import { TransactionsController } from './transaction.controller';
import { Transaction } from './transaction.dto';
import { TransactionEntity } from './transaction.entity';
import { TransactionsService } from './transaction.service';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let service: TransactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        TransactionsService,
        mockRepoProvider(TransactionEntity),
        mockServiceProvider(ConfigService),
        mockServiceProvider(ExchangeService),
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(controller.createOne).toBeDefined();
    expect(controller.getOne).toBeDefined();
    expect(controller.getList).toBeDefined();
  });

  it('getOne should return one transaction', async () => {
    jest
      .spyOn(service, 'getOne')
      .mockResolvedValueOnce({ id: '1' } as TransactionEntity);

    jest
      .spyOn(service, 'calculateFee')
      .mockImplementationOnce(async (tr) => tr as Transaction);

    const tr = await controller.getOne('1');
    expect(tr).toBeDefined();
    expect(tr.id).toBe('1');
    expect(service.getOne).toBeCalled();
    expect(service.calculateFee).toBeCalled();
  });

  it('getList should return one transaction', async () => {
    jest
      .spyOn(service, 'getList')
      .mockResolvedValueOnce([{ id: '1' } as TransactionEntity]);

    jest
      .spyOn(service, 'calculateFee')
      .mockImplementationOnce(async (tr) => tr as Transaction);

    const list = await controller.getList();
    expect(Array.isArray(list)).toBe(true);
    expect(service.getList).toBeCalled();
    expect(service.calculateFee).toBeCalled();
  });

  it('createOne should return one transaction', async () => {
    jest
      .spyOn(service, 'create')
      .mockResolvedValueOnce({ id: '1' } as TransactionEntity);

    jest
      .spyOn(service, 'calculateFee')
      .mockImplementationOnce(async (tr) => tr as Transaction);

    await controller.createOne({ buyerId: '1', amount: 100 });
    expect(service.create).toBeCalled();
    expect(service.calculateFee).toBeCalled();
  });
});
