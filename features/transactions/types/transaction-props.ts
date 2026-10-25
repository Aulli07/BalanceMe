import { NairaKobo, PaymentAllocation, PaymentTransaction, SaleTransaction } from "@/shared/types/domain";


export type PaymentTransactionUiProps = {
  transaction: PaymentTransaction;
  amountPaid: number;
  allocations: PaymentAllocation[]
};


export type SaleTransactionUiProps = {
  transaction: SaleTransaction;
  productPrice: number;
  amountPaid: number;
  balance: number;
};

export type TransactionSummaryProps = {
  month: string;
  monthIndex: number;
  monthCount: number;
  onMonthChange: React.Dispatch<React.SetStateAction<number>>;
  paidKobo: NairaKobo;
  owedKobo: NairaKobo;
};