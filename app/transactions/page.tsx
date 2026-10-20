"use client";

import { useMemo, useState } from "react";
import { TransactionHeader } from "@/features/transactions/components/transaction-header";
import { TransactionSummary } from "@/features/transactions/components/transaction-summary";
import { TransactionActivity } from "@/features/transactions/components/transaction-activity";
import { getTransactionsForMonth } from "@/features/transactions/selectors/get-transactions-for-month";
import { getTransactionActivity } from "@/features/transactions/selectors/get-transactions";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/current-context";

const months = ["October 2026", "September 2026", "August 2026"];

export default function TransactionsPage() {
  const [monthIndex, setMonthIndex] = useState(0);
  const transactions = useMemo(
    () =>
      getTransactionsForMonth(
        getTransactionActivity(ACTIVE_BUSINESS_ID),
        months[monthIndex],
      ),
    [monthIndex],
  );

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <TransactionHeader />
      <TransactionSummary
        month={months[monthIndex]}
        monthIndex={monthIndex}
        monthCount={months.length}
        onMonthChange={setMonthIndex}
      />
      <TransactionActivity transactions={transactions} />
    </main>
  );
}
