import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from '../core/utils';
import { Transaction } from './transaction.dto';
import { FIELDS_TO_TRANSFORM, TransactionResponse } from './transaction.const';

@Injectable()
export class TransactionInterceptor implements NestInterceptor<Response> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    function transformData(tr: Transaction): Transaction {
      for (const field of FIELDS_TO_TRANSFORM) {
        if (Object.prototype.hasOwnProperty.call(tr, field)) {
          tr[field] = Utils.fromCents(tr[field]);
        }
      }

      return tr;
    }

    return next.handle().pipe(
      map((res: TransactionResponse) => {
        if (Array.isArray(res)) {
          return res.map((tr) => transformData(tr));
        } else {
          return transformData(res);
        }
      }),
    );
  }
}
