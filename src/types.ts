export interface ConverterResponse {
  response: {
    base: string;
    rates: Record<string, number>;
    date: string;
  };
}

export interface Converter {
  base: string;
  symbol: {
    code: string;
    rate: number;
  };
  date: string;
}

export interface HistoricalResponse {
  response: {
    [key: string]: {
      [key: string]: number;
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
  flag?: string;
}

export interface CurrenciesResponse {
  response: Array<Currency>;
}
