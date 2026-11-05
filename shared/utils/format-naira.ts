import { NairaAmount } from "../types/domain";

export function formatNaira(amount: NairaAmount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function parseNaira(value: string): NairaAmount {
  return Math.round(parseFloat(value.replace(/[^0-9.-]+/g, "")));
}
