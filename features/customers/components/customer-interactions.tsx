import type { CustomerMonthlyActivity } from "../types/customer-detail";

export function CustomerInteractions({
  months,
  averagePerMonth,
}: {
  months: CustomerMonthlyActivity[];
  averagePerMonth: number;
}) {
  const maxCount = Math.max(...months.map((m) => m.count), 1);

  return (
    <section className="mt-8">
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-[var(--ink)]">
          Customer interactions
        </h2>
        <p className="text-[11px] text-[var(--muted)]">
          A simple six-month view
        </p>
      </div>

      <div className="mt-4 rounded-2xl border border-[var(--line)] bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--ink)]">
              Transactions over time
            </p>
            <p className="text-[11px] text-[var(--muted)]">
              Recorded entries by month
            </p>
          </div>
          <span className="rounded-full bg-[var(--forest)]/5 px-3 py-1 text-[11px] font-semibold text-[var(--forest)]">
            {averagePerMonth} per month avg.
          </span>
        </div>

        {/* Bar chart */}
        <div className="mt-6 flex items-end justify-between gap-2">
          {months.map((month) => {
            const heightPercent =
              maxCount > 0 ? (month.count / maxCount) * 100 : 0;
            return (
              <div
                key={month.month}
                className="flex flex-1 flex-col items-center gap-1.5"
              >
                <span className="text-[11px] font-bold text-[var(--ink)]">
                  {month.count > 0 ? month.count : ""}
                </span>
                <div className="w-full max-w-[36px]">
                  <div
                    className="w-full rounded-t-lg bg-[var(--forest)] transition-all"
                    style={{
                      height: `${Math.max(heightPercent * 0.8, month.count > 0 ? 16 : 4)}px`,
                      opacity: month.count > 0 ? 0.4 + (month.count / maxCount) * 0.6 : 0.15,
                    }}
                  />
                </div>
                <span className="text-[10px] text-[var(--muted)]">
                  {month.month}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-[10px] text-[var(--muted)]">
          ⏺ Sample activity only · based on an illustrative{" "}
          {months.reduce((acc, m) => acc + m.count, 0)}-entry history
        </p>
      </div>
    </section>
  );
}

