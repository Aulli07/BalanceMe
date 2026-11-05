import {
  ACTIVE_BUSINESS_ID,
  mockCustomers,
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { OwingCustomer } from "../types";




function getOutstandingAmount(customerId: string) {
  const sales = mockSaleTransactions.filter(
    (sale) => sale.customerId === customerId,
  );
  return sales.reduce((total, sale) => {
    const allocatedAmount = mockPaymentTransactions
      .flatMap((payment) => payment.allocations)
      .filter((allocation) => allocation.saleTransactionId === sale.id)
      .reduce((sum, allocation) => sum + allocation.debtAmountPaid, 0);

    return total + Math.max(0, sale.productPrice - sale.amountPaid - allocatedAmount);
  }, 0);
}

export function getOwingCustomers(): OwingCustomer[] {
  return mockCustomers
    .filter((customer) => customer.businessId === ACTIVE_BUSINESS_ID)
    .map((customer) => {
      const sales = mockSaleTransactions
        .filter((sale) => sale.customerId === customer.id)
        .sort((a, b) => +new Date(a.createdAt) - +new Date(b.createdAt));

      return {
        ...customer,
        owedAmount: getOutstandingAmount(customer.id),
        owingSince: sales[0]?.createdAt ?? customer.createdAt,
      };
    })
    .filter((customer) => customer.owedAmount > 0);
}
