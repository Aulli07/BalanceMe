import type { AnalyticsPeriod } from "../data/analytics-periods";

type AnalyticsPeriodSelectorProps = {
  periods: readonly { id: AnalyticsPeriod; label: string }[];
  selectedPeriod: AnalyticsPeriod;
  onPeriodChange: (period: AnalyticsPeriod) => void;
}

export function AnalyticsPeriodSelector({
  periods,
  selectedPeriod,
  onPeriodChange,
}: AnalyticsPeriodSelectorProps) {
  return (
    <section aria-labelledby="period-heading">
      <div className="mb-2 flex items-center justify-between">
        <h2 id="period-heading" className="text-sm font-bold text-[var(--ink)]">
          Period
        </h2>
        <span className="text-xs font-medium text-[var(--muted)]">Transaction activity</span>
      </div>
      <div className="flex gap-2 rounded-2xl bg-[#e9efdf] p-1.5" role="group" aria-label="Choose analytics period">
        {periods.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={selectedPeriod === item.id}
            onClick={() => onPeriodChange(item.id)}
            className={`flex-1 rounded-xl px-3 py-2 text-sm font-bold transition ${
              selectedPeriod === item.id
                ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm"
                : "text-[var(--forest-soft)]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}
