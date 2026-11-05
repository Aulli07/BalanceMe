import { Customer, SaleTransaction } from "@/shared/types/domain";

export type OpenDebt = {
  sale: SaleTransaction;
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