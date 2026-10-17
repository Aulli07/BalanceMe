import { mockSaleTransactions } from "@/shared/data/domain-mock-data";

export function getNoSalesToday(businessId: string) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  return !mockSaleTransactions.some(
    (sale) =>
      sale.businessId === businessId && new Date(sale.createdAt) >= startOfToday,
  );
}
