import { useState } from "react";
import { LuChevronDown } from "react-icons/lu";
import type {
  AnalyticsPeriod,
  AnalyticsSelection,
} from "../data/analytics-periods";
import type { TransactionMonth } from "@/features/transactions/data/txn-stuff";

type AnalyticsPeriodSelectorProps = {
  periods: readonly { id: AnalyticsPeriod; label: string }[];
  selectedPeriod: AnalyticsSelection;
  onPeriodChange: (period: AnalyticsSelection) => void;
  months: readonly TransactionMonth[];
};

export function AnalyticsPeriodSelector({
  periods,
  selectedPeriod,
  onPeriodChange,
  months,
}: AnalyticsPeriodSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedLabel =
    periods.find((item) => item.id === selectedPeriod)?.label ??
    selectedPeriod;

  function selectPeriod(period: AnalyticsSelection) {
    onPeriodChange(period);
    setIsOpen(false);
  }

  return (
    <section className="relative" aria-label="Analytics date selectors">
      <div className="flex items-center gap-2">
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="analytics-date-menu"
            className={`flex items-center gap-1 rounded-full border px-4 py-2 text-sm font-bold transition ${
              selectedPeriod
                ? "border-[var(--forest)] bg-[var(--forest)] text-[var(--surface)] shadow-sm"
                : "border-[var(--line)] bg-[var(--surface)] text-[var(--forest-soft)]"
            }`}
          >
            {selectedLabel}
            <LuChevronDown
              className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>

          {isOpen && (
            <div
              id="analytics-date-menu"
              className="fixed left-1/2 top-28 z-30 grid w-[min(21rem,calc(100vw-2.5rem))] -translate-x-1/2 grid-cols-4 gap-1.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-lg"
              role="group"
              aria-label="Choose analytics period or month"
            >
              <p className="col-span-4 px-1 pb-1 text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">
                Day period
              </p>
              {periods.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectPeriod(item.id)}
                  className={`rounded-xl px-2 py-2 text-xs font-bold transition ${
                    selectedPeriod === item.id
                      ? "bg-[var(--forest)] text-[var(--surface)]"
                      : "text-[var(--forest-soft)] hover:bg-[var(--paper)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="col-span-4 my-1 h-px bg-[var(--line)]" aria-hidden="true" />
              <p className="col-span-4 px-1 pb-1 text-[10px] font-bold uppercase tracking-wide text-[var(--muted)]">
                Month
              </p>
              {months.map((month) => (
                <button
                  key={month}
                  type="button"
                  aria-pressed={selectedPeriod === month}
                  onClick={() => selectPeriod(month)}
                  className={`rounded-xl px-2 py-2 text-xs font-bold transition ${
                    selectedPeriod === month
                      ? "bg-[var(--forest)] text-[var(--surface)]"
                      : "text-[var(--muted)] hover:bg-[var(--paper)]"
                  }`}
                >
                  {month}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
