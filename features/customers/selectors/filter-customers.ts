import { ACTIVE_BUSINESS_ID } from "@/shared/data/current-context";
import { mockCustomers } from "@/shared/data/domain-mock-data";
import { getTotalAmountOwedForCustomer } from "@/features/dashboard/selectors/get-customers-owing";
import { filters } from "../data/customers";
import { getCustomerSaleTransactionCount } from "./get-customer-txn-count";

const customers = mockCustomers.filter(
  (customer) => customer.businessId === ACTIVE_BUSINESS_ID,
);

export function filterCustomers(activeFilter: (typeof filters)[number]) {
  switch (activeFilter) {
    case "All":
      return customers;
    case "Date":
      return [...customers].sort((first, second) =>
        second.createdAt.localeCompare(first.createdAt),
      );
    case "Pinned":
      return customers.filter((customer) => customer.pinned);
    case "Paid":
      return customers.filter(
        (customer) =>
          getTotalAmountOwedForCustomer(ACTIVE_BUSINESS_ID, customer.id) === 0,
      );
    case "Owed":
      return customers.filter(
        (customer) =>
          getTotalAmountOwedForCustomer(ACTIVE_BUSINESS_ID, customer.id) > 0,
      );
    case "Highest":
      return [...customers].sort(
        (first, second) =>
          getCustomerSaleTransactionCount(second.id) -
          getCustomerSaleTransactionCount(first.id),
      );
    case "Lowest":
      return [...customers].sort(
        (first, second) =>
          getCustomerSaleTransactionCount(first.id) -
          getCustomerSaleTransactionCount(second.id),
      );
    default:
      return customers;
  }
}
