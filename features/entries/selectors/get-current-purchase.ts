import type { Customer, SaleTransaction } from "@/shared/types/domain";

export function getCurrentPurchases(
  customer: Customer | undefined,
  selectedPurchases: SaleTransaction[],
) {
  return selectedPurchases.filter(
    (purchase) => purchase.customerId === customer?.id,
  );
}
