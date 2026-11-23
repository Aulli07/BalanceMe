import { mockCustomers, mockSaleRepaymentTransactions, mockSaleTransactions } from "@/shared/data/domain-mock-data";

export function getLargestSale(businessId: string) {
  const sale = [...mockSaleTransactions, ...mockSaleRepaymentTransactions]
    .filter((transaction) => transaction.businessId === businessId)
    .sort((first, second) => second.sale.productPrice - first.sale.productPrice)[0];

  if (!sale) return null;

  const customer = mockCustomers.find((item) => item.id === sale.customerId);
  if (!customer) return null;

  return { sale, customer };
}
