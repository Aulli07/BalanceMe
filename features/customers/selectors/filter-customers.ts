import { ACTIVE_BUSINESS_ID, mockCustomers } from "@/shared/data/domain-mock-data";
import { getTotalAmountOwedForCustomer } from "@/features/dashboard/selectors/get-customers-owing";
import { getCustomerSaleTransactionCount } from "./get-customer-txn-count";
import { customerFilters } from "../data/customers";
import { getCustomers } from "@/shared/selectors/getters";




export function filterCustomers(activeFilter: (typeof customerFilters)[number]) {
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
