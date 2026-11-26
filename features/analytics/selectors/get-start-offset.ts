import { AnalyticsPeriod } from "../data/analytics-data";

export function getStartOffset(period: AnalyticsPeriod) {
  if (period === "TODAY") return 0;
  if (period === "YESTERDAY") return 1;
  if (period === "7D") return 6;
  if (period === "14D") return 13;
  return 29;
}
