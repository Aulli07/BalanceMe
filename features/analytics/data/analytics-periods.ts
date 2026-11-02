import type { TransactionMonth } from "@/features/transactions/data/txn-stuff";

export const ANALYTICS_PERIODS = [
  { id: "TODAY", label: "Today" },
  { id: "YESTERDAY", label: "Yesterday" },
  { id: "7D", label: "7 days" },
  { id: "14D", label: "14 days" },
  { id: "30D", label: "30 days" },
] as const;

export type AnalyticsPeriod = (typeof ANALYTICS_PERIODS)[number]["id"];
export type AnalyticsSelection = AnalyticsPeriod | TransactionMonth;
