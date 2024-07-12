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
