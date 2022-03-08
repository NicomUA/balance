import { Utils } from './utils';

describe('Utils', () => {
  it('should be defined', () => {
    expect(Utils).toBeDefined();
  });
  it('toCents should convert to cents', () => {
    expect(Utils.toCents(100)).toBe(10000);
  });
  it('fromCents should convert from cents', () => {
    expect(Utils.fromCents(10000)).toBe(100);
  });
  it('round should round number from cents', () => {
    expect(Utils.round(1.00000524)).toBe(1);
    expect(Utils.round(1.359)).toBe(1.36);
  });
});
