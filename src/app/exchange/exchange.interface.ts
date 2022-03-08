export interface IExchangeResponse {
  data: {
    rates: {
      [key: string]: number;
    };
  };
}
