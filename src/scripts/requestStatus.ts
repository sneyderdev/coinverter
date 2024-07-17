import invariant from "tiny-invariant";

import { $requestStatus } from "@/store";

const fromEl = document.getElementById("from") as HTMLInputElement | null;
invariant(fromEl, "From element not found");
const toEl = document.getElementById("to") as HTMLInputElement | null;
invariant(toEl, "To element not found");
const exchangeRateEl = document.getElementById("exchange_rate");
invariant(exchangeRateEl, "Exchange rate element not found");
const exchangeRateLoaderEl = document.getElementById("exchange_rate_loader");
invariant(exchangeRateLoaderEl, "Exchange rate loader element not found");
const chartDescriptionEl = document.getElementById("chart_description");
invariant(chartDescriptionEl, "Chart description element not found");
const chartDescriptionLoaderEl = document.getElementById(
  "chart_description_loader"
);
invariant(
  chartDescriptionLoaderEl,
  "Chart description loader element not found"
);
const updatedDateEl = document.getElementById("updated_date");
invariant(updatedDateEl, "Updated date element not found");
const updatedDateLoaderEl = document.getElementById("updated_date_loader");
invariant(updatedDateLoaderEl, "Updated date loader element not found");

$requestStatus.subscribe((status) => {
  console.log(status);

  if (status === "loading") {
    fromEl.disabled = true;
    toEl.disabled = true;
    exchangeRateEl.style.display = "none";
    exchangeRateLoaderEl.style.display = "inline-block";
    chartDescriptionEl.style.display = "none";
    chartDescriptionLoaderEl.style.display = "inline-block";
    updatedDateEl.style.display = "none";
    updatedDateLoaderEl.style.display = "inline-block";

    return;
  }

  fromEl.disabled = false;
  toEl.disabled = false;
  exchangeRateEl.style.display = "inline";
  exchangeRateLoaderEl.style.display = "none";
  chartDescriptionEl.style.display = "block";
  chartDescriptionLoaderEl.style.display = "none";
  updatedDateEl.style.display = "inline";
  updatedDateLoaderEl.style.display = "none";
});
