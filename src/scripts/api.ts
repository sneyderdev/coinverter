import dayjs from "dayjs";

import { $converter, $historical, $requestStatus } from "@/store";

import { getHistorical } from "@/lib/utils";

import type { ConverterResponse, HistoricalResponse } from "@/types";

export const BASE_URL = "https://api.currencybeacon.com/v1";
export const START_DATE = dayjs().subtract(1, "M").format("YYYY-MM-DD");
export const END_DATE = dayjs().format("YYYY-MM-DD");

export const updateData = async (type: "base" | "symbol", value: string) => {
  try {
    $requestStatus.set("loading");

    const base = type === "base" ? value : $converter.get().base;
    const symbol = type === "symbol" ? value : $converter.get().symbol.code;

    const [converterResponse, historicalResponse] = await Promise.all([
      fetch(
        `${BASE_URL}/latest?base=${base}&api_key=${import.meta.env.PUBLIC_API_KEY}&symbols=${symbol}`
      ),
      fetch(
        `${BASE_URL}/timeseries?base=${base}&symbol=${symbol}&api_key=${import.meta.env.PUBLIC_API_KEY}&start_date=${START_DATE}&end_date=${END_DATE}`
      ),
    ]);

    const converterData = (await converterResponse.json()) as ConverterResponse;
    const historicalData =
      (await historicalResponse.json()) as HistoricalResponse;

    $converter.set({
      base,
      symbol: {
        code: symbol,
        rate: converterData.response.rates[symbol],
      },
      date: converterData.response.date,
    });

    $historical.set(getHistorical(historicalData.response, symbol));

    $requestStatus.set("success");
  } catch (error) {
    $requestStatus.set("error");

    //TODO: Show toast
  }
};
