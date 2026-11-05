import type {
  PaymentTransaction,
  SaleTransaction,
} from "@/shared/types/domain";

export function getSaleDetails(transaction: SaleTransaction) {
  return {
    productPriceKobo: transaction.productPrice,
    amountPaidKobo: transaction.amountPaid,
    balanceKobo: Math.max(transaction.productPrice - transaction.amountPaid, 0),
  };
}

export function getPaymentDetails(transaction: PaymentTransaction) {
  return {
    amountPaidKobo: transaction.amountReceived,
    allocations: transaction.allocations,
  };
}
