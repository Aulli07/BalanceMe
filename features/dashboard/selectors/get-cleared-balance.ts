import { mockCustomers, mockRepaymentTransactions, mockSaleRepaymentTransactions, mockSaleTransactions } from "@/shared/data/domain-mock-data";

export function getCustomerWithClearedBalance(businessId: string) {
  const sale = [...mockSaleTransactions, ...mockSaleRepaymentTransactions]
    .filter((item) => item.businessId === businessId)
    .filter((item) => {
      const debtAmountPaid = [...mockRepaymentTransactions, ...mockSaleRepaymentTransactions]
        .flatMap((payment) => payment.allocations)
        .filter((allocation) => allocation.saleTransactionId === item.id)
        .reduce((total, allocation) => total + allocation.debtAmountPaid, 0);
      return debtAmountPaid > 0 && item.sale.amountPaid + debtAmountPaid >= item.sale.productPrice;
    })
    .sort((first, second) => new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime())[0];
  if (!sale) return null;
  const customer = mockCustomers.find((item) => item.id === sale.customerId);
  return customer ? { customer, amount: sale.sale.productPrice } : null;
}
