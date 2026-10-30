import { formatNaira } from "@/shared/utils/format-naira";
import type { CustomerStats } from "../types/customer-detail";

export function CustomerFinancialSummary({ stats }: { stats: CustomerStats }) {
  const hasDebt = stats.owesNowKobo > 0;

  return (
    <div className="mt-6 grid grid-cols-3 gap-3">
      {/* Paid total */}
      <div className="rounded-2xl bg-white p-3.5 shadow-sm">
        <p className="text-[11px] font-semibold text-[var(--muted)]">
          Paid total
        </p>
        <p className="mt-1 text-lg font-extrabold text-[var(--ink)]">
          {formatNaira(stats.paidTotalKobo)}
        </p>
        <p className="mt-0.5 text-[10px] text-[var(--muted)]">
          Paid to your shop
        </p>
      </div>

      {/* Transactions */}
      <div className="rounded-2xl bg-white p-3.5 shadow-sm">
        <p className="text-[11px] font-semibold text-[var(--muted)]">
          Transactions
        </p>
        <p className="mt-1 text-lg font-extrabold text-[var(--ink)]">
          {stats.transactionCount}
        </p>
        <p className="mt-0.5 text-[10px] text-[var(--muted)]">All recorded</p>
      </div>

      {/* Owes now */}
      <div
        className={`rounded-2xl p-3.5 shadow-sm ${
          hasDebt
            ? "bg-red-50 ring-1 ring-red-200"
            : "bg-white"
        }`}
      >
        <p
          className={`text-[11px] font-semibold ${
            hasDebt ? "text-red-500" : "text-[var(--muted)]"
          }`}
        >
          Owes now
        </p>
        <p
          className={`mt-1 text-lg font-extrabold ${
            hasDebt ? "text-red-600" : "text-[var(--ink)]"
          }`}
        >
          {formatNaira(stats.owesNowKobo)}
        </p>
        <p
          className={`mt-0.5 text-[10px] ${
            hasDebt ? "text-red-400" : "text-[var(--muted)]"
          }`}
        >
          {hasDebt ? "Needs follow up" : "All clear"}
        </p>
      </div>
    </div>
  );
}

