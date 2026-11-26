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

export function getTransactionsForMonth(businessId: string, month: string) {
  const allTransactions = getSortedTransactions(businessId);
  const transactions = allTransactions.filter((transaction) =>
    getMonthLabel(transaction.createdAt) === month,
  );
  const latestTransaction = allTransactions[0];
  const latestMonth = latestTransaction
    ? getMonthLabel(latestTransaction.createdAt)
    : null;
  const [monthName, year] = month.split(" ");
  const selectedMonthDate = new Date(`${monthName} 1, ${year} UTC`);
  const startDate = new Date(
    Date.UTC(
      selectedMonthDate.getUTCFullYear(),
      selectedMonthDate.getUTCMonth(),
      1,
    ),
  );
  const monthEnd = new Date(
    Date.UTC(
      selectedMonthDate.getUTCFullYear(),
      selectedMonthDate.getUTCMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    ),
  );
  const endDate =
    month === latestMonth && latestTransaction
      ? new Date(latestTransaction.createdAt)
      : monthEnd;

  return { transactions, startDate, endDate };
}

function getMonthLabel(createdAt: string) {
  return new Date(createdAt).toLocaleDateString("en-NG", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
  });
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
