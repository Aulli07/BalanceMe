"use client";

import { useMemo, useState } from "react";

import { AnalyticsHeader } from "@/features/analytics/components/analytics-header";
import { AnalyticsPeriodSelector } from "@/features/analytics/components/analytics-period-selector";
import { AnalyticsSummaryCards } from "@/features/analytics/components/analytics-summary-cards";
import { CustomerRankings } from "@/features/analytics/components/customer-rankings";
import { MoneyTrend } from "@/features/analytics/components/money-trend";
import { getAnalyticsData } from "@/features/analytics/selectors/get-analytics-data";
import { handleExport } from "@/features/analytics/selectors/handle-export";
import {
  ANALYTICS_PERIODS,
  type AnalyticsPeriod,
  type AnalyticsSelection,
} from "@/features/analytics/data/analytics-periods";
import { months } from "@/features/transactions/data/txn-stuff";

import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";

export default function TransactionAnalytics() {
  const [selection, setSelection] = useState<AnalyticsSelection>("TODAY");
  const isDayPeriod = (value: AnalyticsSelection): value is AnalyticsPeriod =>
    ANALYTICS_PERIODS.some((period) => period.id === value);
  const analytics = useMemo(
    () =>
      isDayPeriod(selection)
        ? getAnalyticsData(ACTIVE_BUSINESS_ID, selection)
        : getAnalyticsData(ACTIVE_BUSINESS_ID, "TODAY", selection),
    [selection],
  );

  return (
    <main className="min-h-screen bg-[var(--paper)] pb-20 text-[var(--ink)]">
      <AnalyticsHeader onExport={() => handleExport(analytics, selection)} />
      <div className="space-y-7 px-5 pt-4">
        <AnalyticsPeriodSelector
          periods={ANALYTICS_PERIODS}
          selectedPeriod={selection}
          onPeriodChange={setSelection}
          months={months}
        />
        <AnalyticsSummaryCards summary={analytics.summary} />
        <MoneyTrend points={analytics.trend} />
        <CustomerRankings
          topCustomers={analytics.topCustomers}
          topOwers={analytics.topOwers}
        />
      </div>
    </main>
  );
}
