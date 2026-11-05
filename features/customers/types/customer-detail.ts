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
  type: "sale" | "payment";
  title: string;
  description: string;
  amount: NairaAmount;
  createdAt: string;
  paymentStatus: string;
  categoryName?: string;
}

