import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ExchangeInterceptor } from '../exchange/exchange.interceptor';
import { TransactionCreateDTO, Transaction } from './transaction.dto';
import { TransactionInterceptor } from './transaction.interceptor';
import { TransactionsService } from './transaction.service';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private service: TransactionsService) {}

  @ApiResponse({
    description: 'Return list of transactions',
    type: () => Transaction,
    isArray: true,
    status: 200,
  })
  @Get()
  @UseInterceptors(ExchangeInterceptor, TransactionInterceptor)
  async getList(): Promise<Transaction[]> {
    const transactions = await this.service.getList();
    const list: Transaction[] = [];
    for (const tr of transactions) {
      list.push(await this.service.calculateFee(tr));
    }
    return list;
  }

  @ApiResponse({
    description: 'Return one transaction by id',
    type: () => Transaction,
    status: 200,
  })
  @UseInterceptors(ExchangeInterceptor, TransactionInterceptor)
  @Get('/:id')
  async getOne(@Param('id') id: string): Promise<Transaction> {
    const transaction = await this.service.getOne(id);
    if (!transaction) throw new NotFoundException('Transaction not found');

    return this.service.calculateFee(transaction);
  }

  @ApiResponse({
    description: 'Create transaction and return data',
    type: () => Transaction,
    status: 201,
  })
  @Post()
  @UseInterceptors(TransactionInterceptor)
  async createOne(@Body() data: TransactionCreateDTO): Promise<Transaction> {
    // create entity
    const transaction = await this.service.create(data);
    //return entity with calculated fee
    return this.service.calculateFee(transaction);
  }
}
