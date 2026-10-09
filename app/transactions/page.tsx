import { TransactionHeader } from "@/features/transactions/components/transaction-header";

export default function TransactionsPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <TransactionHeader />
    </main>
  );
}
