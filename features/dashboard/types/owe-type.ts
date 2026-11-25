import { Customer, SaleRepaymentTransaction, SaleTransaction } from "@/shared/types/domain";

export type DebtSaleTransaction = SaleTransaction | SaleRepaymentTransaction;

export type OpenDebt = {
  txn: DebtSaleTransaction;
  outstandingAmount: number;
  owedStatus: boolean;
  overdue: boolean;
};

export type CustomerDebtSummary = {
  customer: Customer;
  owedAmount: number;
  overdueAmount: number;
  oldestOutstandingAt: string;
  hasOverdueDebt: boolean;
  openDebts: OpenDebt[];
};
