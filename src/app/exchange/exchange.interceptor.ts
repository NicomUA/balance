import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Transaction } from '../transaction/transaction.dto';
import {
  FIELDS_TO_TRANSFORM,
  TransactionResponse,
} from '../transaction/transaction.const';
import { ExchangeService } from './exchange.service';

@Injectable()
export class ExchangeInterceptor implements NestInterceptor {
  constructor(private exchangeService: ExchangeService) {}

  async transformData(tr: Transaction, currency: string): Promise<Transaction> {
    for (const field of FIELDS_TO_TRANSFORM) {
      if (!!tr[field]) {
        tr[field] = await this.exchangeService.convert(currency, tr[field]);
        tr.currency = currency;
      }
    }

    return tr;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const {
      query: { currency = null },
    } = request;
    const useExchange = !!currency;

    return next.handle().pipe(
      map(async (res: TransactionResponse) => {
        if (!useExchange) return res;

        if (Array.isArray(res)) {
          const list = await Promise.all(
            res.map(async (tr) => await this.transformData(tr, currency)),
          );
          return list;
        } else {
          return this.transformData(res, currency);
        }
      }),
    );
  }
}
