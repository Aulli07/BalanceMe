import {
  ANALYTICS_PERIODS,
  type AnalyticsSelection,
} from "../data/analytics-periods";
import type { TransactionAnalyticsData } from "../types/transaction-analytics";
import { formatNaira } from "@/shared/utils/format-naira";



export function handleExport(
  analytics: TransactionAnalyticsData,
  period: AnalyticsSelection,
) {
  const rows = [
    ["Metric", "Value"],
    ["Period", ANALYTICS_PERIODS.find((item) => item.id === period)?.label ?? period],
    ["Total received", formatNaira(analytics.summary.totalReceivedAmount)],
    ["Total owed", formatNaira(analytics.summary.totalOwedAmount)],
    ["Collection rate", `${analytics.summary.collectionRate}%`],
    ["Transaction count", String(analytics.summary.transactionCount)],
  ];
  const csv = rows
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `balanceme-analytics-${period.toLowerCase().replaceAll(" ", "-")}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
