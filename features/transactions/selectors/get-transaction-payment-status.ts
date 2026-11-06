import type { TransactionActivityItemProps } from "../types/transaction-props";

export function isTransactionFullyPaid(
  transaction: TransactionActivityItemProps,
) {
  return transaction.status === "Settled";
}

export function isTransactionNotFullyPaid(
  transaction: TransactionActivityItemProps,
) {
  return !isTransactionFullyPaid(transaction);
}
