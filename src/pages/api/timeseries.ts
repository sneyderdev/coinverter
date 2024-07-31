import type { APIRoute } from "astro";

import { BASE_URL, START_DATE, END_DATE } from "@/lib/consts";

import type { HistoricalResponse } from "@/types";

export const GET: APIRoute = async ({ url }) => {
  const base = url.searchParams.get("base") ?? "USD";
  const symbol = url.searchParams.get("symbol");

  try {
    if (!base || !symbol) {
      return new Response(
        JSON.stringify({
          message: "Please provide a base and symbol.",
        }),
        {
          status: 400,
        }
      );
    }

    const response = await fetch(
      `${BASE_URL}/timeseries?api_key=${import.meta.env.API_KEY}&base=${base}&symbols=${symbol}&start_date=${START_DATE}&end_date=${END_DATE}`
    );

    const data = (await response.json()) as HistoricalResponse;

    return new Response(JSON.stringify(data.response));
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: `An error occurred: ${error}`,
      }),
      {
        status: 500,
      }
    );
  }
};
