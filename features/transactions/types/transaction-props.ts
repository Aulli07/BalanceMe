import { PaymentAllocation, PaymentTransaction, SaleTransaction } from "@/shared/types/domain";


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