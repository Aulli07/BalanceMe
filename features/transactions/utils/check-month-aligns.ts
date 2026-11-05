export function isInMonth(createdAt: string, month: string) {
  const [monthName, year] = month.split(" ");
  const date = new Date(createdAt);
  return (
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() === new Date(`${monthName} 1, ${year}`).getMonth()
  );
}