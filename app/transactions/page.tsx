import { TransactionHeader } from "@/features/transactions/components/transaction-header";
import { TransactionSummary } from "@/features/transactions/components/transaction-summary";
import { TransactionActivity } from "@/features/transactions/components/transaction-activity";




export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <TransactionHeader />
      <TransactionSummary />
      <TransactionActivity />
    </main>
  );
}
