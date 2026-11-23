import type { Customer, SaleTransaction } from "@/shared/types/domain";

type CanContinueEntryOptions = {
  customer: Customer | undefined;
  entryType: 0 | 1 | 2;
  productPrice: string;
  amountRepaid: string;
  currentPurchase: SaleTransaction | undefined;
};

export function canContinueEntry({
  customer,
  entryType,
  productPrice,
  amountRepaid,
  currentPurchase,
}: CanContinueEntryOptions) {
  if (entryType === 1) {
    return Boolean(
      customer &&
        currentPurchase &&
        Number(amountRepaid) > 0,
    );
  }

  return Boolean(customer && Number(productPrice) > 0);
}
