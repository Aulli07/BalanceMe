export function getDayLabel(createdAt: string) {
  const transactionDate = new Date(createdAt);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (transactionDate >= today) return "Today";
  if (transactionDate >= yesterday) return "Yesterday";

  const day = transactionDate.getDate();
  return `${day}${getOrdinal(day)} ${transactionDate.toLocaleDateString("en-GB", {
    month: "long",
  })}`;
}

function getOrdinal(day: number) {
  if (day % 100 >= 11 && day % 100 <= 13) return "th";
  return ({ 1: "st", 2: "nd", 3: "rd" }[day % 10] ?? "th");
}