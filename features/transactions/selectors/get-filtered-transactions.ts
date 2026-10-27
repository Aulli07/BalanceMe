import { filters } from "../data/txn-stuff";
import { TransactionActivityProps } from "../types/transaction-props";
import {
  isTransactionFullyPaid,
  isTransactionNotFullyPaid,
} from "./get-transaction-payment-status";

export function getFilteredTransactions(
  transactions: TransactionActivityProps,
  activeFilter: (typeof filters)[number],
) {
  if (activeFilter === "Paid") {
    return transactions.filter(isTransactionFullyPaid);
  }

  if (activeFilter === "Owed") {
    return transactions.filter(isTransactionNotFullyPaid);
  }

  return transactions;
}
