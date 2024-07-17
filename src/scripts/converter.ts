import invariant from "tiny-invariant";

import { $converter } from "@/store";

import type { Converter } from "@/types";

import "./requestStatus";

const converterEl = document.getElementById("converter");
invariant(converterEl, "Converter element not found");
invariant(converterEl.dataset.data, "No converter data found");

const converter = JSON.parse(converterEl.dataset.data) as Converter;
$converter.set(converter);

const fromEl = document.getElementById("from") as HTMLInputElement | null;
invariant(fromEl, "From element not found");
const toEl = document.getElementById("to") as HTMLInputElement | null;
invariant(toEl, "To element not found");

fromEl.addEventListener("input", (event) => {
  const value = (event.target as HTMLInputElement).value;
  toEl.value = (parseFloat(value) * converter.symbol.rate).toFixed(1);
});

toEl.addEventListener("input", (event) => {
  const value = (event.target as HTMLInputElement).value;
  fromEl.value = (parseFloat(value) / converter.symbol.rate).toFixed(1);
});

const exchangeRateEl = document.getElementById("exchange_rate");
invariant(exchangeRateEl, "Exchange rate element not found");

$converter.subscribe((converter) => {
  fromEl.value = "1";
  toEl.value = (1 * converter.symbol.rate).toFixed(1);
  exchangeRateEl.textContent = `1 ${converter.base} = ${converter.symbol.rate} ${converter.symbol.code}`;
});
