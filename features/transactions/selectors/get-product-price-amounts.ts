import {
  mockCustomers,
  mockSaleRepaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { NairaAmount } from "@/shared/types/domain";
import { isInMonth } from "../utils/check-month-aligns";
import { CustomerProductPriceAmount } from "../types/amounts";



export function getTotalProductPrice(businessId: string): NairaAmount {
  return [...mockSaleTransactions, ...mockSaleRepaymentTransactions]
    .filter((sale) => sale.businessId === businessId)
    .reduce((total, sale) => total + sale.sale.productPrice, 0);
}

export function getProductPriceForCustomer(
  businessId: string,
  customerId: string,
): NairaAmount {
  return [...mockSaleTransactions, ...mockSaleRepaymentTransactions]
    .filter(
      (sale) =>
        sale.businessId === businessId && sale.customerId === customerId,
    )
    .reduce((total, sale) => total + sale.sale.productPrice, 0);
}

export function getLargestProductPriceCustomer(
  businessId: string,
): CustomerProductPriceAmount | undefined {
  return mockCustomers
    .filter((customer) => customer.businessId === businessId)
    .map((customer) => ({
      customer,
      amount: getProductPriceForCustomer(businessId, customer.id),
    }))
    .filter((item) => item.amount > 0)
    .sort((first, second) => second.amount - first.amount)[0];
}

export function getLowestProductPriceCustomer(
  businessId: string,
): CustomerProductPriceAmount | undefined {
  return mockCustomers
    .filter((customer) => customer.businessId === businessId)
    .map((customer) => ({
      customer,
      amount: getProductPriceForCustomer(businessId, customer.id),
    }))
    .filter((item) => item.amount > 0)
    .sort((first, second) => first.amount - second.amount)[0];
}

export function getProductPriceForMonth(
  businessId: string,
  month: string,
): NairaAmount {
  return [...mockSaleTransactions, ...mockSaleRepaymentTransactions]
    .filter(
      (sale) =>
        sale.businessId === businessId && isInMonth(sale.createdAt, month),
    )
    .reduce((total, sale) => total + sale.sale.productPrice, 0);
}
