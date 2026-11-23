import { Customer, SaleRepaymentTransaction, SaleTransaction } from "@/shared/types/domain";

export type DebtSaleTransaction = SaleTransaction | SaleRepaymentTransaction;

export type OpenDebt = {
  saleTxn: DebtSaleTransaction;
  outstandingAmount: number;
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
