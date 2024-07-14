import { $converter } from "@/store";

import type { ConverterResponse } from "@/types";

export const BASE_URL = "https://api.currencybeacon.com/v1";

export const updateBase = async (value: string) => {
  const response = await fetch(
    `${BASE_URL}/latest?base=${value}&api_key=${import.meta.env.PUBLIC_API_KEY}&symbols=${$converter.get().symbol.code}`
  );

  const data = (await response.json()) as ConverterResponse;

  $converter.set({
    base: data.response.base,
    symbol: {
      code: $converter.get().symbol.code,
      rate: data.response.rates[$converter.get().symbol.code],
    },
    date: data.response.date,
  });
};

export const updateSymbol = async (value: string) => {
  const response = await fetch(
    `${BASE_URL}/latest?base=${$converter.get().base}&api_key=${import.meta.env.PUBLIC_API_KEY}&symbols=${value}`
  );

  const data = (await response.json()) as ConverterResponse;

  $converter.set({
    base: data.response.base,
    symbol: {
      code: value,
      rate: data.response.rates[value],
    },
    date: data.response.date,
  });
};
