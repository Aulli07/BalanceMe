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
    (acc, txn) => acc + txn.amountPaid,
    0,
  );
  const subsequentPaid = payments.reduce(
    (acc, txn) => acc + txn.amountReceived,
    0,
  );
  const paidTotalAmount = initialPaid + subsequentPaid;

  const totalSalesAmount = sales.reduce(
    (acc, txn) => acc + txn.productPrice,
    0,
  );
  const owesNowAmount = Math.max(0, totalSalesAmount - paidTotalAmount);

  const transactionCount = sales.length + payments.length;

  return { paidTotalAmount, transactionCount, owesNowAmount };
}

