import { DebtSaleTransaction } from "@/features/dashboard/types/owe-type";
import { isDebtOverdue } from "../utils/check-overdue-status";
import { getAllocatedPaymentsAmount } from "./amount-getters";

export function getOwedDetailsOfTransaction(txn: DebtSaleTransaction) {
  const outstandingAmount = Math.max(
    0,
    txn.sale.productPrice - txn.sale.amountPaid - getAllocatedPaymentsAmount(txn.id),
  );

  return {
    txn,
    outstandingAmount,
    owedStatus: outstandingAmount > 0,
    overdue: outstandingAmount > 0 && isDebtOverdue(txn, new Date()),
  };
}