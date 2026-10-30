import { mockTransactions } from "@/shared/data/domain-mock-data";
import type { CustomerMonthlyActivity } from "../types/customer-detail";

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/**
 * Computes monthly transaction counts for a customer over the last 6 months.
 * Returns an array of { month, count } objects and the per-month average.
 */
export function getCustomerMonthlyActivity(customerId: string): {
  months: CustomerMonthlyActivity[];
  averagePerMonth: number;
} {
  const customerTxns = mockTransactions.filter(
    (txn) => txn.customerId === customerId,
  );

  const now = new Date();
  const months: CustomerMonthlyActivity[] = [];

  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    const count = customerTxns.filter((txn) => {
      const txnDate = new Date(txn.createdAt);
      return (
        txnDate.getMonth() === monthIndex &&
        txnDate.getFullYear() === year
      );
    }).length;

    months.push({
      month: MONTH_LABELS[monthIndex],
      count,
    });
  }

  const totalCount = months.reduce((acc, m) => acc + m.count, 0);
  const averagePerMonth = Math.round(totalCount / months.length);

  return { months, averagePerMonth };
}

