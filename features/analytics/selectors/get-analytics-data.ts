import { mockCustomers } from "@/shared/data/domain-mock-data";
import type { AnalyticsPeriod } from "../data/analytics-data";
import type {
  AnalyticsCustomer,
  TransactionAnalyticsData,
  TrendPoint,
} from "../types/transaction-analytics";

import { getSelectedTransactions } from "./get-selected-period-txns";
import {
  getPurchaseAmountPaid,
  getReceivedAmount,
  getTotalOwedAmount,
  getTotalPurchasePrice,
  getTotalReceivedAmount,
} from "@/shared/selectors/amount-getters";
import { getTrendLength } from "./get-trend-length";
import { getDateKey } from "../utils/get-date-key";
import { getOwedDetailsOfTransaction } from "@/shared/selectors/txn-owe-getters";




export function getAnalyticsData(
  businessId: string,
  period: AnalyticsPeriod,
  month?: string | null,
): TransactionAnalyticsData {
  const { selectedTransactions, startDate, endDate, isMonthSelection } =
    getSelectedTransactions(businessId, period, month);

  const totalReceivedAmount = getTotalReceivedAmount(selectedTransactions);
  const totalOwedAmount = getTotalOwedAmount(selectedTransactions);
  const purchaseAmountPaid = getPurchaseAmountPaid(selectedTransactions);
  const totalPurchasePrice = getTotalPurchasePrice(selectedTransactions);

  const summary = {
    totalReceivedAmount,
    totalOwedAmount,
    purchaseAmountPaid,
    totalPurchasePrice,
    collectionRate: totalPurchasePrice
      ? Math.round((purchaseAmountPaid / totalPurchasePrice) * 100)
      : 0,
    transactionCount: selectedTransactions.length,
  };

  const trendLength = getTrendLength(startDate, endDate);
  const dateKeys = Array.from({ length: trendLength }, (_, index) => {
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
        !isMonthSelection && period === "TODAY"
          ? "Today"
          : date.toLocaleDateString("en-NG", {
              day: "numeric",
              month: "short",
              timeZone: "UTC",
            }),
      amountReceived: getTotalReceivedAmount(dailyTransactions),
      owedAmount: getTotalOwedAmount(dailyTransactions),
    };
  });

  const customerTotals = new Map<
    string,
    { amountReceived: number; owedAmount: number }
  >();
  selectedTransactions.forEach((transaction) => {
    const current = customerTotals.get(transaction.customerId) ?? {
      amountReceived: 0,
      owedAmount: 0,
    };
    current.amountReceived += getReceivedAmount(transaction);
    current.owedAmount +=
      transaction.type === "repayment"
        ? 0
        : getOwedDetailsOfTransaction(transaction).outstandingAmount;
    customerTotals.set(transaction.customerId, current);
  });
  const toCustomer = (
    key: "amountReceived" | "owedAmount",
  ): AnalyticsCustomer[] =>
    [...customerTotals.entries()]
      .sort((first, second) => second[1][key] - first[1][key])
      .slice(0, 3)
      .map(([customerId, values]) => ({
        customerId,
        name:
          mockCustomers.find((customer) => customer.id === customerId)?.name ??
          "Unknown customer",
        value: values[key],
      }));

  return {
    summary,
    trend,
    topCustomers: toCustomer("amountReceived"),
    topOwers: toCustomer("owedAmount"),
  };
}
