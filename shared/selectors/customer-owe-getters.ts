import {
  mockCustomers,
  mockRepaymentTransactions,
  mockSaleRepaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";

import type {
  CustomerDebtSummary,
  DebtSaleTransaction,
  OpenDebt,
} from "../../features/dashboard/types/owe-type";
import { isDebtOverdue } from "@/shared/utils/check-overdue-status";
import { getOwedDetailsOfTransaction } from "./txn-owe-getters";

export const DEBT_OVERDUE_AFTER_DAYS = 7;




export function getOpenDebtsForCustomer(customerId: string): OpenDebt[] {
  const transactions: DebtSaleTransaction[] = [
    ...mockSaleTransactions,
    ...mockSaleRepaymentTransactions,
  ];

  return transactions
    .filter((txn) => txn.customerId === customerId)
    .map((txn) => getOwedDetailsOfTransaction(txn))
    .filter((debt) => debt.outstandingAmount > 0);
}


export function getCustomerDebtSummaries(
  businessId: string,
  now = new Date(),
): CustomerDebtSummary[] {
  return mockCustomers
    .filter((customer) => customer.businessId === businessId)
    .map((customer) => {
      const openDebts = getOpenDebtsForCustomer(customer.id).sort(
        (first, second) =>
          new Date(first.txn.createdAt).getTime() -
          new Date(second.txn.createdAt).getTime(),
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
        oldestOutstandingAt:
          openDebts[0]?.txn.createdAt ?? customer.createdAt,
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
    totalOwedAmount: customers.reduce(
      (total, customer) => total + customer.owedAmount,
      0),
    totalOverdueAmount: customers.reduce(
      (total, customer) => total + customer.overdueAmount,
      0),
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


export function sortCustomers(customers: CustomerDebtSummary[]) {
  return [...customers].sort((first, second) => {
    if (first.customer.pinned !== second.customer.pinned) {
      return first.customer.pinned ? -1 : 1;
    }
    if (first.hasOverdueDebt !== second.hasOverdueDebt) {
      return first.hasOverdueDebt ? -1 : 1;
    }

    const oldestDifference =
      new Date(first.oldestOutstandingAt).getTime() -
      new Date(second.oldestOutstandingAt).getTime();
    if (oldestDifference !== 0) return oldestDifference;

    return second.owedAmount - first.owedAmount;
  });
}