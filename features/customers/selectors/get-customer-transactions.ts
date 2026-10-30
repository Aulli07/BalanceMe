import {
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import { getCategory } from "@/shared/selectors/getters";
import type { CustomerTransactionItem } from "../types/customer-detail";

/**
 * Returns the most recent transactions for a customer, sorted newest-first.
 * Combines both sale and payment transactions into a unified list.
 */
export function getCustomerRecentTransactions(
  customerId: string,
  limit = 3,
): CustomerTransactionItem[] {
  const sales: CustomerTransactionItem[] = mockSaleTransactions
    .filter((txn) => txn.customerId === customerId)
    .map((txn) => {
      const category = getCategory(txn.categoryId);
      const isPaidInFull = txn.initialPaidKobo >= txn.totalKobo;
      return {
        id: txn.id,
        type: "sale" as const,
        title: category?.name ?? "Sale",
        description: txn.description,
        amountKobo: txn.totalKobo,
        createdAt: txn.createdAt,
        paymentStatus: isPaidInFull ? "Paid in full" : "Partially paid",
        categoryName: category?.name,
      };
    });

  const payments: CustomerTransactionItem[] = mockPaymentTransactions
    .filter((txn) => txn.customerId === customerId)
    .map((txn) => ({
      id: txn.id,
      type: "payment" as const,
      title: "Payment received",
      description: txn.note ?? "Cash payment",
      amountKobo: txn.receivedKobo,
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

