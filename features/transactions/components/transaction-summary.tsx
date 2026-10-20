"use client";

import { useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const filters = ["All", "Paid", "Owed"];

type TransactionSummaryProps = {
  month: string;
  monthIndex: number;
  monthCount: number;
  onMonthChange: React.Dispatch<React.SetStateAction<number>>;
};

export function TransactionSummary({
  month,
  monthIndex,
  monthCount,
  onMonthChange,
}: TransactionSummaryProps) {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section className="mt-4 px-5" aria-labelledby="monthly-summary-heading">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center rounded-full border border-[var(--line)] bg-[var(--surface)] px-1 py-1 shadow-sm shadow-[var(--forest)]/5">
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full text-[var(--forest)] active:bg-[var(--paper)]"
            aria-label="Previous month"
            disabled={monthIndex === monthCount - 1}
            onClick={() =>
              onMonthChange((index) => Math.min(index + 1, monthCount - 1))
            }
          >
            <LuChevronLeft className="size-4" aria-hidden="true" />
          </button>
          <p
            id="monthly-summary-heading"
            className="min-w-30 text-center text-sm font-bold text-[var(--ink)]"
          >
            {month}
          </p>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-full text-[var(--forest)] active:bg-[var(--paper)]"
            aria-label="Next month"
            disabled={monthIndex === 0}
            onClick={() => onMonthChange((index) => Math.max(index - 1, 0))}
          >
            <LuChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          className="text-sm font-bold text-[var(--forest-soft)]"
          aria-label="View transaction analysis"
        >
          Analysis
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <article className="rounded-3xl border border-[#cce2d2] bg-[#e4f1e8] p-4">
          <p className="text-sm font-semibold text-[#377052]">Paid</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-[var(--forest)]">
            ₦286,450
          </p>
        </article>
        <article className="rounded-3xl border border-[#f1dfbd] bg-[#fff0d5] p-4">
          <p className="text-sm font-semibold text-[#8a631d]">Owed</p>
          <p className="mt-2 text-2xl font-extrabold tracking-tight text-[#714e15]">
            ₦74,500
          </p>
        </article>
      </div>

      <div
        className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1"
        role="group"
        aria-label="Filter transactions"
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter;

          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              aria-pressed={isActive}
              className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold transition-colors ${
                isActive
                  ? "bg-[var(--forest)] text-[var(--surface)]"
                  : "border border-[var(--line)] bg-[var(--surface)] text-[var(--muted)]"
              }`}
            >
              {filter}
            </button>
          );
        })}
      </div>
    </section>
  );
}
