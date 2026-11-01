import { formatNaira } from "@/shared/utils/format-naira";
import type { AnalyticsCategory } from "../types/transaction-analytics";

export function CategoryBreakdown({ categories }: { categories: AnalyticsCategory[] }) {
  return (
    <section aria-labelledby="category-heading">
      <div className="mb-3 flex items-end justify-between">
        <div><h2 id="category-heading" className="text-sm font-bold text-[var(--ink)]">Category breakdown</h2><p className="mt-1 text-xs text-[var(--muted)]">Where your sales are coming from</p></div>
      </div>
      <div className="rounded-2xl bg-[var(--surface)] p-4 shadow-sm">
        {categories.length ? categories.map((category) => (
          <div key={category.name} className="mb-4 last:mb-0">
            <div className="mb-1.5 flex justify-between text-xs">
              <span className="font-bold text-[var(--ink)]">{category.name}</span>
              <span className="font-semibold text-[var(--muted)]">{formatNaira(category.valueKobo)}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#edf0e7]"><div className="h-full rounded-full bg-[var(--forest)]" style={{ width: `${category.percentage}%` }} /></div>
          </div>
        )) : <p className="text-sm text-[var(--muted)]">No category activity for this period.</p>}
      </div>
    </section>
  );
}
