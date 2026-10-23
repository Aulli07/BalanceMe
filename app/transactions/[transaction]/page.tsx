import { TransactionDetailsHeader } from "@/features/transactions/components/transaction-details-header";

export default function TransactionPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <TransactionDetailsHeader />
    </main>
  );
}
