import type { Customer, SaleTransaction } from "@/shared/types/domain";

export function getCurrentPurchase(
  customer: Customer | undefined,
  selectedPurchase: SaleTransaction | undefined,
) {
  return selectedPurchase?.customerId === customer?.id
    ? selectedPurchase
    : undefined;
}
