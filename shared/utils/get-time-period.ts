export function getTimePeriod(date = new Date()): string {
  const hours = date.getHours();
  if (hours >= 6 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}


export function formatPurchaseDate(dateString: string) {
  const date = new Date(dateString);
  const weekday = new Intl.DateTimeFormat("en-NG", {
    weekday: "long",
  }).format(date);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat("en-NG", {
    month: "long",
  }).format(date);
  const year = date.getFullYear();
  const suffix =
    day % 10 === 1 && day % 100 !== 11
      ? "st"
      : day % 10 === 2 && day % 100 !== 12
        ? "nd"
        : day % 10 === 3 && day % 100 !== 13
          ? "rd"
          : "th";

  return `${weekday}, ${day}${suffix} ${month} ${year}`;
}