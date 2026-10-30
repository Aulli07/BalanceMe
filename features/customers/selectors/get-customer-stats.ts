import {
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { CustomerStats } from "../types/customer-detail";

/**
 * Computes aggregate financial stats for a single customer:
 * - Total paid to the business (initial payments + subsequent payments)
 * - Total transaction count (sales + payments)
 * - Outstanding amount owed
 */
export function getCustomerStats(customerId: string): CustomerStats {
  const sales = mockSaleTransactions.filter(
    (txn) => txn.customerId === customerId,
  );
  const payments = mockPaymentTransactions.filter(
    (txn) => txn.customerId === customerId,
  );

  const initialPaid = sales.reduce(
    (acc, txn) => acc + txn.initialPaidKobo,
    0,
  );
  const subsequentPaid = payments.reduce(
    (acc, txn) => acc + txn.receivedKobo,
    0,
  );
  const paidTotalKobo = initialPaid + subsequentPaid;

  const totalSalesKobo = sales.reduce(
    (acc, txn) => acc + txn.totalKobo,
    0,
  );
  const owesNowKobo = Math.max(0, totalSalesKobo - paidTotalKobo);

  const transactionCount = sales.length + payments.length;

  return { paidTotalKobo, transactionCount, owesNowKobo };
}

