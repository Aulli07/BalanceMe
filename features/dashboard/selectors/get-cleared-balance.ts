import {
  mockCustomers,
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";

export function getCustomerWithClearedBalance(businessId: string) {
  const clearedSale = [...mockSaleTransactions]
    .filter((sale) => sale.businessId === businessId)
    .filter((sale) => {
      const allocatedKobo = mockPaymentTransactions
        .flatMap((payment) => payment.allocations)
        .filter((allocation) => allocation.saleTransactionId === sale.id)
        .reduce((total, allocation) => total + allocation.amountKobo, 0);

      return allocatedKobo > 0 && sale.initialPaidKobo + allocatedKobo >= sale.totalKobo;
    })
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
    )[0];

  if (!clearedSale) return null;

  const customer = mockCustomers.find(
    (item) => item.id === clearedSale.customerId,
  );
  if (!customer) return null;

  return { customer, totalKobo: clearedSale.totalKobo };
}
