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
  const salesTotal = sales.reduce((total, sale) => total + sale.totalKobo, 0);
  const paidAtSale = sales.reduce(
    (total, sale) => total + sale.initialPaidKobo,
    0,
  );
  const payments = mockPaymentTransactions
    .filter((payment) => payment.customerId === customerId)
    .reduce((total, payment) => total + payment.receivedKobo, 0);

  return Math.max(0, salesTotal - paidAtSale - payments);
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
