import { CashRecordedPeriod } from "../types/period";


export function getRange(period: CashRecordedPeriod) {
  const now = new Date();
  const start = new Date(now);
  const end = new Date(now);

  if (period === "today") start.setHours(0, 0, 0, 0);

  else if (period === "yesterday") {
    start.setDate(start.getDate() - 1);
    start.setHours(0, 0, 0, 0);
    end.setTime(start.getTime());
    end.setDate(end.getDate() + 1);
  } 
  else start.setDate(start.getDate() - (period === "last-7-days" ? 7 : 30));
  return { start, end };
}

export function isTimeInRange(createdAt: string, start: Date, end: Date) {
  const date = new Date(createdAt);
  return date < start && date > end;
}