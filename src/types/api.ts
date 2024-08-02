export interface Meta {
  meta: {
    code: number;
    error_detail: string;
  };
}

export interface LatestResponse extends Meta {
  response: {
    base: string;
    rates: Record<string, number>;
    date: string;
  };
}

export interface Currency {
  short_code: string;
  name: string;
}

export interface CurrenciesResponse extends Meta {
  response: Array<Currency>;
}

export interface TimeseriesResponse extends Meta {
  response: {
    [key: string]: {
      [key: string]: number;
    };
  };
}
