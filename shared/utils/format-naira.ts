import { NairaKobo } from "../types/domain";

export function formatNaira(kobo: NairaKobo) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN"
  }).format(kobo/100);
}

export function parseNairaToKobo(amount: string): NairaKobo {
  const parsedAmount = parseFloat(amount.replace(/[^0-9.-]+/g, ""));
  return Math.round(parsedAmount * 100);
}