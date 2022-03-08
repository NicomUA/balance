import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TransactionsModule } from './transaction/transaction.module';
import { ExchangeModule } from './exchange/exchange.module';

import dbConfig from '../ormconfig';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...dbConfig,
    }),

    TransactionsModule,
    ExchangeModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
