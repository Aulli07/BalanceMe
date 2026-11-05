import { formatNaira } from "@/shared/utils/format-naira";
import type { AnalyticsCustomer } from "../types/transaction-analytics";

function RankingList({ customers, tone }: { customers: AnalyticsCustomer[]; tone: "forest" | "gold" }) {
  if (!customers.length) return <p className="text-sm text-[var(--muted)]">No activity for this period.</p>;
  return (
    <ol className="space-y-3">
      {customers.map((customer, index) => (
        <li key={customer.customerId} className="flex items-center gap-2.5">
          <span className={`grid size-6 shrink-0 place-items-center rounded-full text-[10px] font-extrabold ${tone === "forest" ? "bg-[#e9f1df] text-[var(--forest)]" : "bg-[#fff1d8] text-[#855126]"}`}>{index + 1}</span>
          <span className="min-w-0 flex-1 truncate text-xs font-bold text-[var(--ink)]">{customer.name}</span>
          <span className="text-xs font-extrabold text-[var(--forest)]">{formatNaira(customer.value)}</span>
        </li>
      ))}
    </ol>
  );
}

export function CustomerRankings({ topCustomers, topOwers }: { topCustomers: AnalyticsCustomer[]; topOwers: AnalyticsCustomer[] }) {
  return (
    <section aria-labelledby="customers-heading">
      <h2 id="customers-heading" className="mb-3 text-sm font-bold text-[var(--ink)]">People to know</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        <article className="rounded-2xl bg-[var(--surface)] p-4 shadow-sm">
          <h3 className="mb-4 text-xs font-bold text-[var(--forest)]">Top customers</h3>
          <RankingList customers={topCustomers} tone="forest" />
        </article>
        <article className="rounded-2xl bg-[var(--surface)] p-4 shadow-sm">
          <h3 className="mb-4 text-xs font-bold text-[#a66e24]">Top owing</h3>
          <RankingList customers={topOwers} tone="gold" />
        </article>
      </div>
    </section>
  );
}
