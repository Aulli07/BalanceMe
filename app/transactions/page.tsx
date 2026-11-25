"use client";

import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";

import { useState } from "react";
import { TransactionHeader } from "@/features/transactions/components/transaction-header";
import { TransactionSummary } from "@/features/transactions/components/transaction-summary";
import { TransactionActivity } from "@/features/transactions/components/transaction-activity";

import { filters, months } from "@/features/transactions/data/txn-stuff";
import { getTransactionAmounts } from "@/features/transactions/selectors/get-transaction-amounts";
import { handleTransactionExport } from "@/features/transactions/selectors/handle-export";




export default function TransactionsPage() {
  const [monthIndex, setMonthIndex] = useState(0);
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const { allTransactions, transactions, totalPrice, totalCollected } = getTransactionAmounts(ACTIVE_BUSINESS_ID, activeFilter, monthIndex);

  return (
    <main className="min-h-screen pb-18 bg-[var(--paper)] text-[var(--ink)]">
      <TransactionHeader
        onDownload={() => handleTransactionExport(allTransactions)}
      />
      <TransactionSummary
        setActiveFilter={setActiveFilter}
        activeFilter={activeFilter}
        month={months[monthIndex]}
        monthIndex={monthIndex}
        monthCount={months.length}
        onMonthChange={setMonthIndex}
        productPrice={totalPrice}
        collectedAmount={totalCollected}
      />
      <TransactionActivity transactions={transactions} />
    </main>
  );
}
