import type { Customer, SaleTransaction } from "@/shared/types/domain";
import { CanContinueEntryOptions } from "../types/entry-type";


export function canContinueEntry({
  customer,
  entryType,
  productPrice,
  amountPaid = "0",
  amountRepaid,
  currentPurchase,
}: CanContinueEntryOptions) {
  
  const isDebtRepaymentMode = entryType === 2;
  if (isDebtRepaymentMode) {
    const saleErrorStatus = checkSaleError(productPrice, amountPaid, customer);
    const repaymentErrorStatus = checkRepaymentError(amountRepaid, customer, currentPurchase);
    return saleErrorStatus && repaymentErrorStatus
  }

  const isRepaymentMode = entryType === 1;
  if (isRepaymentMode) {
    return checkRepaymentError(amountRepaid, customer, currentPurchase)
  }

  return checkSaleError(productPrice, amountPaid, customer);
}


function checkSaleError(productPrice: string, amountPaid: string, customer: Customer | undefined) {
  const price = Number(productPrice);
  const paid = Number(amountPaid);
  const isFullyPaid =
    Number.isFinite(price) && Number.isFinite(paid) && price > 0 && paid >= price;

  return Boolean(customer && Number.isFinite(price) && price > 0 && Number.isFinite(paid) && paid >= 0 && !isFullyPaid);
}

function checkRepaymentError(amountRepaid: string, customer: Customer | undefined, currentPurchase: SaleTransaction | undefined) {
  const repaid = Number(amountRepaid);
    return Boolean(
      customer && currentPurchase && Number.isFinite(repaid) && repaid > 0,
    )
}