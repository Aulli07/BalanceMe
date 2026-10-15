import { filters } from "@/app/customers/page";
import { Customer, customers } from "../data/customers";


export function filterCustomers(activeFilter: (typeof filters)[number]) {
  switch (activeFilter) {
    case "All":
      return customers;
    case "Paid":
      return customers.filter((customer) => !customer.owing);
    case "Owed":
      return customers.filter((customer) => customer.owing);
    case "Highest":
      return customers.sort((a, b) => b.transactions - a.transactions);
    case "Lowest":
      return customers.sort((a, b) => a.transactions - b.transactions);
    case "Date":
      return 
    default:
      return customers;
  }
}