import { getSortedTransactions } from "@/shared/selectors/txn-getters";

export function getLatestTransactionMonth(businessId: string): string | null {
  const latestTransaction = getSortedTransactions(businessId)[0];
  if (!latestTransaction) return null;

  return new Date(latestTransaction.createdAt).toLocaleDateString("en-NG", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
