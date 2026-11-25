import {
  ACTIVE_BUSINESS_ID,
  mockTransactions,
} from "@/shared/data/domain-mock-data";
import { getTotalAmountOwedForCustomer } from "@/shared/selectors/customer-owe-getters";
import type { CustomerStats } from "../types/customer-detail";
import { getCollectedAmountForCustomer } from "@/features/transactions/selectors/get-collected-amounts";
import { getCustomerTransactions } from "@/shared/selectors/customer-getters";

/**
 * Computes aggregate financial stats for a single customer:
 * - Total paid to the business (initial payments + subsequent payments)
 * - Total transaction count (sales + payments)
 * - Outstanding amount owed
 */
export function getCustomerStats(customerId: string): CustomerStats {
  const transactions = getCustomerTransactions(ACTIVE_BUSINESS_ID, customerId);
  const paidTotalAmount = getCollectedAmountForCustomer(ACTIVE_BUSINESS_ID, customerId);
  // const paidTotalAmount = transactions.reduce(
  //   (total, transaction) =>
  //     total +
  //     (transaction.type === "sale"
  //       ? transaction.sale.amountPaid
  //       : transaction.amountReceived),
  //   0,
  // );
  const owesNowAmount = getTotalAmountOwedForCustomer(
    ACTIVE_BUSINESS_ID,
    customerId,
  );
  const transactionCount = transactions.length;

  return { paidTotalAmount, transactionCount, owesNowAmount };
}
