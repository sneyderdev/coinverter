import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

import type { HistoricalResponse, Historical } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getHistorical = (
  response: HistoricalResponse["response"],
  symbol: string
): Historical =>
  Object.entries(response).map(([date, rates]) => ({
    date: dayjs(date).format("MMM D"),
    rate: rates[symbol].toFixed(2),
  }));
