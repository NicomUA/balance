export class Utils {
  //convert dollars to cents
  static toCents(amount: number): number {
    return Utils.round(amount * 100, 0);
  }
  //convert from cents to dollars
  static fromCents(amount: number): number {
    return Utils.round(amount / 100, 2);
  }
  //round number with specified decimal
  static round(amount: number, numb = 2): number {
    return +amount.toFixed(numb);
  }
}
