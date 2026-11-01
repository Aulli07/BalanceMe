import type {
  CustomerMonthlyActivity,
  CustomerStats,
} from "../types/customer-detail";
export function InteractionChart({
  months,
  stats,
}: {
  months: CustomerMonthlyActivity[];
  stats: CustomerStats;
}) {
  const maxActivity = Math.max(...months.map((item) => item.count), 1);
  return (
    <section className="mt-7" aria-labelledby="interaction-heading">
      <div className="flex items-center justify-between">
        <div>
          <h2 id="interaction-heading" className="text-lg font-bold">
            Interactions
          </h2>
          <p className="text-xs text-[var(--muted)]">Last 6 months</p>
        </div>
        <span className="text-xs font-semibold text-[var(--forest-soft)]">
          {stats.transactionCount} total
        </span>
      </div>
      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
        <div className="flex h-28 items-end justify-between gap-2">
          {months.map((month) => (
            <div
              key={month.month}
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-[10px] font-bold text-[var(--muted)]">
                {month.count || ""}
              </span>
              <div
                className="w-full max-w-8 rounded-t-md bg-[var(--forest)]"
                style={{
                  height: `${Math.max((month.count / maxActivity) * 76, month.count ? 10 : 3)}px`,
                  opacity: month.count ? 1 : 0.16,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between gap-2">
          {months.map((month) => (
            <span
              key={month.month}
              className="flex-1 text-center text-[10px] text-[var(--muted)]"
            >
              {month.month}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
