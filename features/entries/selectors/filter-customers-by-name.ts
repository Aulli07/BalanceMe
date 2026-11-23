import type { Customer } from "@/shared/types/domain";

export function filterCustomersByName(
  customers: Customer[],
  searchQuery: string,
) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  if (!normalizedQuery) return customers;

  return customers.filter((customer) =>
    customer.name.toLowerCase().includes(normalizedQuery),
  );
}
