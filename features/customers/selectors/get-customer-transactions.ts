import { mockTransactions } from "@/shared/data/domain-mock-data";
import { getOwedAmount } from "@/features/analytics/selectors/get-analytics-data";
import type { CustomerTransactionItem } from "../types/customer-detail";

/**
 * Returns the most recent transactions for a customer, sorted newest-first.
 * Combines sale, repayment, and sale-repayment transactions into a unified list.
 */
export function getCustomerRecentTransactions(
  customerId: string,
  limit?: number,
): CustomerTransactionItem[] {
  return mockTransactions
    .filter((transaction) => transaction.customerId === customerId)
    .map((transaction): CustomerTransactionItem => {
      if (transaction.type === "repayment") {
        return {
          id: transaction.id,
          type: "repayment",
          title: "Repayment received",
          description: transaction.note ?? "Repayment received",
          amount: transaction.amountReceived,
          createdAt: transaction.createdAt,
          paymentStatus: "Received",
        };
      }

      const owedAmount = getOwedAmount(transaction);
      return {
        id: transaction.id,
        type: transaction.type,
        title: transaction.type === "sale" ? "Sale" : "Sale and repayment",
        description: transaction.sale.description,
        amount: transaction.type === "sale" ? transaction.sale.productPrice : transaction.amountReceived,
        createdAt: transaction.createdAt,
        paymentStatus: owedAmount === 0 ? "Settled" : "Partially paid",
      };
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
}

