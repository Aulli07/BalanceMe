import { CustomerDebtSummary } from "../types/owe-type";

export function sortCustomers(customers: CustomerDebtSummary[]) {
  return [...customers].sort((first, second) => {
    if (first.customer.pinned !== second.customer.pinned) {
      return first.customer.pinned ? -1 : 1;
    }
    if (first.hasOverdueDebt !== second.hasOverdueDebt) {
      return first.hasOverdueDebt ? -1 : 1;
    }

    const oldestDifference =
      new Date(first.oldestOutstandingAt).getTime() -
      new Date(second.oldestOutstandingAt).getTime();
    if (oldestDifference !== 0) return oldestDifference;

    return second.owedKobo - first.owedKobo;
  });
}