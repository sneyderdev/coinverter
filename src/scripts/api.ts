import { $converter, $historical, $requestStatus } from "@/store";
import { getHistorical, isBadRequest } from "@/lib/utils";

import type { Converter, RawHistorical, BadRequest } from "@/types/app";

export const updateData = async (type: "base" | "symbol", value: string) => {
  try {
    $requestStatus.set("loading");

    const base = type === "base" ? value : $converter.get().base;
    const symbol = type === "symbol" ? value : $converter.get().symbol.code;

    const [ratesResponse, historicalResponse] = await Promise.all([
      fetch(`/api/latest?base=${base}&symbol=${symbol}`),
      fetch(`/api/timeseries?base=${base}&symbol=${symbol}`),
    ]);

    const rates = (await ratesResponse.json()) as Converter | BadRequest;
    const historical = (await historicalResponse.json()) as
      | RawHistorical
      | BadRequest;

    if (isBadRequest(rates)) {
      throw new Error(rates.error);
    }

    if (isBadRequest(historical)) {
      throw new Error(historical.error);
    }

    $converter.set(rates);
    $historical.set(getHistorical(historical, symbol));

    $requestStatus.set("success");
  } catch (error) {
    $requestStatus.set("error");

    //TODO: Show toast
  }
};
