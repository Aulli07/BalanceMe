import {
  mockCustomers,
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { NairaAmount, Transaction } from "@/shared/types/domain";
import type { AnalyticsPeriod } from "../data/analytics-periods";
import type {
  AnalyticsCustomer,
  TransactionAnalyticsData,
  TrendPoint,
} from "../types/transaction-analytics";

function getStartOffset(period: AnalyticsPeriod) {
  if (period === "TODAY") return 0;
  if (period === "YESTERDAY") return 1;
  if (period === "7D") return 6;
  if (period === "14D") return 13;
  return 29;
}

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getReceivedAmount(transaction: Transaction) {
  if (transaction.type === "payment") return transaction.amountReceived;
  return transaction.amountPaid;
}

function getOwedAmount(transaction: Transaction) {
  if (transaction.type === "payment") return 0;
  const allocatedAmount = mockPaymentTransactions
    .flatMap((payment) => payment.allocations)
    .filter((allocation) => allocation.saleTransactionId === transaction.id)
    .reduce((total, allocation) => total + allocation.debtAmountPaid, 0);
  return Math.max(0, transaction.productPrice - transaction.amountPaid - allocatedAmount);
}

export function getAnalyticsData(
  businessId: string,
  period: AnalyticsPeriod,
  month?: string | null,
): TransactionAnalyticsData {
  const transactions = [...mockSaleTransactions, ...mockPaymentTransactions]
    .filter((transaction) => transaction.businessId === businessId)
    .sort((first, second) => first.createdAt.localeCompare(second.createdAt));
  const latestMonth = new Date(transactions.at(-1)?.createdAt ?? new Date()).toLocaleDateString(
    "en-NG",
    { month: "long", year: "numeric", timeZone: "UTC" },
  );
  const selectedMonth = month ?? latestMonth;
  const [monthName, year] = selectedMonth.split(" ");
  const monthIndex = new Date(`${monthName} 1, ${year}`).getUTCMonth();
  const monthYear = Number(year);
  const latestTransaction = transactions.at(-1);
  const isLatestMonth =
    latestTransaction &&
    new Date(latestTransaction.createdAt).getUTCFullYear() === monthYear &&
    new Date(latestTransaction.createdAt).getUTCMonth() === monthIndex;
  const endDate = isLatestMonth
    ? new Date(latestTransaction.createdAt)
    : new Date(Date.UTC(monthYear, monthIndex + 1, 0, 23, 59, 59, 999));
  const startDate = new Date(endDate);
  startDate.setUTCDate(startDate.getUTCDate() - getStartOffset(period));
  const selectedTransactions = transactions.filter((transaction) => {
    const date = new Date(transaction.createdAt);
    return date >= startDate && date <= endDate;
  });

  const totalReceivedAmount = selectedTransactions.reduce(
    (total, transaction) => total + getReceivedAmount(transaction),
    0,
  );
  const totalOwedAmount = selectedTransactions.reduce(
    (total, transaction) => total + getOwedAmount(transaction),
    0,
  );
  const totalValue = selectedTransactions
    .filter((transaction) => transaction.type === "sale")
    .reduce((total, transaction) => total + transaction.productPrice, 0);
  const summary = {
    totalReceivedAmount,
    totalOwedAmount,
    collectionRate: totalValue
      ? Math.round((totalReceivedAmount / totalValue) * 100)
      : 0,
    transactionCount: selectedTransactions.length,
  };

  const dateKeys = Array.from({ length: getStartOffset(period) + 1 }, (_, index) => {
    const date = new Date(startDate);
    date.setUTCDate(startDate.getUTCDate() + index);
    return date;
  });
  const trend: TrendPoint[] = dateKeys.map((date) => {
    const dateKey = getDateKey(date);
    const dailyTransactions = selectedTransactions.filter(
      (transaction) => getDateKey(new Date(transaction.createdAt)) === dateKey,
    );
    return {
      label:
        period === "TODAY"
          ? "Today"
          : date.toLocaleDateString("en-NG", { day: "numeric", month: "short", timeZone: "UTC" }),
      amountReceived: dailyTransactions.reduce(
        (total, transaction) => total + getReceivedAmount(transaction),
        0,
      ),
      owedAmount: dailyTransactions.reduce(
        (total, transaction) => total + getOwedAmount(transaction),
        0,
      ),
    };
  });

  const customerTotals = new Map<string, { amountReceived: number; owedAmount: number }>();
  selectedTransactions.forEach((transaction) => {
    const current = customerTotals.get(transaction.customerId) ?? {
      amountReceived: 0,
      owedAmount: 0,
    };
    current.amountReceived += getReceivedAmount(transaction);
    current.owedAmount += getOwedAmount(transaction);
    customerTotals.set(transaction.customerId, current);
  });
  const toCustomer = (key: "amountReceived" | "owedAmount"): AnalyticsCustomer[] =>
    [...customerTotals.entries()]
      .sort((first, second) => second[1][key] - first[1][key])
      .slice(0, 3)
      .map(([customerId, values]) => ({
        customerId,
        name: mockCustomers.find((customer) => customer.id === customerId)?.name ?? "Unknown customer",
        value: values[key],
      }));

  return {
    summary,
    trend,
    topCustomers: toCustomer("amountReceived"),
    topOwers: toCustomer("owedAmount"),
  };
}
