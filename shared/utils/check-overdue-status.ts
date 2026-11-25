import { SaleRepaymentTransaction, SaleTransaction } from "../types/domain";
import { getDueDate } from "./get-due-date";

export function isDebtOverdue(sale: SaleTransaction | SaleRepaymentTransaction, now: Date) {
  const status = new Date(getDueDate(sale.createdAt)).getTime() < now.getTime();
  return status;
}