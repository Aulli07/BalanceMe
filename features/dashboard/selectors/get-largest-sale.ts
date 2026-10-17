import { mockCustomers, mockSaleTransactions } from "@/shared/data/domain-mock-data";

export function getLargestSale(businessId: string) {
  const sale = [...mockSaleTransactions]
    .filter((transaction) => transaction.businessId === businessId)
    .sort((first, second) => second.totalKobo - first.totalKobo)[0];

  if (!sale) return null;

  const customer = mockCustomers.find((item) => item.id === sale.customerId);
  if (!customer) return null;

  return { sale, customer };
}
