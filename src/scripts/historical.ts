import invariant from "tiny-invariant";

import { $historical } from "@/store";

import type { Historical } from "@/types";

const historicalEl = document.getElementById("historical");
invariant(historicalEl, "Historical element not found");
invariant(historicalEl.dataset.historical, "Historical data not found");

$historical.set(JSON.parse(historicalEl.dataset.historical) as Historical);
