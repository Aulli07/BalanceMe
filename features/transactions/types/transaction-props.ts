import type { getTransactionActivity } from "../selectors/get-transactions";

import { NairaAmount, RepaymentAllocation, RepaymentTransaction, SaleRepaymentTransaction, SaleTransaction } from "@/shared/types/domain";
import { Dispatch, SetStateAction } from "react";
import { filters } from "../data/txn-stuff";


export type PaymentTransactionUiProps = {
  transaction: RepaymentTransaction;
  amountPaid: number;
  allocations: RepaymentAllocation[]
};


export type SaleTransactionUiProps = {
  transaction: SaleTransaction | SaleRepaymentTransaction;
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
  productPrice: NairaAmount;
  collectedAmount: NairaAmount;
};


export type TransactionActivityProps = ReturnType<typeof getTransactionActivity>;

// Gets the single transaction
export type TransactionActivityItemProps = TransactionActivityProps[number];


export type TransactionMonthlyActivityProps = {
  transactions: Record<string, TransactionActivityProps>;
}
