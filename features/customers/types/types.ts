import type { Customer } from "@/shared/types/domain";
import type {
  CustomerMonthlyActivity,
  CustomerStats,
  CustomerTransactionItem,
} from "./customer-detail";

export type CustomerDetailData = {
  customer: Customer;
  stats: CustomerStats;
  months: CustomerMonthlyActivity[];
  transactions: CustomerTransactionItem[];
};
