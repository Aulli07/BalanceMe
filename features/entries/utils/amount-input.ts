export const MAX_AMOUNT_DIGITS = 9;

export function isWithinMaxAmountDigits(value: string) {
  return value.replace(/\D/g, "").length <= MAX_AMOUNT_DIGITS;
}
