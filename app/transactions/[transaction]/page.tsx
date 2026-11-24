import { TransactionDetailsHeader } from "@/features/transactions/components/transaction-details-header";
import { TransactionDetailsOverview } from "@/features/transactions/components/transaction-details-overview";
import { mockTransactions } from "@/shared/data/domain-mock-data";
import { notFound } from "next/navigation";




export default async function TransactionPage({
  params 
}: {
  params: Promise<{ transaction: string }>;
}) {

  const { transaction: transactionId } = await params;
  const transaction = mockTransactions.find((item) => item.id === transactionId);
  if (!transaction) notFound();

  return (
    <main className="flex flex-col gap-3 bg-[var(--paper)] pb-16 text-[var(--ink)]">
      <TransactionDetailsHeader />
      <TransactionDetailsOverview transaction={transaction} />
    </main>
  );
}
