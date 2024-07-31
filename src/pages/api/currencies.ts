import type { APIRoute } from "astro";

import { BASE_URL } from "@/lib/consts";

import type { CurrenciesResponse } from "@/types";

export const GET: APIRoute = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}/currencies?api_key=${import.meta.env.API_KEY}&type=fiat`
    );

    const data = (await response.json()) as CurrenciesResponse;

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
