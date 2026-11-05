import type {
  PaymentTransaction,
  SaleTransaction,
} from "@/shared/types/domain";

export function getSaleDetails(transaction: SaleTransaction) {
  return {
    productPrice: transaction.productPrice,
    amountPaid: transaction.amountPaid,
    balance: Math.max(transaction.productPrice - transaction.amountPaid, 0),
  };
}

export function getPaymentDetails(transaction: PaymentTransaction) {
  return {
    amountPaid: transaction.amountReceived,
    allocations: transaction.allocations,
  };
}
