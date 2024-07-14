import { atom } from "nanostores";

import type { Converter } from "@/types";

export const $converter = atom<Converter>({
  base: "USD",
  symbol: {
    code: "COP",
    rate: 0,
  },
  date: "",
});
