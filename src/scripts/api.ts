import dayjs from "dayjs";

import { $converter, $historical } from "@/store";

import { getHistorical } from "@/lib/utils";

import type { ConverterResponse, HistoricalResponse } from "@/types";

export const BASE_URL = "https://api.currencybeacon.com/v1";
export const START_DATE = dayjs().subtract(1, "M").format("YYYY-MM-DD");
export const END_DATE = dayjs().format("YYYY-MM-DD");

export const updateHistorical = async (base: string, symbol: string) => {
  const response = await fetch(
    `${BASE_URL}/timeseries?base=${base}&symbol=${symbol}&api_key=${import.meta.env.PUBLIC_API_KEY}&start_date=${START_DATE}&end_date=${END_DATE}`
  );

  const data = (await response.json()) as HistoricalResponse;

  $historical.set(getHistorical(data.response, symbol));
};

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

  updateHistorical(value, $converter.get().symbol.code);
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

  updateHistorical($converter.get().base, value);
};
