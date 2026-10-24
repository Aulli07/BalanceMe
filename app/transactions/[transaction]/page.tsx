import { TransactionDetailsHeader } from "@/features/transactions/components/transaction-details-header";
import { TransactionDetailsOverview } from "@/features/transactions/components/transaction-details-overview";
import { mockTransactions } from "@/shared/data/domain-mock-data";
import { notFound } from "next/navigation";

type TransactionPageProps = {
  params: Promise<{ transaction: string }>;
};

export default async function TransactionPage({ params }: TransactionPageProps) {
  const { transaction: transactionId } = await params;
  const transaction = mockTransactions.find((item) => item.id === transactionId);

  if (!transaction) notFound();

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <TransactionDetailsHeader />
      <TransactionDetailsOverview transaction={transaction} />
    </main>
  );
}
