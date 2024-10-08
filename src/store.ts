import { atom } from "nanostores";

import type { Converter, Historical } from "@/types/app";

export const $converter = atom<Converter>({
  base: "USD",
  symbol: {
    code: "COP",
    rate: 0,
  },
  date: "",
});

export const $historical = atom<Historical>([]);

export const $requestStatus = atom<"idle" | "loading" | "success" | "error">(
  "idle"
);

export const $theme = atom<"light" | "dark" | "system">("system");
