import type { Customer, SaleTransaction } from "@/shared/types/domain";
import type { CanContinueEntryOptions } from "../types/entry-type";
import { getOwedDetailsOfTransaction } from "@/shared/selectors/txn-owe-getters";

export function canContinueEntry({
  customer,
  entryType,
  productPrice,
  amountPaid = "0",
  amountRepaid,
  selectedPurchases,
}: CanContinueEntryOptions) {
  if (entryType === 2) {
    return checkSaleRepaymentError(
      productPrice,
      amountPaid,
      amountRepaid,
      customer,
      selectedPurchases,
    );
  }

  if (entryType === 1) {
    return checkRepaymentError(amountRepaid, customer, selectedPurchases);
  }

  return checkSaleError(productPrice, amountPaid, customer);
}

function checkSaleError(
  productPrice: string,
  amountPaid: string,
  customer: Customer | undefined,
): string | undefined {
  if (!customer) return "Select a customer before continuing.";

  const price = Number(productPrice);
  const paid = Number(amountPaid);

  if (!Number.isFinite(price) || price <= 0) {
    return "Enter a valid product price greater than zero.";
  }
  if (!Number.isFinite(paid) || paid < 0) {
    return "Amount paid must be zero or more.";
  }
  if (paid >= price) {
    return "Amount paid must be less than the product price.";
  }
}

function checkRepaymentError(
  amountRepaid: string,
  customer: Customer | undefined,
  selectedPurchases: SaleTransaction[],
): string | undefined {
  if (!customer) return "Select a customer before continuing.";

  const customerPurchases = selectedPurchases.filter(
    (purchase) => purchase.customerId === customer.id,
  );
  if (customerPurchases.length === 0) {
    return "Select at least one outstanding purchase to repay.";
  }

  const repaid = Number(amountRepaid);
  if (!Number.isFinite(repaid) || repaid <= 0) {
    return "Enter a repayment amount greater than zero.";
  }

  const totalOwed = customerPurchases.reduce(
    (total, purchase) =>
      total + getOwedDetailsOfTransaction(purchase).outstandingAmount,
    0,
  );
  if (totalOwed <= 0) {
    return "The selected purchases have no outstanding balance.";
  }
  if (repaid < totalOwed) {
    return `Repayment is short by ₦${(totalOwed - repaid).toLocaleString("en-NG")}.`;
  }
  if (repaid > totalOwed) {
    return `Repayment exceeds the selected purchases' total owed by ₦${(repaid - totalOwed).toLocaleString("en-NG")}.`;
  }
}

function checkSaleRepaymentError(
  productPrice: string,
  amountPaid: string,
  amountRepaid: string,
  customer: Customer | undefined,
  selectedPurchases: SaleTransaction[],
): string | undefined {
  return (
    checkSaleError(productPrice, amountPaid, customer) ??
    checkRepaymentError(amountRepaid, customer, selectedPurchases)
  );
}