import { TransactionInterceptor } from './transaction.interceptor';

const interceptor = new TransactionInterceptor();

describe('TransactionInterceptor', () => {
  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
});
