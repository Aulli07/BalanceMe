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

  if (!transaction) {
    notFound();
  }

  const amount =
    transaction.type === "payment"
      ? transaction.receivedKobo
      : transaction.totalKobo;

  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <TransactionDetailsHeader />
      <TransactionDetailsOverview
        amount={amount}
        type={transaction.type}
        createdAt={transaction.createdAt}
      />
    </main>
  );
}
