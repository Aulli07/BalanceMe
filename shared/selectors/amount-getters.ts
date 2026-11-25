import { getRepaymentsTransactions } from "./txn-getters";
import { mockTransactions } from "../data/domain-mock-data";
import { formatNaira } from "../utils/format-naira";
import { getRange, isTimeInRange } from "../utils/check-period-change";
import { CashRecordedPeriod } from "../types/period";


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
