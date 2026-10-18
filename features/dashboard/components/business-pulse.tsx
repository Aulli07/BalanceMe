"use client";

import { useState } from "react";

import { pulseData } from "@/features/dashboard/data/pulse-data";
import { getPulseDisplayData } from "@/features/dashboard/engine/pulse-data-engine";
import { pulseIcons } from "../data/pulse-icon-style";

import { ACTIVE_BUSINESS_ID } from "@/shared/data/current-context";
import { slideShow } from "../utils/slideshow";





export function BusinessPulse() {
  const data = getPulseDisplayData(pulseData, ACTIVE_BUSINESS_ID);
  const [activeIndex, setActiveIndex] = useState(0);
  const activePulse = data[activeIndex];

  slideShow(data, setActiveIndex);

  if (!activePulse) return null
  const Icon = pulseIcons[activePulse.icon];

  return (
    <section className="mt-4" aria-label="Business pulse">
      <h2 className="mb-1.5 flex items-center gap-1.5 text-lg font-bold text-[var(--ink)]">
        Business pulse
      </h2>

      <article
        className={`relative min-h-40 flex justify-between overflow-hidden rounded-xl border ${activePulse.borderColor} px-4 py-4 shadow-sm shadow-[var(--forest)]/5 transition-colors duration-500 bg-[var(--surface)]`}
        aria-live="polite"
      >
        {/* <div className="pointer-events-none absolute -bottom-20 -right-8 -z-10 size-44 rounded-full border border-white/60" />
        <div className="pointer-events-none absolute -bottom-10 right-5 -z-10 size-24 rounded-full border border-white/50" /> */}

        <div className="relative z-20">
          <div className="flex items-center gap-2">
            <span
              className={`grid size-7 place-items-center rounded-full bg-white/70 ${activePulse.elementColor}`}
            >
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <div className="leading-tight">
              <h3 className="text-sm font-bold">{activePulse.title}</h3>
            </div>
          </div>

          <p className="mt-4 text-md text-[var(--muted)] tracking-tight">
            {activePulse.detail}
          </p>
          <p
            className={`mt-0.5 whitespace-nowrap text-[1.65rem] font-extrabold leading-none tracking-tight ${activePulse.elementColor}`}
          >
            {activePulse.amount}
          </p>
          {activePulse.trend && (
            <p
              className={`relative z-20 mt-2 bg-transparent text-[9px] font-semibold ${activePulse.elementColor}`}
            >
              {activePulse.trend}
            </p>
          )}
        </div>

        <Icon
          className={`pointer-events-none absolute right-5 top-1/2 z-0 size-20 -translate-y-1/2 opacity-60 ${activePulse.elementColor}`}
          aria-hidden="true"
        />

        <div
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1"
          aria-label={`Insight ${activeIndex + 1} of ${data.length}`}
        >
          {data.map((pulse, index) => (
            <button
              key={pulse.title}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show insight ${index + 1}: ${pulse.title}`}
              aria-current={index === activeIndex ? "true" : undefined}
              className={`size-1.5 rounded-full transition-colors ${index === activeIndex ? "bg-[var(--forest)]" : "bg-[#b9c99c]"}`}
            />
          ))}
        </div>
      </article>
    </section>
  );
}
