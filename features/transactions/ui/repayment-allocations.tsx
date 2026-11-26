// import { getOwedAmount } from "@/features/analytics/selectors/get-analytics-data";
import {
  mockSaleRepaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import { getOwedDetailsOfTransaction } from "@/shared/selectors/txn-owe-getters";
// import { getOwedAmount } from "@/shared/selectors/amount-getters";
import type { RepaymentAllocation } from "@/shared/types/domain";
import { formatNaira } from "@/shared/utils/format-naira";

export function RepaymentAllocations({
  allocations,
}: {
  allocations: RepaymentAllocation[];
}) {
  return (
    <div className="mt-6">
      <div className="flex items-end justify-between">
        <p className="text-sm font-bold text-[var(--forest-soft)]">
          Allocated to sales
        </p>
        <p className="text-xs font-bold text-[var(--muted)]">
          {allocations.length} allocation{allocations.length === 1 ? "" : "s"}
        </p>
      </div>
      <ul className="mt-3 divide-y divide-[var(--line)] overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4">
        {allocations.map((allocation) => {
          const sale = [
            ...mockSaleTransactions,
            ...mockSaleRepaymentTransactions,
          ].find((item) => item.id === allocation.saleTransactionId);
          const owedAmount = sale ? getOwedDetailsOfTransaction(sale).outstandingAmount : undefined;

          return (
            <li
              key={allocation.saleTransactionId}
              className="flex flex-col gap-1 py-4"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="min-w-0 truncate text-sm font-bold text-[var(--ink)]">
                  {sale?.sale.description ?? "Sale transaction"}
                </p>
                <p className="shrink-0 px-3 py-1.5 text-center text-md font-extrabold text-[var(--forest)]">
                  {formatNaira(allocation.debtAmountPaid)}
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <p className="mt-1 text-xs font-medium text-[var(--muted)]">
                  Purchase price: {formatNaira(sale?.sale.productPrice ?? 0)}
                </p>
                <p
                  className={`mt-1 text-[11px] font-bold ${owedAmount === 0 ? "text-[var(--forest)]" : "text-[#b45309]"}`}
                >
                  {owedAmount === 0
                    ? "Settled"
                    : `Owes: ${formatNaira(owedAmount ?? 0)}`}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
