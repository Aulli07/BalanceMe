import {
  mockCustomers,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { Customer, NairaAmount } from "@/shared/types/domain";
import { isInMonth } from "../utils/check-month-aligns";

export type CustomerProductPriceAmount = {
  customer: Customer | undefined;
  amount: NairaAmount;
};

// function isInMonth(createdAt: string, month: string) {
//   const [monthName, year] = month.split(" ");
//   const date = new Date(createdAt);
//   return (
//     date.getUTCFullYear() === Number(year) &&
//     date.getUTCMonth() === new Date(`${monthName} 1, ${year}`).getMonth()
//   );
// }

export function getTotalProductPrice(businessId: string): NairaAmount {
  return mockSaleTransactions
    .filter((sale) => sale.businessId === businessId)
    .reduce((total, sale) => total + sale.productPrice, 0);
}

export function getProductPriceForCustomer(
  businessId: string,
  customerId: string,
): NairaAmount {
  return mockSaleTransactions
    .filter(
      (sale) =>
        sale.businessId === businessId && sale.customerId === customerId,
    )
    .reduce((total, sale) => total + sale.productPrice, 0);
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
  return mockSaleTransactions
    .filter(
      (sale) =>
        sale.businessId === businessId && isInMonth(sale.createdAt, month),
    )
    .reduce((total, sale) => total + sale.productPrice, 0);
}
