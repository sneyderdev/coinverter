import type { APIRoute } from "astro";

import { BASE_URL } from "@/lib/consts";

import type { ConverterResponse } from "@/types";

export const GET: APIRoute = async ({ url }) => {
  const base = url.searchParams.get("base") ?? "USD";
  const symbol = url.searchParams.get("symbol");

  try {
    if (!symbol) {
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
      `${BASE_URL}/latest?api_key=${import.meta.env.API_KEY}&base=${base}&symbols=${symbol}`
    );

    const data = (await response.json()) as ConverterResponse;

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
        message: `An error occurred: ${error}`,
      }),
      {
        status: 500,
      }
    );
  }
};
