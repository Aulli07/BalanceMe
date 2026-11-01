import {
  mockCategories,
  mockCustomers,
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { NairaKobo, Transaction } from "@/shared/types/domain";
import type { AnalyticsPeriod } from "../data/analytics-periods";
import type {
  AnalyticsCategory,
  AnalyticsCustomer,
  TransactionAnalyticsData,
  TrendPoint,
} from "../types/transaction-analytics";

function getStartOffset(period: AnalyticsPeriod) {
  return period === "TODAY" ? 0 : period === "7D" ? 6 : 29;
}

function getDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function getReceivedKobo(transaction: Transaction) {
  if (transaction.type === "payment") return transaction.receivedKobo;
  return transaction.initialPaidKobo;
}

function getOwedKobo(transaction: Transaction) {
  if (transaction.type === "payment") return 0;
  const allocatedKobo = mockPaymentTransactions
    .flatMap((payment) => payment.allocations)
    .filter((allocation) => allocation.saleTransactionId === transaction.id)
    .reduce((total, allocation) => total + allocation.amountKobo, 0);
  return Math.max(0, transaction.totalKobo - transaction.initialPaidKobo - allocatedKobo);
}

export function getAnalyticsData(
  businessId: string,
  period: AnalyticsPeriod,
): TransactionAnalyticsData {
  const transactions = [...mockSaleTransactions, ...mockPaymentTransactions]
    .filter((transaction) => transaction.businessId === businessId)
    .sort((first, second) => first.createdAt.localeCompare(second.createdAt));
  const endDate = new Date(transactions.at(-1)?.createdAt ?? new Date());
  const startDate = new Date(endDate);
  startDate.setUTCDate(startDate.getUTCDate() - getStartOffset(period));
  const selectedTransactions = transactions.filter((transaction) => {
    const date = new Date(transaction.createdAt);
    return date >= startDate && date <= endDate;
  });

  const totalReceivedKobo = selectedTransactions.reduce(
    (total, transaction) => total + getReceivedKobo(transaction),
    0,
  );
  const totalOwedKobo = selectedTransactions.reduce(
    (total, transaction) => total + getOwedKobo(transaction),
    0,
  );
  const totalValueKobo = selectedTransactions
    .filter((transaction) => transaction.type === "sale")
    .reduce((total, transaction) => total + transaction.totalKobo, 0);
  const summary = {
    totalReceivedKobo,
    totalOwedKobo,
    collectionRate: totalValueKobo
      ? Math.round((totalReceivedKobo / totalValueKobo) * 100)
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
      receivedKobo: dailyTransactions.reduce(
        (total, transaction) => total + getReceivedKobo(transaction),
        0,
      ),
      owedKobo: dailyTransactions.reduce(
        (total, transaction) => total + getOwedKobo(transaction),
        0,
      ),
    };
  });

  const categoryTotals = new Map<string, NairaKobo>();
  selectedTransactions.forEach((transaction) => {
    if (transaction.type !== "sale") return;
    const category = mockCategories.find((item) => item.id === transaction.categoryId)?.name
      ?? "Uncategorised";
    categoryTotals.set(category, (categoryTotals.get(category) ?? 0) + transaction.totalKobo);
  });
  const categoryTotalKobo = [...categoryTotals.values()].reduce((total, value) => total + value, 0);
  const categories: AnalyticsCategory[] = [...categoryTotals.entries()]
    .sort((first, second) => second[1] - first[1])
    .map(([name, valueKobo]) => ({
      name,
      valueKobo,
      percentage: categoryTotalKobo ? Math.round((valueKobo / categoryTotalKobo) * 100) : 0,
    }));

  const customerTotals = new Map<string, { receivedKobo: number; owedKobo: number }>();
  selectedTransactions.forEach((transaction) => {
    const current = customerTotals.get(transaction.customerId) ?? {
      receivedKobo: 0,
      owedKobo: 0,
    };
    current.receivedKobo += getReceivedKobo(transaction);
    current.owedKobo += getOwedKobo(transaction);
    customerTotals.set(transaction.customerId, current);
  });
  const toCustomer = (key: "receivedKobo" | "owedKobo"): AnalyticsCustomer[] =>
    [...customerTotals.entries()]
      .sort((first, second) => second[1][key] - first[1][key])
      .slice(0, 3)
      .map(([customerId, values]) => ({
        customerId,
        name: mockCustomers.find((customer) => customer.id === customerId)?.name ?? "Unknown customer",
        valueKobo: values[key],
      }));

  return {
    summary,
    trend,
    categories,
    topCustomers: toCustomer("receivedKobo"),
    topOwers: toCustomer("owedKobo"),
  };
}
