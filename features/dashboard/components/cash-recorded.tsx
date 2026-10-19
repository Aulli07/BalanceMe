"use client";

import { useState } from "react";
import {
  LuCalendarDays,
  LuChevronDown,
  LuTrendingUp,
} from "react-icons/lu";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/current-context";
import {
  type CashRecordedPeriod,
  getCashRecordedAmount,
} from "@/features/dashboard/selectors/get-cash-recorded";
import { getTrend } from "../selectors/get-trend";
import { periodOptions } from "../data/period-options";



export function CashRecorded() {
  const [value, setValue] = useState<CashRecordedPeriod>("today");
  const [isPeriodMenuOpen, setIsPeriodMenuOpen] = useState(false);

  const selectedPeriod = periodOptions.find((option) => option.value === value);

  return (
    <article className="relative overflow-hidden rounded-3xl bg-[var(--forest)] p-5 text-[var(--surface)] shadow-lg shadow-[var(--forest)]/10">
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-56 -right-30 h-85 w-80 rounded-full  bg-white/5" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -right-20 h-65 w-60 rounded-full bg-[var(--forest)] transparent" />

      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-1.5 text-xs font-bold">
          <LuCalendarDays className="size-3.5" aria-hidden="true" />
          Cash recorded
        </h2>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsPeriodMenuOpen((isOpen) => !isOpen)}
            aria-expanded={isPeriodMenuOpen}
            aria-controls="cash-recording-period-menu"
            className="flex items-center gap-1 rounded-full bg-[var(--forest)] px-2 py-1 text-xs font-bold text-[var(--surface)]"
          >
            {selectedPeriod?.label}
            <LuChevronDown
              className={`size-3 transition-transform ${isPeriodMenuOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>

          {isPeriodMenuOpen && (
            <div
              id="cash-recording-period-menu"
              className="absolute right-0 top-full z-30 mt-1 min-w-30 rounded-lg bg-[var(--surface)] p-1 text-[var(--ink)] shadow-lg"
            >
              {periodOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setValue(option.value as CashRecordedPeriod);
                    setIsPeriodMenuOpen(false);
                  }}
                  className="block w-full rounded-md px-2 py-1.5 text-left text-xs font-semibold hover:bg-[var(--paper)]"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="mt-5 text-4xl font-bold tracking-tight text-[var(--lime)]">
        {getCashRecordedAmount(ACTIVE_BUSINESS_ID, value)}
      </p>
      <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-green-100">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-1 text-[var(--lime)]">
          <LuTrendingUp className="size-3.5" aria-hidden="true" />
          {getTrend(ACTIVE_BUSINESS_ID, "today", "yesterday")}
        </span>
      </div>
    </article>
  );
}
