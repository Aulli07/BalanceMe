import { ACTIVE_BUSINESS_ID, mockTransactions } from "@/shared/data/domain-mock-data";
import { getTotalAmountOwedForCustomer } from "@/features/dashboard/selectors/get-customers-owing";
import type { CustomerStats } from "../types/customer-detail";

/**
 * Computes aggregate financial stats for a single customer:
 * - Total paid to the business (initial payments + subsequent payments)
 * - Total transaction count (sales + payments)
 * - Outstanding amount owed
 */
export function getCustomerStats(customerId: string): CustomerStats {
  const transactions = mockTransactions.filter(
    (txn) => txn.customerId === customerId,
  );
  const paidTotalAmount = transactions.reduce(
    (total, transaction) =>
      total +
      (transaction.type === "sale"
        ? transaction.sale.amountPaid
        : transaction.amountReceived),
    0,
  );
  const owesNowAmount = getTotalAmountOwedForCustomer(
    ACTIVE_BUSINESS_ID,
    customerId,
  );
  const transactionCount = transactions.length;

  return { paidTotalAmount, transactionCount, owesNowAmount };
}

