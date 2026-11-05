import { mockPaymentTransactions, mockSaleTransactions } from "@/shared/data/domain-mock-data";
import { formatNaira } from "@/shared/utils/format-naira";

export type CashRecordedPeriod = "today" | "yesterday" | "last-7-days" | "last-30-days";

export function getCashRecordedAmount(businessId: string, period: CashRecordedPeriod) {
  const { start, end } = getRange(period);
  const isInRange = (createdAt: string) => {
    const date = new Date(createdAt);
    return date >= start && date < end;
  };
  const saleAmount = mockSaleTransactions.filter((item) => item.businessId === businessId && isInRange(item.createdAt)).reduce((total, item) => total + item.amountPaid, 0);
  const paymentAmount = mockPaymentTransactions.filter((item) => item.businessId === businessId && isInRange(item.createdAt)).reduce((total, item) => total + item.amountReceived, 0);
  return formatNaira(saleAmount + paymentAmount);
}

function getRange(period: CashRecordedPeriod) {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);
  if (period === "today") start.setHours(0, 0, 0, 0);
  else if (period === "yesterday") {
    start.setDate(start.getDate() - 1);
    start.setHours(0, 0, 0, 0);
    end.setTime(start.getTime());
    end.setDate(end.getDate() + 1);
  } else start.setDate(start.getDate() - (period === "last-7-days" ? 7 : 30));
  return { start, end };
}
