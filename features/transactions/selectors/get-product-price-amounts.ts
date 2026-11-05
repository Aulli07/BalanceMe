import {
  mockCustomers,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { Customer, NairaKobo } from "@/shared/types/domain";

export type CustomerProductPriceAmount = {
  customer: Customer | undefined;
  amountKobo: NairaKobo;
};

function isInMonth(createdAt: string, month: string) {
  const [monthName, year] = month.split(" ");
  const date = new Date(createdAt);
  return (
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() === new Date(`${monthName} 1, ${year}`).getMonth()
  );
}

export function getTotalProductPriceKobo(businessId: string): NairaKobo {
  return mockSaleTransactions
    .filter((sale) => sale.businessId === businessId)
    .reduce((total, sale) => total + sale.totalKobo, 0);
}

export function getProductPriceKoboForCustomer(
  businessId: string,
  customerId: string,
): NairaKobo {
  return mockSaleTransactions
    .filter(
      (sale) =>
        sale.businessId === businessId && sale.customerId === customerId,
    )
    .reduce((total, sale) => total + sale.totalKobo, 0);
}

export function getLargestProductPriceCustomer(
  businessId: string,
): CustomerProductPriceAmount | undefined {
  return mockCustomers
    .filter((customer) => customer.businessId === businessId)
    .map((customer) => ({
      customer,
      amountKobo: getProductPriceKoboForCustomer(businessId, customer.id),
    }))
    .filter((item) => item.amountKobo > 0)
    .sort((first, second) => second.amountKobo - first.amountKobo)[0];
}

export function getLowestProductPriceCustomer(
  businessId: string,
): CustomerProductPriceAmount | undefined {
  return mockCustomers
    .filter((customer) => customer.businessId === businessId)
    .map((customer) => ({
      customer,
      amountKobo: getProductPriceKoboForCustomer(businessId, customer.id),
    }))
    .filter((item) => item.amountKobo > 0)
    .sort((first, second) => first.amountKobo - second.amountKobo)[0];
}

export function getProductPriceKoboForMonth(
  businessId: string,
  month: string,
): NairaKobo {
  return mockSaleTransactions
    .filter(
      (sale) =>
        sale.businessId === businessId && isInMonth(sale.createdAt, month),
    )
    .reduce((total, sale) => total + sale.totalKobo, 0);
}
