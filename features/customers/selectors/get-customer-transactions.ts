import {
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { CustomerTransactionItem } from "../types/customer-detail";

/**
 * Returns the most recent transactions for a customer, sorted newest-first.
 * Combines both sale and payment transactions into a unified list.
 */
export function getCustomerRecentTransactions(
  customerId: string,
  limit?: number,
): CustomerTransactionItem[] {
  const sales: CustomerTransactionItem[] = mockSaleTransactions
    .filter((txn) => txn.customerId === customerId)
    .map((txn) => {
      const isPaidInFull = txn.amountPaid >= txn.productPrice;
      return {
        id: txn.id,
        type: "sale" as const,
        title: "Sale",
        description: txn.description,
        amount: txn.productPrice,
        createdAt: txn.createdAt,
        paymentStatus: isPaidInFull ? "Paid in full" : "Partially paid",
      };
    });

  const payments: CustomerTransactionItem[] = mockPaymentTransactions
    .filter((txn) => txn.customerId === customerId)
    .map((txn) => ({
      id: txn.id,
      type: "payment" as const,
      title: "Payment received",
      description: txn.note ?? "Cash payment",
      amount: txn.amountReceived,
      createdAt: txn.createdAt,
      paymentStatus: "Received",
    }));

  return [...sales, ...payments]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
}

