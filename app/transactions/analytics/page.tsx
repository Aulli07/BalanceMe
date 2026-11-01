"use client";

import { useMemo, useState } from "react";
import { AnalyticsHeader } from "@/features/analytics/components/analytics-header";
import { AnalyticsPeriodSelector } from "@/features/analytics/components/analytics-period-selector";
import { AnalyticsSummaryCards } from "@/features/analytics/components/analytics-summary-cards";
import { CategoryBreakdown } from "@/features/analytics/components/category-breakdown";
import { CustomerRankings } from "@/features/analytics/components/customer-rankings";
import { MoneyTrend } from "@/features/analytics/components/money-trend";
import { getAnalyticsData } from "@/features/analytics/selectors/get-analytics-data";
import {
  ANALYTICS_PERIODS,
  type AnalyticsPeriod,
} from "@/features/analytics/data/analytics-periods";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";
import { formatNaira } from "@/shared/utils/format-naira";

export default function TransactionAnalytics() {
  const [period, setPeriod] = useState<AnalyticsPeriod>("7D");
  const analytics = useMemo(
    () => getAnalyticsData(ACTIVE_BUSINESS_ID, period),
    [period],
  );

  function handleExport() {
    const rows = [
      ["Metric", "Value"],
      ["Period", ANALYTICS_PERIODS.find((item) => item.id === period)?.label ?? period],
      ["Total received", formatNaira(analytics.summary.totalReceivedKobo)],
      ["Total owed", formatNaira(analytics.summary.totalOwedKobo)],
      ["Collection rate", `${analytics.summary.collectionRate}%`],
      ["Transaction count", String(analytics.summary.transactionCount)],
      [],
      ["Category", "Value"],
      ...analytics.categories.map((category) => [
        category.name,
        formatNaira(category.valueKobo),
      ]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `balanceme-analytics-${period.toLowerCase()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-[var(--paper)] pb-20 text-[var(--ink)]">
      <AnalyticsHeader onExport={handleExport} />
      <div className="space-y-7 px-5 pt-4">
        <AnalyticsPeriodSelector
          periods={ANALYTICS_PERIODS}
          selectedPeriod={period}
          onPeriodChange={setPeriod}
        />
        <AnalyticsSummaryCards summary={analytics.summary} />
        <MoneyTrend points={analytics.trend} />
        <CategoryBreakdown categories={analytics.categories} />
        <CustomerRankings
          topCustomers={analytics.topCustomers}
          topOwers={analytics.topOwers}
        />
      </div>
    </main>
  );
}