import type {
  PaymentTransaction,
  SaleTransaction,
} from "@/shared/types/domain";

export function getSaleDetails(transaction: SaleTransaction) {
  return {
    productPriceKobo: transaction.totalKobo,
    amountPaidKobo: transaction.initialPaidKobo,
    balanceKobo: Math.max(transaction.totalKobo - transaction.initialPaidKobo, 0),
  };
}

export function getPaymentDetails(transaction: PaymentTransaction) {
  return {
    amountPaidKobo: transaction.receivedKobo,
    allocations: transaction.allocations,
  };
}
