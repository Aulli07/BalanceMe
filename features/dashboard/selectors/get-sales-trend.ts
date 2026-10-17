import { mockSaleTransactions } from "@/shared/data/domain-mock-data";

export function getSalesTrend(businessId: string, days = 7) {
  const now = new Date();
  const currentPeriodStart = new Date(now);
  currentPeriodStart.setDate(currentPeriodStart.getDate() - days);

  const previousPeriodStart = new Date(currentPeriodStart);
  previousPeriodStart.setDate(previousPeriodStart.getDate() - days);

  const currentTotalKobo = mockSaleTransactions
    .filter(
      (sale) =>
        sale.businessId === businessId &&
        new Date(sale.createdAt) >= currentPeriodStart &&
        new Date(sale.createdAt) < now,
    )
    .reduce((total, sale) => total + sale.totalKobo, 0);

  const previousTotalKobo = mockSaleTransactions
    .filter(
      (sale) =>
        sale.businessId === businessId &&
        new Date(sale.createdAt) >= previousPeriodStart &&
        new Date(sale.createdAt) < currentPeriodStart,
    )
    .reduce((total, sale) => total + sale.totalKobo, 0);

  return {
    currentTotalKobo,
    previousTotalKobo,
    differenceKobo: currentTotalKobo - previousTotalKobo,
  };
}
