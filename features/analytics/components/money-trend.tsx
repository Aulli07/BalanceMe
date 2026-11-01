import { formatNaira } from "@/shared/utils/format-naira";
import type { TrendPoint } from "../types/transaction-analytics";

function getPoints(points: TrendPoint[], key: "receivedKobo" | "owedKobo") {
  const max = Math.max(...points.map((point) => point[key]), 1);
  return points.map((point, index) => {
    const x = points.length === 1 ? 50 : (index / (points.length - 1)) * 100;
    const y = 98 - (point[key] / max) * 80;
    return `${x},${y}`;
  }).join(" ");
}

export function MoneyTrend({ points }: { points: TrendPoint[] }) {
  const received = points.reduce((total, point) => total + point.receivedKobo, 0);
  const owed = points.reduce((total, point) => total + point.owedKobo, 0);

  return (
    <section aria-labelledby="trend-heading" className="rounded-2xl bg-[var(--surface)] p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 id="trend-heading" className="text-sm font-bold text-[var(--ink)]">Money flow</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">Received vs credit given</p>
        </div>
        <div className="flex gap-3 text-[10px] font-bold text-[var(--muted)]">
          <span className="flex items-center gap-1"><i className="size-2 rounded-full bg-[var(--forest)]" />In</span>
          <span className="flex items-center gap-1"><i className="size-2 rounded-full bg-[#e8ae53]" />Credit</span>
        </div>
      </div>
      <div className="mt-4 h-32">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible" role="img" aria-label="Money received and credit given trend">
          <path d="M 0 98 H 100" stroke="var(--line)" strokeWidth="0.8" vectorEffect="non-scaling-stroke" />
          <polyline points={getPoints(points, "receivedKobo")} fill="none" stroke="var(--forest)" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points={getPoints(points, "owedKobo")} fill="none" stroke="#e8ae53" strokeWidth="2.5" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-[10px] font-medium text-[var(--muted)]">
        <span>{points[0]?.label}</span>
        <span>{points.at(-1)?.label}</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--line)] pt-3">
        <div><p className="text-[10px] font-semibold text-[var(--muted)]">Money in</p><p className="mt-0.5 text-sm font-extrabold text-[var(--forest)]">{formatNaira(received)}</p></div>
        <div><p className="text-[10px] font-semibold text-[var(--muted)]">Credit given</p><p className="mt-0.5 text-sm font-extrabold text-[#a66e24]">{formatNaira(owed)}</p></div>
      </div>
    </section>
  );
}
