"use client";

import { useState } from "react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChartNoAxesCombined,
  LuChevronDown,
  LuCircleDollarSign,
  LuArrowDown,
} from "react-icons/lu";

const months = ["October 2026", "September 2026", "August 2026"];

export function TransactionSummary() {
  const [monthIndex, setMonthIndex] = useState(0);
  const [showMonths, setShowMonths] = useState(false);

  const month = months[monthIndex];

  return (
    <section className="px-5 mt-6" aria-labelledby="monthly-summary-heading">
      <div className="flex items-center justify-between">
        <div className="relative flex min-w-0 items-center">
          <button
            type="button"
            className="grid place-items-center rounded-lg text-[#6e806e] active:bg-[#e9eddf]"
            aria-label="Previous month"
            onClick={() => setMonthIndex((index) => Math.min(index + 1, months.length - 1))}
          >
            <LuChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="flex items-center px-1 tracking-tight text-sm font-bold text-[var(--ink)]"
            onClick={() => setShowMonths((open) => !open)}
            aria-expanded={showMonths}
          >
            {month}
          </button>
          <button
            type="button"
            className="grid place-items-center rounded-lg text-[#6e806e] active:bg-[#e9eddf]"
            aria-label="Next month"
            onClick={() => setMonthIndex((index) => Math.max(index - 1, 0))}
          >
            <LuChevronRight className="size-5" aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          className="tems-center text-xs font-bold text-[#315538]"
          aria-label="View transaction analysis"
        >
          {/* <LuChartNoAxesCombined className="size-3.5" aria-hidden="true" /> */}
          Analysis
        </button>
      </div>

      <div
        id="monthly-summary-heading"
        className="grid grid-cols-2 mt-3 pl-2 max-w-[60%]"
      >
        <div className="flex flex-row gap-1 items-center w-full">
          <p className="flex space-x-1 gap-0.5 text-xs font-bold leading-tight text-[#788578]">
            {/* <LuArrowDown className="size-4" aria-hidden="true" /> */}
            Paid: 
          </p>
          <p className="text-xs tracking-normal font-bold text-[var(--ink)]">
            ₦286,450
          </p>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <p className="flex space-x-1 gap-1 text-xs font-bold leading-tight text-[#788578]">
            Owed: 
          </p>
          <p className="text-xs tracking-normal font-bold ext-[var(--ink)]">
            ₦74,500
          </p>
        </div>
        {/* <div className="border-l border-[#e7eadf] pl-3">
          <p className="flex items-center gap-1 text-[9px] font-semibold text-[#788578]">
            <LuCircleDollarSign className="size-3 text-[#b2765c]" aria-hidden="true" />
            Still owed
          </p>
          <p className="mt-1.5 text-base font-extrabold tracking-tight text-[#855145]">
            ₦74,500
          </p>
        </div> */}
      </div>
    </section>
  );
}
