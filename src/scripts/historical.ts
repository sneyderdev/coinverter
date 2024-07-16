import invariant from "tiny-invariant";
import dayjs from "dayjs";

import { $historical, $converter } from "@/store";

import type { Historical } from "@/types";

const historicalEl = document.getElementById("historical");
invariant(historicalEl, "Historical element not found");
invariant(historicalEl.dataset.historical, "Historical data not found");

$historical.set(JSON.parse(historicalEl.dataset.historical) as Historical);

const updatedDateEl = document.getElementById("updated_date");
invariant(updatedDateEl, "Updated date element not found");

$converter.subscribe((converter) => {
  updatedDateEl.textContent = `${dayjs(converter.date).format("MMMM D, YYYY h:mm A")}`;
});
