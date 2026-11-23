import {
  mockCustomers,
  mockRepaymentTransactions,
  mockSaleRepaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import { getDueDate } from "@/shared/utils/get-due-date";
import type { CustomerDebtSummary, DebtSaleTransaction, OpenDebt } from "../types/owe-type";

export const DEBT_OVERDUE_AFTER_DAYS = 7;


function getAllocatedPaymentsAmount(saleTransactionId: string) {
  return [...mockRepaymentTransactions, ...mockSaleRepaymentTransactions]
    .flatMap((payment) => payment.allocations)
    .filter((allocation) => allocation.saleTransactionId === saleTransactionId)
    .reduce((total, allocation) => total + allocation.debtAmountPaid, 0);
}

function isDebtOverdue(sale: DebtSaleTransaction, now: Date) {
  return new Date(getDueDate(sale.createdAt)).getTime() < now.getTime();
}

export function getOpenDebtsForCustomer(
  customerId: string,
  now = new Date(),
): OpenDebt[] {
  const saleTransactions: DebtSaleTransaction[] = [
    ...mockSaleTransactions,
    ...mockSaleRepaymentTransactions,
  ];

  return saleTransactions
    .filter((saleTxn) => saleTxn.customerId === customerId)
    .map((saleTxn) => {
      const outstandingAmount = Math.max(0, saleTxn.sale.productPrice - saleTxn.sale.amountPaid - getAllocatedPaymentsAmount(saleTxn.id));

      return {
        saleTxn,
        outstandingAmount,
        overdue: outstandingAmount > 0 && isDebtOverdue(saleTxn, now),
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
          new Date(first.saleTxn.createdAt).getTime() - new Date(second.saleTxn.createdAt).getTime(),
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
        oldestOutstandingAt: openDebts[0]?.saleTxn.createdAt ?? customer.createdAt,
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
