"use client";

import { useMemo, useState } from "react";

import { AnalyticsHeader } from "@/features/analytics/components/analytics-header";
import { AnalyticsPeriodSelector } from "@/features/analytics/components/analytics-period-selector";
import { AnalyticsSummaryCards } from "@/features/analytics/components/analytics-summary-cards";
import { CategoryBreakdown } from "@/features/analytics/components/category-breakdown";
import { CustomerRankings } from "@/features/analytics/components/customer-rankings";
import { MoneyTrend } from "@/features/analytics/components/money-trend";
import { getAnalyticsData } from "@/features/analytics/selectors/get-analytics-data";
import { handleExport } from "@/features/analytics/selectors/handle-export";
import { ANALYTICS_PERIODS, type AnalyticsPeriod } from "@/features/analytics/data/analytics-periods";

import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";

export default function TransactionAnalytics() {
  const [period, setPeriod] = useState<AnalyticsPeriod>("7D");
  const analytics = useMemo(
    () => getAnalyticsData(ACTIVE_BUSINESS_ID, period),
    [period],
  );

  return (
    <main className="min-h-screen bg-[var(--paper)] pb-20 text-[var(--ink)]">
      <AnalyticsHeader onExport={() => handleExport(analytics, period)} />
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
