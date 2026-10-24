import { mockPaymentTransactions, mockSaleTransactions } from "@/shared/data/domain-mock-data";
import { formatNaira } from "@/shared/utils/format-naira";

export type CashRecordedPeriod =
  | "today"
  | "yesterday"
  | "last-7-days"
  | "last-30-days";


  
export function getCashRecordedAmount(
  businessId: string,
  timePeriod: CashRecordedPeriod,
) {
  const { startTime, endTime } = getTimeRange(timePeriod);
  const saleSum = mockSaleTransactions
    .filter((transaction) =>
      isInRange(transaction.createdAt, transaction.businessId, businessId, startTime, endTime),
    )
    .reduce((total, transaction) => total + transaction.initialPaidKobo, 0);
  const paymentSum = mockPaymentTransactions
    .filter((transaction) =>
      isInRange(transaction.createdAt, transaction.businessId, businessId, startTime, endTime),
    )
    .reduce((total, transaction) => total + transaction.receivedKobo, 0);

  return formatNaira(saleSum + paymentSum);
}

function getTimeRange(timePeriod: CashRecordedPeriod) {
  const now = new Date();
  const startTime = new Date(now);

  if (timePeriod === "today") {
    startTime.setHours(0, 0, 0, 0);
    return { startTime, endTime: now };
  }

  if (timePeriod === "yesterday") {
    startTime.setDate(startTime.getDate() - 1);
    startTime.setHours(0, 0, 0, 0);
    const endTime = new Date(startTime);
    endTime.setDate(endTime.getDate() + 1);
    return { startTime, endTime };
  }

  startTime.setDate(startTime.getDate() - (timePeriod === "last-7-days" ? 7 : 30));
  return { startTime, endTime: now };
}

function isInRange(
  createdAt: string,
  transactionBusinessId: string,
  businessId: string,
  startTime: Date,
  endTime: Date,
) {
  const transactionTime = new Date(createdAt);
  return (
    transactionBusinessId === businessId &&
    transactionTime >= startTime &&
    transactionTime < endTime
  );
}
