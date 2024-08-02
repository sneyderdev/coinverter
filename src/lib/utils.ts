import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

import type { RawHistorical, Historical, BadRequest } from "@/types/app";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHistorical = (
  response: RawHistorical,
  symbol: string
): Historical =>
  Object.entries(response).map(([date, rates]) => ({
    date: dayjs(date).format("MMM D"),
    rate: rates[symbol].toFixed(2),
  }));

export const isBadRequest = (response: any): response is BadRequest => {
  return response && typeof response === "object" && "error" in response;
};
