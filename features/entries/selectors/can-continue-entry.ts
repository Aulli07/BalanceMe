import type { Customer, SaleTransaction } from "@/shared/types/domain";

type CanContinueEntryOptions = {
  customer: Customer | undefined;
  entryType: 0 | 1 | 2;
  debtRepaymentMode?: 0 | 1;
  productPrice: string;
  amountPaid?: string;
  amountRepaid: string;
  currentPurchase: SaleTransaction | undefined;
};

export function canContinueEntry({
  customer,
  entryType,
  debtRepaymentMode = 0,
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


  // const isRepaymentMode =
  //   entryType === 1 || (entryType === 2 && debtRepaymentMode === 1);
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
    !isNaN(price) && !isNaN(paid) && price > 0 && paid >= price;

  return Boolean(customer && !isNaN(price) && price > 0 && !isFullyPaid);
}

function checkRepaymentError(amountRepaid: string, customer: Customer | undefined, currentPurchase: SaleTransaction | undefined) {
  const repaid = Number(amountRepaid);
    return Boolean(
      customer &&
        currentPurchase &&
        !isNaN(repaid) &&
        repaid > 0,
    )
}