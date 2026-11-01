import { LuArrowDownLeft, LuChartNoAxesCombined, LuCircleDollarSign, LuReceiptText } from "react-icons/lu";
import { formatNaira } from "@/shared/utils/format-naira";
import type { AnalyticsSummary } from "../types/transaction-analytics";

const cards = [
  { key: "received", label: "Total received", icon: LuArrowDownLeft, color: "bg-[var(--forest)] text-[var(--lime)]" },
  { key: "owed", label: "Total owed", icon: LuCircleDollarSign, color: "bg-[#fff8e9] text-[#855126]" },
  { key: "rate", label: "Collection rate", icon: LuChartNoAxesCombined, color: "bg-[#e9f1df] text-[var(--forest)]" },
  { key: "count", label: "Transactions", icon: LuReceiptText, color: "bg-[var(--surface)] text-[var(--forest)]" },
] as const;

export function AnalyticsSummaryCards({ summary }: { summary: AnalyticsSummary }) {
  const values = {
    received: formatNaira(summary.totalReceivedKobo),
    owed: formatNaira(summary.totalOwedKobo),
    rate: `${summary.collectionRate}%`,
    count: String(summary.transactionCount),
  };

  return (
    <section aria-labelledby="summary-heading">
      <h2 id="summary-heading" className="mb-3 text-sm font-bold text-[var(--ink)]">
        At a glance
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {cards.map(({ key, label, icon: Icon, color }) => (
          <article key={key} className={`min-h-28 rounded-2xl p-3.5 shadow-sm ${color}`}>
            <Icon className="size-4" aria-hidden="true" />
            <p className="mt-3 text-[11px] font-semibold opacity-75">{label}</p>
            <p className="mt-1 text-xl font-extrabold tracking-tight">{values[key]}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
