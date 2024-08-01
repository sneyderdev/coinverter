import type { APIRoute } from "astro";

import { BASE_URL } from "@/lib/consts";

import type { CurrenciesResponse } from "@/types/api";

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/currencies?api_key=${import.meta.env.API_KEY}&type=fiat`
    );

    const data = (await response.json()) as CurrenciesResponse;

    if (!response.ok) {
      return new Response(
        JSON.stringify({
          error: `Failed to fetch /currencies: ${data.meta.error_detail}`,
        }),
        {
          status: data.meta.code,
        }
      );
    }

    return new Response(JSON.stringify(data.response));
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: `Failed to fetch /currencies: ${error}`,
      }),
      {
        status: 500,
      }
    );
  }
};
