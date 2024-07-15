import { atom } from "nanostores";

import type { Converter, Historical } from "@/types";

export const $converter = atom<Converter>({
  base: "USD",
  symbol: {
    code: "COP",
    rate: 0,
  },
  date: "",
});

export const $historical = atom<Historical>([]);
