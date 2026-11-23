import type { RepaymentTransaction, SaleRepaymentTransaction, SaleTransaction } from "@/shared/types/domain";

export function getSaleDetails(transaction: SaleTransaction | SaleRepaymentTransaction) {
  return {
    productPrice: transaction.sale.productPrice,
    amountPaid: transaction.sale.amountPaid,
    balance: Math.max(transaction.sale.productPrice - transaction.sale.amountPaid, 0),
  };
}

export function getPaymentDetails(transaction: RepaymentTransaction) {
  return {
    amountPaid: transaction.amountReceived,
    allocations: transaction.allocations,
  };
}
