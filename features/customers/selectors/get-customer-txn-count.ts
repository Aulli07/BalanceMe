import { mockTransactions } from "@/shared/data/domain-mock-data";

export function getCustomerSaleTransactionCount(customerId: string) {
  return mockTransactions.filter(
    (transaction) =>
      transaction.customerId === customerId &&
      transaction.type !== "repayment",
  ).length;
}
