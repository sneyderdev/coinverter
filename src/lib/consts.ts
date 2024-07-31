import dayjs from "dayjs";

export const BASE_URL = "https://api.currencybeacon.com/v1";
export const START_DATE = dayjs().subtract(1, "M").format("YYYY-MM-DD");
export const END_DATE = dayjs().format("YYYY-MM-DD");
