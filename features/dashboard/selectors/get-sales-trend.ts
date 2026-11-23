import { mockSaleRepaymentTransactions, mockSaleTransactions } from "@/shared/data/domain-mock-data";

export function getSalesTrend(businessId: string, days = 7) {
  const now = new Date();
  const currentPeriodStart = new Date(now);
  currentPeriodStart.setDate(currentPeriodStart.getDate() - days);

  const previousPeriodStart = new Date(currentPeriodStart);
  previousPeriodStart.setDate(previousPeriodStart.getDate() - days);

  const sales = [...mockSaleTransactions, ...mockSaleRepaymentTransactions];

  const currentTotal = sales
    .filter(
      (sale) =>
        sale.businessId === businessId &&
        new Date(sale.createdAt) >= currentPeriodStart &&
        new Date(sale.createdAt) < now,
    )
    .reduce((total, sale) => total + sale.sale.productPrice, 0);

  const previousTotal = sales
    .filter(
      (sale) =>
        sale.businessId === businessId &&
        new Date(sale.createdAt) >= previousPeriodStart &&
        new Date(sale.createdAt) < currentPeriodStart,
    )
    .reduce((total, sale) => total + sale.sale.productPrice, 0);

  return {
    currentTotal,
    previousTotal,
    differenceAmount: currentTotal - previousTotal,
  };
}
