import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";
import { getTotalAmountOwedForCustomer } from "@/shared/selectors/customer-owe-getters";
import { customerFilters } from "../data/customers";
import { getCustomers, getCustomerSaleTransactionCount } from "@/shared/selectors/customer-getters";

export function filterCustomers(
  activeFilter: (typeof customerFilters)[number],
  businessId: string
) {
  const customers = getCustomers(ACTIVE_BUSINESS_ID);

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
          getCustomerSaleTransactionCount(second.id, businessId) -
          getCustomerSaleTransactionCount(first.id, businessId),
      );
    case "Lowest":
      return [...customers].sort(
        (first, second) =>
          getCustomerSaleTransactionCount(first.id, businessId) -
          getCustomerSaleTransactionCount(second.id, businessId),
      );
    default:
      return customers;
  }
}
