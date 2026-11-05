import {
  mockCustomers,
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { Customer, NairaAmount } from "@/shared/types/domain";
import { isInMonth } from "../utils/check-month-aligns";

export type CustomerCollectedAmount = {
  customer: Customer | undefined;
  amount: NairaAmount;
};

export function getTotalCollectedAmount(businessId: string): NairaAmount {
  const initialPayments = mockSaleTransactions
    .filter((sale) => sale.businessId === businessId)
    .reduce((total, sale) => total + sale.amountPaid, 0);
  const repayments = mockPaymentTransactions
    .filter((payment) => payment.businessId === businessId)
    .reduce((total, payment) => total + payment.amountReceived, 0);
  return initialPayments + repayments;
}

export function getCollectedAmountForCustomer(
  businessId: string,
  customerId: string,
): NairaAmount {
  const initialPayments = mockSaleTransactions
    .filter(
      (sale) =>
        sale.businessId === businessId && sale.customerId === customerId,
    )
    .reduce((total, sale) => total + sale.amountPaid, 0);
  const repayments = mockPaymentTransactions
    .filter(
      (payment) =>
        payment.businessId === businessId && payment.customerId === customerId,
    )
    .reduce((total, payment) => total + payment.amountReceived, 0);
  return initialPayments + repayments;
}

export function getLargestCollectedCustomer(
  businessId: string,
): CustomerCollectedAmount | undefined {
  return mockCustomers
    .filter((customer) => customer.businessId === businessId)
    .map((customer) => ({
      customer,
      amount: getCollectedAmountForCustomer(businessId, customer.id),
    }))
    .filter((item) => item.amount > 0)
    .sort((first, second) => second.amount - first.amount)[0];
}

export function getLowestCollectedCustomer(
  businessId: string,
): CustomerCollectedAmount | undefined {
  return mockCustomers
    .filter((customer) => customer.businessId === businessId)
    .map((customer) => ({
      customer,
      amount: getCollectedAmountForCustomer(businessId, customer.id),
    }))
    .filter((item) => item.amount > 0)
    .sort((first, second) => first.amount - second.amount)[0];
}

export function getCollectedAmountForMonth(
  businessId: string,
  month: string,
): NairaAmount {
  const initialPayments = mockSaleTransactions
    .filter(
      (sale) =>
        sale.businessId === businessId && isInMonth(sale.createdAt, month),
    )
    .reduce((total, sale) => total + sale.amountPaid, 0);
  const repayments = mockPaymentTransactions
    .filter(
      (payment) =>
        payment.businessId === businessId &&
        isInMonth(payment.createdAt, month),
    )
    .reduce((total, payment) => total + payment.amountReceived, 0);
  return initialPayments + repayments;
}
