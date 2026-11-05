import { mockCustomers, mockPaymentTransactions, mockSaleTransactions } from "@/shared/data/domain-mock-data";

export function getCustomerWithClearedBalance(businessId: string) {
  const sale = [...mockSaleTransactions]
    .filter((item) => item.businessId === businessId)
    .filter((item) => {
      const debtAmountPaid = mockPaymentTransactions
        .flatMap((payment) => payment.allocations)
        .filter((allocation) => allocation.saleTransactionId === item.id)
        .reduce((total, allocation) => total + allocation.debtAmountPaid, 0);
      return debtAmountPaid > 0 && item.amountPaid + debtAmountPaid >= item.productPrice;
    })
    .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime())[0];
  if (!sale) return null;
  const customer = mockCustomers.find((item) => item.id === sale.customerId);
  return customer ? { customer, amount: sale.productPrice } : null;
}
