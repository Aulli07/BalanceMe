import { mockCustomers, ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";
import type { Customer } from "@/shared/types/domain";

export interface AddCustomerInput {
  name: string;
  phone: string;
  email: string;
}

/**
 * Validates the add-customer form fields.
 * Returns an error message string, or null if valid.
 */
export function validateCustomerInput(input: AddCustomerInput): string | null {
  const trimmedName = input.name.trim();

  if (!trimmedName) return "Customer name is required.";
  if (trimmedName.length < 2) return "Name must be at least 2 characters.";

  if (input.phone.trim() && !/^\+?[\d\s-]{7,15}$/.test(input.phone.trim())) {
    return "Enter a valid phone number.";
  }

  if (input.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) {
    return "Enter a valid email address.";
  }

  const duplicate = mockCustomers.find(
    (c) =>
      c.businessId === ACTIVE_BUSINESS_ID &&
      c.name.toLowerCase() === trimmedName.toLowerCase(),
  );
  if (duplicate) return "A customer with this name already exists.";

  return null;
}

/**
 * Creates a new Customer object and pushes it into the mock data array.
 * Returns the newly created customer.
 */
export function addCustomer(input: AddCustomerInput): Customer {
  const now = new Date().toISOString();
  const slug = input.name.trim().toLowerCase().replace(/\s+/g, "-");

  const customer: Customer = {
    id: `customer-${slug}-${Date.now()}`,
    businessId: ACTIVE_BUSINESS_ID,
    name: input.name.trim(),
    pinned: false,
    phone: input.phone.trim() || undefined,
    email: input.email.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };

  mockCustomers.push(customer);
  return customer;
}

