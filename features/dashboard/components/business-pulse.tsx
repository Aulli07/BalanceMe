"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  LuActivity,
  LuArrowUpRight,
  LuChevronLeft,
  LuChevronRight,
  LuFlame,
  LuTrendingDown,
  LuTrendingUp,
} from "react-icons/lu";

import { pulseData } from "@/features/dashboard/data/pulse-data";
import { getPulseDisplayData } from "@/features/dashboard/engine/pulse-data-engine";
import { pulseIcons } from "../data/pulse-icon-style";
// import { slideShow } from "../utils/slideshow";




export function BusinessPulse({ businessId }: { businessId: string }) {
  const data = getPulseDisplayData(pulseData, businessId);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data || data.length === 0) return null;

  const currentIndex = activeIndex >= data.length ? 0 : activeIndex;
  const activePulse = data[currentIndex];
  if (!activePulse) return null;

  const Icon = pulseIcons[activePulse.icon];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const isDeclining =
    activePulse.trend?.startsWith("-") || activePulse.tone === "danger";

  return (
    <section className="mt-2" aria-label="Business pulse">
      {/* Section Header */}
      <div className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="flex items-center gap-1.5 text-base font-extrabold uppercase tracking-wide text-[var(--forest)]">
            <LuActivity className="size-5 text-[var(--forest)]" aria-hidden="true" />
            Business pulse
          </h2>
        </div>

        {/* Navigation arrows & page count */}
        {data.length > 1 && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous insight"
              className="grid size-6 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--forest)] transition hover:bg-[var(--line)] active:scale-95"
            >
              <LuChevronLeft className="size-3.5" aria-hidden="true" />
            </button>
            <span className="px-1 text-[13px] font-bold text-[var(--muted)]">
              {currentIndex + 1} / {data.length}
            </span>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next insight"
              className="grid size-6 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--forest)] transition hover:bg-[var(--line)] active:scale-95"
            >
              <LuChevronRight className="size-3.5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* Pulse Card Container with Interactive Hover Pause */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.article
            key={activePulse.id}
            initial={{ opacity: 0, y: 6, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className={`relative overflow-hidden rounded-3xl border ${activePulse.borderColor} bg-gradient-to-br ${activePulse.cardGradient} p-5 text-[var(--ink)] shadow-sm shadow-[var(--forest)]/5 transition-all duration-300 hover:shadow-md`}
            aria-live="polite"
          >
            {/* Ambient Watermark Icon */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-7 -right-5 select-none opacity-[0.06]"
            >
              <Icon className="size-36 text-[var(--forest)]" />
            </div>

            {/* Top Row: Tags + Icon Box */}
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${activePulse.badgeBg}`}
                >
                  {activePulse.tagLabel}
                </span>

                {activePulse.priority === "high" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-800 border border-red-200">
                    <LuFlame className="size-3 text-red-600" aria-hidden="true" />
                    Priority
                  </span>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 mt-3.5">
              <h3 className="text-base font-extrabold leading-snug tracking-tight text-[var(--ink)] sm:text-base">
                {activePulse.title}
              </h3>
              {/* <p className="mt-1 text-xs font-medium leading-relaxed text-[var(--muted)]">
                {activePulse.detail}
              </p> */}
            </div>

            {/* Bottom Section: Metric + Action CTA */}
            <div className="relative z-10 mt-2 flex items-end justify-between gap-3 border-t border-[var(--line)]/70 pt-3.5">
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">
                  {activePulse.metricLabel ?? activePulse.metricTag ?? "Metric"}
                </span>
                <p
                  className={`mt-0.5 text-2xl font-black tracking-tight sm:text-3xl ${activePulse.elementColor}`}
                >
                  {activePulse.amount}
                </p>

                {activePulse.trend && (
                  <span
                    className={`mt-1 inline-flex items-center gap-1 text-[11px] font-bold ${
                      isDeclining ? "text-amber-800" : "text-[var(--forest)]"
                    }`}
                  >
                    {isDeclining ? (
                      <LuTrendingDown className="size-3.5" aria-hidden="true" />
                    ) : (
                      <LuTrendingUp className="size-3.5" aria-hidden="true" />
                    )}
                    {activePulse.trend}
                  </span>
                )}
              </div>

              {/* Action Button */}
              {activePulse.actionHref && (
                <Link
                  href={activePulse.actionHref}
                  className="inline-flex h-8 items-center gap-1.5 rounded-xl bg-[var(--forest)] px-3 text-xs font-bold text-[var(--lime)] shadow-sm transition hover:bg-[var(--forest-dark)] hover:shadow active:scale-95"
                >
                  <span>{activePulse.actionLabel ?? "View"}</span>
                  <LuArrowUpRight className="size-3.5" aria-hidden="true" />
                </Link>
              )}
            </div>
          </motion.article>
        </AnimatePresence>

        {/* Elegant Animated Pill Indicators */}
        {data.length > 1 && (
          <div
            className="mt-3 flex items-center justify-center gap-1.5"
            aria-label={`Insight ${currentIndex + 1} of ${data.length}`}
          >
            {data.map((pulse, index) => (
              <button
                key={pulse.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Show insight ${index + 1}: ${pulse.title}`}
                aria-current={index === currentIndex ? "true" : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-6 bg-[var(--forest)]"
                    : "w-1.5 bg-[#ccd8c0] hover:bg-[var(--forest-soft)]"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
