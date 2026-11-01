import type { NairaKobo } from "@/shared/types/domain";

export interface AnalyticsSummary {
  totalReceivedKobo: NairaKobo;
  totalOwedKobo: NairaKobo;
  collectionRate: number;
  transactionCount: number;
}

export interface TrendPoint {
  label: string;
  receivedKobo: NairaKobo;
  owedKobo: NairaKobo;
}

export interface AnalyticsCategory {
  name: string;
  valueKobo: NairaKobo;
  percentage: number;
}

export interface AnalyticsCustomer {
  customerId: string;
  name: string;
  valueKobo: NairaKobo;
}

export interface TransactionAnalyticsData {
  summary: AnalyticsSummary;
  trend: TrendPoint[];
  categories: AnalyticsCategory[];
  topCustomers: AnalyticsCustomer[];
  topOwers: AnalyticsCustomer[];
}
