import { TransactionActivityProps } from "../types/transaction-props";
import { getDayLabel } from "../utils/get-day-label";

export function getTransactionsForMonth<T>(
  transactionsByDay: Record<string, T[]>,
  month: string,
): Record<string, T[]> {
  const monthName = month.split(" ")[0];

  return Object.fromEntries(
    Object.entries(transactionsByDay).filter(([dayLabel]) =>
      dayLabel.includes(monthName),
    ),
  );
}


export function getTransactionsForDay(transactions: TransactionActivityProps) {
  const transactionsByDay = transactions.reduce<Record<string, typeof transactions>>(
    (groups, transaction) => {
      const day = getDayLabel(transaction.createdAt);
      groups[day] ??= [];
      groups[day].push(transaction);
      return groups;
    },
    {},
  );

  return transactionsByDay;
}