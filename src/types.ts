export interface HistoricalResponse {
  response: {
    [key: string]: {
      COP: number;
    };
  };
}

export type Historical = Array<{
  date: string;
  rate: string;
}>;

export interface Currency {
  short_code: string;
  name: string;
}

export interface CurrenciesResponse {
  response: Array<Currency>;
}
