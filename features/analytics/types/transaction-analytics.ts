import type { NairaAmount } from "@/shared/types/domain";

export interface AnalyticsSummary {
  totalReceivedAmount: NairaAmount;
  totalOwedAmount: NairaAmount;
  collectionRate: number;
  transactionCount: number;
}

export interface TrendPoint {
  label: string;
  amountReceived: NairaAmount;
  owedAmount: NairaAmount;
}

export interface AnalyticsCustomer {
  customerId: string;
  name: string;
  value: NairaAmount;
}

export interface TransactionAnalyticsData {
  summary: AnalyticsSummary;
  trend: TrendPoint[];
  topCustomers: AnalyticsCustomer[];
  topOwers: AnalyticsCustomer[];
}
