import { $converter, $historical, $requestStatus } from "@/store";

import { getHistorical } from "@/lib/utils";

import type { Converter, HistoricalResponse } from "@/types";

export const updateData = async (type: "base" | "symbol", value: string) => {
  try {
    $requestStatus.set("loading");

    const base = type === "base" ? value : $converter.get().base;
    const symbol = type === "symbol" ? value : $converter.get().symbol.code;

    const [ratesResponse, historicalResponse] = await Promise.all([
      fetch(`/api/latest?base=${base}&symbol=${symbol}`),
      fetch(`/api/timeseries?base=${base}&symbol=${symbol}`),
    ]);

    const rates = (await ratesResponse.json()) as Converter;
    const historical =
      (await historicalResponse.json()) as HistoricalResponse["response"];

    $converter.set(rates);
    $historical.set(getHistorical(historical, symbol));

    $requestStatus.set("success");
  } catch (error) {
    $requestStatus.set("error");

    //TODO: Show toast
  }
};
