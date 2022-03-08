import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Utils } from '../core/utils';
import { IExchangeResponse } from './exchange.interface';

@Injectable()
export class ExchangeService {
  private URL: string;
  private KEY: string;

  // using in-memory hash map cache. Redis is better solution
  private cache = new Map<string, number>();

  constructor(private config: ConfigService, private http: HttpService) {
    // get env data from config service
    this.URL = this.config.get<string>('EXCHANGE_URL');
    this.KEY = this.config.get<string>('EXCHANGE_KEY');
  }

  // get all available exchange rates
  async getRate(currency: string, base = 'USD'): Promise<number> {
    // set cache key
    const CACHE_KEY = `USD_${currency}`;
    if (this.cache.has(CACHE_KEY)) {
      // if rate already in cache -> return it
      return this.cache.get(CACHE_KEY);
    }

    const params = {
      app_id: this.KEY,
      base,
    };
    const urlParams = new URLSearchParams(params).toString();

    // get full url for request rates
    const url = `${this.URL}?${urlParams}`;
    let response: IExchangeResponse;

    try {
      response = await firstValueFrom(this.http.get(url));
    } catch (error) {
      // if request fail -> throw exception
      throw new BadRequestException(error);
    }

    // get rates data from response
    const {
      data: { rates },
    } = response;
    // update cache storage
    for (const rate_currency in rates) {
      this.cache.set(`USD_${rate_currency}`, rates[rate_currency]);
    }

    return this.cache.get(CACHE_KEY);
  }

  // convert money to specified currency
  async convert(target: string, amount: number, base = 'USD'): Promise<number> {
    const rate = await this.getRate(target, base);
    if (!rate) throw new BadRequestException('Bad currency code');

    return Utils.round(amount * rate);
  }
}
