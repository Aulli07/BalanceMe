"use client";

import { useMemo, useState } from "react";
import { TransactionHeader } from "@/features/transactions/components/transaction-header";
import { TransactionSummary } from "@/features/transactions/components/transaction-summary";
import { TransactionActivity } from "@/features/transactions/components/transaction-activity";
import { getTransactionsForDay, getTransactionsForMonth } from "@/features/transactions/selectors/get-transactions-for-month";
import { getTransactionActivity } from "@/features/transactions/selectors/get-transactions";
// import { getTransactionSummary } from "@/features/transactions/selectors/get-transaction-summary";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";
import { filters, months } from "@/features/transactions/data/txn-stuff";
import { getFilteredTransactions } from "@/features/transactions/selectors/get-filtered-transactions";
import { handleTransactionExport } from "@/features/transactions/selectors/handle-export";
import { getProductPriceForMonth } from "@/features/transactions/selectors/get-product-price-amounts";
import { getCollectedAmountForMonth } from "@/features/transactions/selectors/get-collected-amounts";



export default function TransactionsPage() {
  const [monthIndex, setMonthIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const allTransactions = useMemo(() => getTransactionActivity(ACTIVE_BUSINESS_ID), []);
  const filteredTxns = getFilteredTransactions(allTransactions, activeFilter);


  const transactions = useMemo(() =>
    getTransactionsForMonth(getTransactionsForDay(filteredTxns), months[monthIndex]), 
    [filteredTxns, monthIndex]);

  const totalPrice = useMemo(() => getProductPriceForMonth(ACTIVE_BUSINESS_ID, months[monthIndex]), [monthIndex]);
  const totalCollected = useMemo(() => getCollectedAmountForMonth(ACTIVE_BUSINESS_ID, months[monthIndex]), [monthIndex]);
  // const summary = useMemo(() => getTransactionSummary(ACTIVE_BUSINESS_ID, months[monthIndex]), [monthIndex]);

  return (
    <main className="min-h-screen pb-18 bg-[var(--paper)] text-[var(--ink)]">
      <TransactionHeader onDownload={() => handleTransactionExport(allTransactions)} />
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
