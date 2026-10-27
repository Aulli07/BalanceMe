import type { TransactionActivityItemProps } from "../types/transaction-props";

export function isTransactionFullyPaid(
  transaction: TransactionActivityItemProps,
) {
  return transaction.status === "Paid";
}

export function isTransactionNotFullyPaid(
  transaction: TransactionActivityItemProps,
) {
  return !isTransactionFullyPaid(transaction);
}
