import { mockTransactions } from "@/shared/data/domain-mock-data";

export function getRecordingStreak(businessId: string) {
  const activeDays = new Set(
    mockTransactions
      .filter((transaction) => transaction.businessId === businessId)
      .map((transaction) => transaction.createdAt.slice(0, 10)),
  );

  if (activeDays.size === 0) return 0;

  const latestDay = [...activeDays].sort().at(-1);
  if (!latestDay) return 0;

  const currentDay = new Date(`${latestDay}T00:00:00.000Z`);
  let streak = 0;

  while (activeDays.has(currentDay.toISOString().slice(0, 10))) {
    streak += 1;
    currentDay.setUTCDate(currentDay.getUTCDate() - 1);
  }

  return streak;
}
