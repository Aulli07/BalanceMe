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



export function CashRecorded() {
  const [value, setValue] = useState<CashRecordedPeriod>("today");

  const periodOptions = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last-7-days", label: "Last 7 days" },
    { value: "last-30-days", label: "Last 30 days" },
  ];

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
          <select 
            id="cash-recording-period" 
            name="cash-recording-period" 
            className="rounded-full bg-[var(--forest)] px-2 py-1 text-xs font-bold text-[var(--surface)]" 
            onChange={(e) => setValue(e.target.value as CashRecordedPeriod)}
            value={value}
          >
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <LuChevronDown 
            className="pointer-events-none absolute right-2 top-1/2 size-3 -translate-y-1/2 text-[var(--surface)]" 
            aria-hidden="true" 
          />
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
