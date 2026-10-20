import { mockSaleTransactions } from "@/shared/data/domain-mock-data";

export function getCustomerSaleTransactionCount(customerId: string) {
  return mockSaleTransactions.filter(
    (transaction) => transaction.customerId === customerId,
  ).length;
}
