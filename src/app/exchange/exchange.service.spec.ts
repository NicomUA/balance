import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ExchangeService } from './exchange.service';
import { AxiosResponse } from 'axios';

const data = { rates: { USD: 1 } };

const response: AxiosResponse<any> = {
  data,
  headers: {},
  config: {},
  status: 200,
  statusText: 'OK',
};

describe('ExchangeService', () => {
  let service: ExchangeService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [ExchangeService],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.getRate).toBeDefined();
    expect(service.convert).toBeDefined();
  });

  it('getRate should send request to rate serve', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
    const rate = await service.getRate('USD');
    expect(rate).toBe(1);
    expect(httpService.get).toBeCalled();
  });

  it('getRate should cache prev result', async () => {
    jest.spyOn(httpService, 'get').mockImplementationOnce(() => of(response));
    await service.getRate('USD');
    await service.getRate('USD');
    expect(httpService.get).toBeCalledTimes(1);
  });

  it('convert should convert currency', async () => {
    jest.spyOn(service, 'getRate').mockResolvedValueOnce(0.5);
    const rate = await service.convert('GBP', 100);
    expect(rate).toBe(50);
  });
});
