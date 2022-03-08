import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsUUID } from 'class-validator';
import { TransactionEntity } from './transaction.entity';
import * as faker from 'faker';

export class TransactionCreateDTO {
  @ApiProperty({ type: 'string', example: faker.datatype.uuid() })
  @IsUUID()
  buyerId: string;

  @ApiProperty({ type: Number, example: 100 })
  @IsNumber()
  amount: number;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 100, example: 1 })
  @IsNumber()
  @IsOptional()
  fee?: number;
}

export class Transaction extends TransactionEntity {
  @ApiProperty()
  marketplace: number;

  @ApiProperty()
  balance: number;

  @ApiProperty()
  vendor: number;

  @ApiProperty()
  currency?: string;
}
