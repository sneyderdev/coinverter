import type { APIRoute } from "astro";

import { BASE_URL, START_DATE, END_DATE } from "@/lib/consts";

import type { TimeseriesResponse } from "@/types/api";

export const GET: APIRoute = async ({ url }) => {
  const base = url.searchParams.get("base") ?? "USD";
  const symbol = url.searchParams.get("symbol");

  if (!symbol) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch /timeseries: Please provide a symbol",
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const response = await fetch(
      `${BASE_URL}/timeseries?api_key=${import.meta.env.API_KEY}&base=${base}&symbols=${symbol}&start_date=${START_DATE}&end_date=${END_DATE}`
    );

    const data = (await response.json()) as TimeseriesResponse;

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Failed to fetch /timeseries: ${data.meta.error_detail}`,
        }),
        {
          status: response.status,
        }
      );
    }

    return new Response(JSON.stringify(data.response));
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Failed to fetch /timeseries: ${error}`,
      }),
      {
        status: 500,
      }
    );
  }
};
