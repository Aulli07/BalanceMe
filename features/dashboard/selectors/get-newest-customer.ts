import { mockCustomers } from "@/shared/data/domain-mock-data";

export function getNewestCustomer(businessId: string) {
  return [...mockCustomers]
    .filter((customer) => customer.businessId === businessId)
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
    )[0] ?? null;
}
