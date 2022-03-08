import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ExchangeService } from './exchange.service';

@Module({
  imports: [ConfigModule, HttpModule],
  providers: [ExchangeService],
  exports: [ExchangeService],
})
export class ExchangeModule {}
