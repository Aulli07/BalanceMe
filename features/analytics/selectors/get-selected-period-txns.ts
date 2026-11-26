import {
  getSortedTransactions,
  getTransactionsForMonth,
} from "@/shared/selectors/txn-getters";
import { AnalyticsPeriod } from "../data/analytics-data";
import { getStartOffset } from "./get-start-offset";




export function getSelectedTransactions(
  businessId: string,
  period: AnalyticsPeriod,
  month?: string | null,
) {
  const allTransactions = getSortedTransactions(businessId);
  const isMonthSelection = month !== undefined && month !== null;
  const monthData = isMonthSelection
    ? getTransactionsForMonth(businessId, month)
    : null;
  const monthTransactions = monthData?.transactions ?? [];

  let startDate: Date;
  let endDate: Date;
  if (isMonthSelection && monthData) {
    ({ startDate, endDate } = monthData);
  } else {
    const now = new Date();
    const todayStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()),
    );
    startDate = new Date(todayStart);
    startDate.setUTCDate(startDate.getUTCDate() - getStartOffset(period));
    if (period === "YESTERDAY") {
      endDate = new Date(startDate);
      endDate.setUTCHours(23, 59, 59, 999);
    } else {
      endDate = now;
    }
  }

  const selectedTransactions = isMonthSelection
    ? monthTransactions
    : allTransactions.filter((transaction) => {
        const date = new Date(transaction.createdAt);
        return date >= startDate && date <= endDate;
      });

  return { selectedTransactions, startDate, endDate, isMonthSelection };
}
