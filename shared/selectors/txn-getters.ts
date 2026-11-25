import { mockRepaymentTransactions, mockSaleRepaymentTransactions, mockSaleTransactions, mockTransactions } from "../data/domain-mock-data";


export function getTransactions(businessId: string) {
  return mockTransactions.filter(txn => txn.businessId === businessId)
}

export function getSortedTransactions(businessId: string) {
  const transactions = getTransactions(businessId);
  return transactions.sort(
    (first, second) => 
      new Date(second.createdAt).getTime() - 
      new Date(first.createdAt).getTime(),
  );
}

export function getSaleTransactions(businessId: string) {
  return mockSaleTransactions.filter(txn => txn.businessId === businessId);
}

export function getRepaymentTransactions(businessId: string) {
  return mockRepaymentTransactions.filter(txn => txn.businessId === businessId);
}

export function getRepaymentsTransactions() {
  return [...mockRepaymentTransactions, ...mockSaleRepaymentTransactions]
}
