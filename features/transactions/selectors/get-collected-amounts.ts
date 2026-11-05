import {
  mockCustomers,
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { Customer, NairaKobo } from "@/shared/types/domain";
import { isInMonth } from "../utils/check-month-aligns";

export type CustomerCollectedAmount = {
  customer: Customer | undefined;
  amountKobo: NairaKobo;
};

export function getTotalCollectedKobo(businessId: string): NairaKobo {
  const initialPayments = mockSaleTransactions
    .filter((sale) => sale.businessId === businessId)
    .reduce((total, sale) => total + sale.initialPaidKobo, 0);
  const repayments = mockPaymentTransactions
    .filter((payment) => payment.businessId === businessId)
    .reduce((total, payment) => total + payment.receivedKobo, 0);
  return initialPayments + repayments;
}

export function getCollectedKoboForCustomer(
  businessId: string,
  customerId: string,
): NairaKobo {
  const initialPayments = mockSaleTransactions
    .filter(
      (sale) =>
        sale.businessId === businessId && sale.customerId === customerId,
    )
    .reduce((total, sale) => total + sale.initialPaidKobo, 0);
  const repayments = mockPaymentTransactions
    .filter(
      (payment) =>
        payment.businessId === businessId && payment.customerId === customerId,
    )
    .reduce((total, payment) => total + payment.receivedKobo, 0);
  return initialPayments + repayments;
}

export function getLargestCollectedCustomer(
  businessId: string,
): CustomerCollectedAmount | undefined {
  return mockCustomers
    .filter((customer) => customer.businessId === businessId)
    .map((customer) => ({
      customer,
      amountKobo: getCollectedKoboForCustomer(businessId, customer.id),
    }))
    .filter((item) => item.amountKobo > 0)
    .sort((first, second) => second.amountKobo - first.amountKobo)[0];
}

export function getLowestCollectedCustomer(
  businessId: string,
): CustomerCollectedAmount | undefined {
  return mockCustomers
    .filter((customer) => customer.businessId === businessId)
    .map((customer) => ({
      customer,
      amountKobo: getCollectedKoboForCustomer(businessId, customer.id),
    }))
    .filter((item) => item.amountKobo > 0)
    .sort((first, second) => first.amountKobo - second.amountKobo)[0];
}

export function getCollectedKoboForMonth(
  businessId: string,
  month: string,
): NairaKobo {
  const initialPayments = mockSaleTransactions
    .filter(
      (sale) =>
        sale.businessId === businessId && isInMonth(sale.createdAt, month),
    )
    .reduce((total, sale) => total + sale.initialPaidKobo, 0);
  const repayments = mockPaymentTransactions
    .filter(
      (payment) =>
        payment.businessId === businessId &&
        isInMonth(payment.createdAt, month),
    )
    .reduce((total, payment) => total + payment.receivedKobo, 0);
  return initialPayments + repayments;
}
