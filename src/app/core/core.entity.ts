import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  DeleteDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

// core entity hold all special fields for all other entities
export class CoreEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ readOnly: true, type: String })
  id: string;

  @CreateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ format: 'date-time', readOnly: true })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  @ApiProperty({ format: 'date-time', readOnly: true })
  updatedAt: string;

  @DeleteDateColumn()
  @ApiProperty({ readOnly: true })
  deleteAt: string;
}
