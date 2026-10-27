import type { getTransactionActivity } from "../selectors/get-transactions";

import { NairaKobo, PaymentAllocation, PaymentTransaction, SaleTransaction } from "@/shared/types/domain";
import { Dispatch, SetStateAction } from "react";
import { filters } from "../data/txn-stuff";


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
  setActiveFilter: Dispatch<SetStateAction<(typeof filters)[number]>>;
  activeFilter: (typeof filters)[number];
  month: string;
  monthIndex: number;
  monthCount: number;
  onMonthChange: React.Dispatch<React.SetStateAction<number>>;
  paidKobo: NairaKobo;
  owedKobo: NairaKobo;
};


export type TransactionActivityProps = ReturnType<typeof getTransactionActivity>;

// Gets the single transaction
export type TransactionActivityItemProps = TransactionActivityProps[number];


export type TransactionMonthlyActivityProps = {
  transactions: Record<string, TransactionActivityProps>;
}

