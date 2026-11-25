import type { NairaAmount } from "@/shared/types/domain";

export interface CustomerStats {
  paidTotalAmount: NairaAmount;
  transactionCount: number;
  owesNowAmount: NairaAmount;
}

export interface CustomerMonthlyActivity {
  month: string;
  count: number;
}

export interface CustomerTransactionItem {
  id: string;
  type: "sale" | "repayment" | "sale_repayment";
  title: string;
  description: string;
  amount: NairaAmount;
  createdAt: string;
  paymentStatus: string;
  categoryName?: string;
}


export interface AddCustomerSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCustomerAdded?: () => void;
}

export interface AddCustomerInput {
  name: string;
  phone: string;
  email: string;
}