import {
  mockCustomers,
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { SaleTransaction } from "@/shared/types/domain";
import { CustomerDebtSummary, OpenDebt } from "../types/owe-type";

export const DEBT_OVERDUE_AFTER_DAYS = 7;
const DAY_IN_MS = 86_400_000;


function getAllocatedPaymentsAmount(saleTransactionId: string) {
  return mockPaymentTransactions
    .flatMap((payment) => payment.allocations)
    .filter((allocation) => allocation.saleTransactionId === saleTransactionId)
    .reduce((total, allocation) => total + allocation.debtAmountPaid, 0);
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
      const outstandingAmount = Math.max(0, sale.productPrice - sale.amountPaid - getAllocatedPaymentsAmount(sale.id));

      return {
        sale,
        outstandingAmount,
        overdue: outstandingAmount > 0 && isDebtOverdue(sale, now),
      };
    })
    .filter((debt) => debt.outstandingAmount > 0);
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
      const owedAmount = openDebts.reduce(
        (total, debt) => total + debt.outstandingAmount,
        0,
      );
      const overdueAmount = openDebts
        .filter((debt) => debt.overdue)
        .reduce((total, debt) => total + debt.outstandingAmount, 0);

      return {
        customer,
        owedAmount,
        overdueAmount,
        oldestOutstandingAt: openDebts[0]?.sale.createdAt ?? customer.createdAt,
        hasOverdueDebt: overdueAmount > 0,
        openDebts,
      };
    })
    .filter((summary) => summary.owedAmount > 0);
}

export function getDebtDashboardSummary(businessId: string, now = new Date()) {
  const customers = getCustomerDebtSummaries(businessId, now);

  return {
    customers,
    totalOwedAmount: customers.reduce((total, customer) => total + customer.owedAmount, 0),
    totalOverdueAmount: customers.reduce(
      (total, customer) => total + customer.overdueAmount,
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
    )?.owedAmount ?? 0
  );
}

export function getTotalAmountOwed(businessId: string) {
  return getDebtDashboardSummary(businessId).totalOwedAmount;
}

export function getLargestCustomerOwe(businessId: string) {
  const customers = getCustomerDebtSummaries(businessId);
  const largest = customers.reduce<CustomerDebtSummary | undefined>(
    (currentLargest, customer) =>
      !currentLargest || customer.owedAmount > currentLargest.owedAmount
        ? customer
        : currentLargest,
    undefined,
  );

  return {
    customerOwed: largest?.customer,
    maxAmount: largest?.owedAmount ?? 0,
  };
}
