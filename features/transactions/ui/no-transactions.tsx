import { LuClock3 } from "react-icons/lu";

export function NoTransactionUi() {
  return (
    <div className="flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed border-[var(--line)] bg-[var(--surface)] px-6 text-center">
      <LuClock3 className="size-7 text-[var(--muted)]" aria-hidden="true" />
      <p className="mt-3 text-sm font-bold text-[var(--ink)]">
        No transactions for this period
      </p>
      <p className="mt-1 max-w-xs text-xs leading-relaxed text-[var(--muted)]">
        Try another month or change the transaction filter.
      </p>
    </div>
  )
}