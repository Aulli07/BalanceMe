import { getRepaymentsTransactions } from "./txn-getters";
import { mockTransactions } from "../data/domain-mock-data";
import { formatNaira } from "../utils/format-naira";
import { getRange, isTimeInRange } from "../utils/check-period-change";
import { CashRecordedPeriod } from "../types/period";
import type { NairaAmount, Transaction } from "../types/domain";
import { getOwedDetailsOfTransaction } from "./txn-owe-getters";


export function getCashRecordedAmount(
  businessId: string,
  period: CashRecordedPeriod,
) {
  const { start, end } = getRange(period);

  const amount = mockTransactions
    .filter(
      (transaction) =>
        transaction.businessId === businessId &&
        isTimeInRange(transaction.createdAt, start, end),
    )
    .reduce((total, transaction) => {
      if (transaction.type === "sale")
        return total + transaction.sale.amountPaid;
      return total + transaction.amountReceived;
    }, 0);

  return formatNaira(amount);
}


export function getAllocatedPaymentsAmount(saleTransactionId: string) {
  const transactions = getRepaymentsTransactions();
  return transactions
    .flatMap((payment) => payment.allocations)
    .filter((allocation) => allocation.saleTransactionId === saleTransactionId)
    .reduce((total, allocation) => total + allocation.debtAmountPaid, 0);
}


export function getReceivedAmount(transaction: Transaction) {
  return transaction.type === "sale"
    ? transaction.sale.amountPaid
    : transaction.amountReceived;
}

export function getTotalReceivedAmount(
  transactions: Transaction[],
): NairaAmount {
  return transactions.reduce(
    (total, transaction) => total + getReceivedAmount(transaction),
    0,
  );
}

export function getPurchaseAmountPaid(
  transactions: Transaction[],
): NairaAmount {
  return transactions.reduce(
    (total, transaction) =>
      transaction.type === "repayment"
        ? total
        : total + transaction.sale.amountPaid,
    0,
  );
}

export function getTotalPurchasePrice(
  transactions: Transaction[],
): NairaAmount {
  return transactions.reduce(
    (total, transaction) =>
      transaction.type === "repayment"
        ? total
        : total + transaction.sale.productPrice,
    0,
  );
}

export function getTotalOwedAmount(
  transactions: Transaction[],
): NairaAmount {
  return transactions.reduce(
    (total, transaction) => total + (transaction.type === "repayment" ? 0 : getOwedDetailsOfTransaction(transaction).outstandingAmount),
    0,
  );
}
