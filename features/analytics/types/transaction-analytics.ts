import type { NairaKobo } from "@/shared/types/domain";

export interface AnalyticsSummary {
  totalReceivedKobo: NairaKobo;
  totalOwedKobo: NairaKobo;
  collectionRate: number;
  transactionCount: number;
}

export interface TrendPoint {
  label: string;
  amountReceived: NairaKobo;
  owedKobo: NairaKobo;
}

export interface AnalyticsCustomer {
  customerId: string;
  name: string;
  valueKobo: NairaKobo;
}

export interface TransactionAnalyticsData {
  summary: AnalyticsSummary;
  trend: TrendPoint[];
  topCustomers: AnalyticsCustomer[];
  topOwers: AnalyticsCustomer[];
}
