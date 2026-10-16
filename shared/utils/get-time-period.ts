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