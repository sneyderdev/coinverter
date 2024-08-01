import type { Currency } from "./api";

export interface BadRequest {
  error: string;
}

export interface Converter {
  base: string;
  symbol: {
    code: string;
    rate: number;
  };
  date: string;
}

export type Currencies = Array<Currency>;

export interface RawHistorical {
  [key: string]: {
    [key: string]: number;
  };
}

export type Historical = Array<{
  date: string;
  rate: string;
}>;
