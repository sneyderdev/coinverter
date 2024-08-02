import invariant from "tiny-invariant";
import dayjs from "dayjs";

import { $historical, $converter } from "@/store";
import { getHistorical } from "@/lib/utils";

import "./requestStatus";

const historicalEl = document.getElementById("historical");
invariant(historicalEl, "Historical element not found");
invariant(historicalEl.dataset.data, "Historical data not found");

$historical.set(getHistorical(JSON.parse(historicalEl.dataset.data), "COP"));

const chartDescriptionEl = document.getElementById("chart_description");
invariant(chartDescriptionEl, "Chart description element not found");
const updatedDateEl = document.getElementById("updated_date");
invariant(updatedDateEl, "Updated date element not found");

$converter.subscribe((converter) => {
  chartDescriptionEl.textContent = `Latest exchange rates for ${converter.base} to ${converter.symbol.code}.`;
  updatedDateEl.textContent = `${dayjs(converter.date).format("MMMM D, YYYY h:mm A")}`;
});
