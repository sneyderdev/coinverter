import invariant from "tiny-invariant";
import dayjs from "dayjs";

import { $converter } from "@/store";

import type { Converter } from "@/types";

const converterEl = document.getElementById("converter");
invariant(converterEl, "Converter element not found");
invariant(converterEl.dataset.data, "No converter data found");

let converter = JSON.parse(converterEl.dataset.data) as Converter;
$converter.set(converter);

const amountEl = document.getElementById("amount") as HTMLInputElement | null;
invariant(amountEl, "Amount element not found");
const convertedToEl = document.getElementById(
  "converted_to"
) as HTMLInputElement | null;
invariant(convertedToEl, "Converted to element not found");

amountEl.addEventListener("input", (event) => {
  const value = (event.target as HTMLInputElement).value;
  convertedToEl.value = (parseFloat(value) * converter.symbol.rate).toFixed(1);
});

convertedToEl.addEventListener("input", (event) => {
  const value = (event.target as HTMLInputElement).value;
  amountEl.value = (parseFloat(value) / converter.symbol.rate).toFixed(1);
});

const exchangeRateEl = document.getElementById("exchange_rate");
invariant(exchangeRateEl, "Exchange rate element not found");

const updatedDateEl = document.getElementById("updated_date");
invariant(updatedDateEl, "Updated date element not found");

$converter.subscribe((data) => {
  if (!data) return;

  converter = data;

  amountEl.value = "1";
  convertedToEl.value = (1 * converter.symbol.rate).toFixed(1);

  exchangeRateEl.textContent = `1 ${converter.base} = ${converter.symbol.rate} ${converter.symbol.code}`;
  updatedDateEl.textContent = `Last updated: ${dayjs(converter.date).format("MMMM D, YYYY h:mm A")}`;
});
