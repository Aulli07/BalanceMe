import type { NairaKobo } from "@/shared/types/domain";

export interface CustomerStats {
  paidTotalKobo: NairaKobo;
  transactionCount: number;
  owesNowKobo: NairaKobo;
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
  amountKobo: NairaKobo;
  createdAt: string;
  paymentStatus: string;
  categoryName?: string;
}

