import {
  mockCustomers,
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { SaleTransaction } from "@/shared/types/domain";
import { CustomerDebtSummary, OpenDebt } from "../types/owe-type";

export const DEBT_OVERDUE_AFTER_DAYS = 7;
const DAY_IN_MS = 86_400_000;


function getAllocatedPaymentsKobo(saleTransactionId: string) {
  return mockPaymentTransactions
    .flatMap((payment) => payment.allocations)
    .filter((allocation) => allocation.saleTransactionId === saleTransactionId)
    .reduce((total, allocation) => total + allocation.amountKobo, 0);
}

function isDebtOverdue(sale: SaleTransaction, now: Date) {
  const dueAt = sale.dueDate
    ? new Date(sale.dueDate).getTime()
    : new Date(sale.createdAt).getTime() + DEBT_OVERDUE_AFTER_DAYS * DAY_IN_MS;

  return dueAt < now.getTime();
}

export function getOpenDebtsForCustomer(
  customerId: string,
  now = new Date(),
): OpenDebt[] {
  return mockSaleTransactions
    .filter((sale) => sale.customerId === customerId)
    .map((sale) => {
      const outstandingKobo = Math.max(0, sale.totalKobo - sale.initialPaidKobo - getAllocatedPaymentsKobo(sale.id));

      return {
        sale,
        outstandingKobo,
        overdue: outstandingKobo > 0 && isDebtOverdue(sale, now),
      };
    })
    .filter((debt) => debt.outstandingKobo > 0);
}


export function getCustomerDebtSummaries(
  businessId: string,
  now = new Date(),
): CustomerDebtSummary[] {
  return mockCustomers
    .filter((customer) => customer.businessId === businessId)
    .map((customer) => {
      const openDebts = getOpenDebtsForCustomer(customer.id, now).sort(
        (first, second) =>
          new Date(first.sale.createdAt).getTime() - new Date(second.sale.createdAt).getTime(),
      );
      const owedKobo = openDebts.reduce(
        (total, debt) => total + debt.outstandingKobo,
        0,
      );
      const overdueKobo = openDebts
        .filter((debt) => debt.overdue)
        .reduce((total, debt) => total + debt.outstandingKobo, 0);

      return {
        customer,
        owedKobo,
        overdueKobo,
        oldestOutstandingAt: openDebts[0]?.sale.createdAt ?? customer.createdAt,
        hasOverdueDebt: overdueKobo > 0,
        openDebts,
      };
    })
    .filter((summary) => summary.owedKobo > 0);
}

export function getDebtDashboardSummary(businessId: string, now = new Date()) {
  const customers = getCustomerDebtSummaries(businessId, now);

  return {
    customers,
    totalOwedKobo: customers.reduce((total, customer) => total + customer.owedKobo, 0),
    totalOverdueKobo: customers.reduce(
      (total, customer) => total + customer.overdueKobo,
      0,
    ),
  };
}

export function getTotalCustomersOwing(businessId: string) {
  const customersOwing = getCustomerDebtSummaries(businessId).map(
    (summary) => summary.customer,
  );
  return { count: customersOwing.length, customersOwing };
}

export function getTotalAmountOwedForCustomer(
  businessId: string,
  customerId: string,
) {
  return (
    getCustomerDebtSummaries(businessId).find(
      (summary) => summary.customer.id === customerId,
    )?.owedKobo ?? 0
  );
}

export function getTotalAmountOwed(businessId: string) {
  return getDebtDashboardSummary(businessId).totalOwedKobo;
}

export function getLargestCustomerOwe(businessId: string) {
  const customers = getCustomerDebtSummaries(businessId);
  const largest = customers.reduce<CustomerDebtSummary | undefined>(
    (currentLargest, customer) =>
      !currentLargest || customer.owedKobo > currentLargest.owedKobo
        ? customer
        : currentLargest,
    undefined,
  );

  return {
    customerOwed: largest?.customer,
    maxAmount: largest?.owedKobo ?? 0,
  };
}
