import { Customer, SaleTransaction } from "@/shared/types/domain";

export type OpenDebt = {
  sale: SaleTransaction;
  outstandingKobo: number;
  overdue: boolean;
};

export type CustomerDebtSummary = {
  customer: Customer;
  owedKobo: number;
  overdueKobo: number;
  oldestOutstandingAt: string;
  hasOverdueDebt: boolean;
  openDebts: OpenDebt[];
};