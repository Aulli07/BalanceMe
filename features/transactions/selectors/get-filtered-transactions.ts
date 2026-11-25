import { filters } from "../data/txn-stuff";
import { TransactionActivityProps } from "../types/transaction-props";


export function getFilteredTransactions(
  transactions: TransactionActivityProps,
  activeFilter: (typeof filters)[number],
) {
  if (activeFilter === "Settled") {
    return transactions.filter(txn => txn.status === "Settled");
  }

  if (activeFilter === "Owed") {
    return transactions.filter(txn => txn.status !== "Settled");
  }

  return transactions;
}
