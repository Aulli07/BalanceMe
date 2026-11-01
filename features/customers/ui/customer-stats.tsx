import { formatNaira } from "@/shared/utils/format-naira";
import type { CustomerStats } from "../types/customer-detail";
export function CustomerStatsCards({ stats }: { stats: CustomerStats }) {
  const totalHandled = stats.paidTotalKobo + stats.owesNowKobo;
  const averageValue = stats.transactionCount
    ? Math.round(totalHandled / stats.transactionCount)
    : 0;
  return (
    <section
      className="mt-4 grid grid-cols-3 gap-2.5"
      aria-label="Customer statistics"
    >
      <StatCard label="Paid total" value={formatNaira(stats.paidTotalKobo)} />
      <StatCard label="Transactions" value={String(stats.transactionCount)} />
      <StatCard label="Avg. value" value={formatNaira(averageValue)} />
    </section>
  );
}
function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="min-w-0 rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
      <p className="truncate text-[11px] font-medium text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-1 truncate text-base font-extrabold tracking-tight">
        {value}
      </p>
    </article>
  );
}
