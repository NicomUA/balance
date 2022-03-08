import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../core/core.entity';

@Entity('transaction')
export class TransactionEntity extends CoreEntity {
  @ApiProperty()
  @Column()
  buyerId: string;

  @ApiProperty()
  @Column()
  amount: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  fee: number;
}
