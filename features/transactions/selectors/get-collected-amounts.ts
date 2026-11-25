import {
  mockCustomers,
  mockTransactions,
} from "@/shared/data/domain-mock-data";
import type { NairaAmount } from "@/shared/types/domain";
import { isInMonth } from "../utils/check-month-aligns";
import { CustomerCollectedAmount } from "../types/amounts";




export function getTotalCollectedAmount(businessId: string): NairaAmount {
  return mockTransactions
    .filter((transaction) => transaction.businessId === businessId)
    .reduce((total, transaction) => total + (transaction.type === "sale" ? transaction.sale.amountPaid : transaction.amountReceived), 0);
}

export function getCollectedAmountForCustomer(
  businessId: string,
  customerId: string,
): NairaAmount {
  return mockTransactions
    .filter((transaction) => transaction.businessId === businessId && transaction.customerId === customerId)
    .reduce((total, transaction) => total + (transaction.type === "sale" ? transaction.sale.amountPaid : transaction.amountReceived), 0);
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
  return mockTransactions
    .filter((transaction) => transaction.businessId === businessId && isInMonth(transaction.createdAt, month))
    .reduce((total, transaction) => total + (transaction.type === "sale" ? transaction.sale.amountPaid : transaction.amountReceived), 0);
}
