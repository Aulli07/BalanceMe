import { formatNaira } from "@/shared/utils/format-naira";
import type { CustomerStats } from "../types/customer-detail";
export function BalanceCard({ stats }: { stats: CustomerStats }) {
  const totalHandled = stats.paidTotalKobo + stats.owesNowKobo;
  const repaidPercent = totalHandled
    ? Math.round((stats.paidTotalKobo / totalHandled) * 100)
    : 100;
  return (
    <section
      className="mt-6 overflow-hidden rounded-2xl bg-[var(--forest)] p-5 text-white"
      aria-labelledby="balance-heading"
    >
      <div className="flex items-start justify-between">
        <div>
          <p
            id="balance-heading"
            className="text-sm font-semibold text-white/70"
          >
            Owes now
          </p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight text-[var(--lime)]">
            {formatNaira(stats.owesNowKobo)}
          </p>
        </div>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs font-semibold">
          Active balance
        </span>
      </div>
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs text-white/70">
          <span>Repayment progress</span>
          <span>{repaidPercent}% paid</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/15">
          <div
            className="h-full rounded-full bg-[var(--lime)]"
            style={{ width: `${repaidPercent}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-white/70">
          Outstanding for 14 days · {formatNaira(stats.paidTotalKobo)} repaid so
          far
        </p>
      </div>
    </section>
  );
}
