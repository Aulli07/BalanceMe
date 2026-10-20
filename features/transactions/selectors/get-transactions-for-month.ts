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
