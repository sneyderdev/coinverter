import type { APIRoute } from "astro";

import { BASE_URL } from "@/lib/consts";

import type { LatestResponse } from "@/types/api";

export const GET: APIRoute = async ({ url }) => {
  const base = url.searchParams.get("base") ?? "USD";
  const symbol = url.searchParams.get("symbol");

  if (!symbol) {
    return new Response(
      JSON.stringify({
        error: "Failed to fetch /latest: Please provide a symbol",
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const response = await fetch(
      `${BASE_URL}/latest?api_key=${import.meta.env.API_KEY}&base=${base}&symbols=${symbol}`
    );

    const data = (await response.json()) as LatestResponse;

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Failed to fetch /latest: ${data.meta.error_detail}`,
        }),
        {
          status: response.status,
        }
      );
    }

    return new Response(
      JSON.stringify({
        base: data.response.base,
        symbol: {
          code: symbol,
          rate: data.response.rates[symbol],
        },
        date: data.response.date,
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Failed to fetch /latest: ${error}`,
      }),
      {
        status: 500,
      }
    );
  }
};
