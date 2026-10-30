import { mockTransactions } from "@/shared/data/domain-mock-data";

/**
 * Returns a human-readable label for the customer's last activity.
 * e.g. "Last activity today", "Last activity yesterday", "Last activity 5 Oct"
 */
export function getLastActivityLabel(customerId: string): string {
  const customerTxns = mockTransactions
    .filter((txn) => txn.customerId === customerId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  if (customerTxns.length === 0) return "No activity yet";

  const lastDate = new Date(customerTxns[0].createdAt);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastDate >= today) return "Last activity today";
  if (lastDate >= yesterday) return "Last activity yesterday";

  const day = lastDate.getDate();
  const month = lastDate.toLocaleDateString("en-GB", { month: "short" });
  return `Last activity ${day} ${month}`;
}

