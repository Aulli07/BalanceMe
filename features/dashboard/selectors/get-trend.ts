import { parseNairaToKobo } from "@/shared/utils/format-naira";
import { CashRecordedPeriod, getCashRecordedAmount } from "./get-cash-recorded";


export function getTrend(businessId: string, today: CashRecordedPeriod, yesterday: CashRecordedPeriod) {
  const todayAmount = getCashRecordedAmount(businessId, today);
  const yesterdayAmount = getCashRecordedAmount(businessId, yesterday);

  const todayAmountNumber = parseNairaToKobo(todayAmount);
  const yesterdayAmountNumber = parseNairaToKobo(yesterdayAmount);

  if (yesterdayAmountNumber === 0) {
    return "100% up";
  }

  const difference = todayAmountNumber - yesterdayAmountNumber;
  const percentage = (difference / yesterdayAmountNumber) * 100;

  return `${Math.abs(percentage).toFixed(1)}% ${percentage >= 0 ? "up" : "down"} yesterday`;
}