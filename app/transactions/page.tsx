"use client";

import { useMemo, useState } from "react";
import { TransactionHeader } from "@/features/transactions/components/transaction-header";
import { TransactionSummary } from "@/features/transactions/components/transaction-summary";
import { TransactionActivity } from "@/features/transactions/components/transaction-activity";
import { getTransactionsForMonth } from "@/features/transactions/selectors/get-transactions-for-month";
import { getTransactionActivity } from "@/features/transactions/selectors/get-transactions";
import { getTransactionSummary } from "@/features/transactions/selectors/get-transaction-summary";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";
import { filters, months } from "@/features/transactions/data/txn-stuff";
import { getFilteredTransactions } from "@/features/transactions/selectors/get-filtered-transactions";



export default function TransactionsPage() {
  const [monthIndex, setMonthIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const filteredTxns = getFilteredTransactions(getTransactionActivity(ACTIVE_BUSINESS_ID), activeFilter);


  const transactions = useMemo(() =>
    getTransactionsForMonth(getTransactionActivity(ACTIVE_BUSINESS_ID),months[monthIndex]), 
    [monthIndex]);

  const summary = useMemo(() => getTransactionSummary(ACTIVE_BUSINESS_ID, months[monthIndex]), [monthIndex]);

  return (
    <main className="min-h-screen pb-18 bg-[var(--paper)] text-[var(--ink)]">
      <TransactionHeader />
      <TransactionSummary
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
        month={months[monthIndex]}
        monthIndex={monthIndex}
        monthCount={months.length}
        onMonthChange={setMonthIndex}
        paidKobo={summary.paidKobo}
        owedKobo={summary.owedKobo}
      />
      <TransactionActivity transactions={transactions} />
    </main>
  );
}
