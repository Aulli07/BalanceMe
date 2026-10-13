import {
  LuCalendarDays,
  LuChevronDown,
  LuTrendingUp,
} from "react-icons/lu";



export function CashRecorded() {
  return (
    <article className="relative overflow-hidden rounded-3xl bg-[var(--forest)] p-5 text-[var(--surface)] shadow-lg shadow-[var(--forest)]/10">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-56 -right-30 h-85 w-80 rounded-full  bg-white/5" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-20 h-65 w-60 rounded-full bg-[var(--forest)] transparent" />

      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-xs font-bold">
          <LuCalendarDays className="size-3.5" aria-hidden="true" />
          Cash recorded
        </h2>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-bold text-lime-100"
          aria-label="Change cash recording period"
        >
          Today
          <LuChevronDown className="size-3" aria-hidden="true" />
        </button>
      </div>
      <p className="mt-5 text-4xl font-bold tracking-tight text-[var(--lime)]">
        ₦286,450
      </p>
      <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-green-100">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[var(--lime)]">
          <LuTrendingUp className="size-3.5" aria-hidden="true" />
          2.4% up yesterday
        </span>
      </div>
    </article>
  );
}