import {
  ACTIVE_BUSINESS_ID,
  mockCustomers,
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { OwingCustomer } from "../types";




function getOutstandingKobo(customerId: string) {
  const sales = mockSaleTransactions.filter(
    (sale) => sale.customerId === customerId,
  );
  return sales.reduce((total, sale) => {
    const allocatedKobo = mockPaymentTransactions
      .flatMap((payment) => payment.allocations)
      .filter((allocation) => allocation.saleTransactionId === sale.id)
      .reduce((sum, allocation) => sum + allocation.debtAmountPaid, 0);

    return total + Math.max(0, sale.productPrice - sale.amountPaid - allocatedKobo);
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
        owedKobo: getOutstandingKobo(customer.id),
        owingSince: sales[0]?.createdAt ?? customer.createdAt,
      };
    })
    .filter((customer) => customer.owedKobo > 0);
}
