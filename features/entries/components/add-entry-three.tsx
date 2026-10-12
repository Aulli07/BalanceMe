"use client";

import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { LuCheck } from "react-icons/lu";

export function AddEntryThree({
  setStep,
}: {
  setStep: Dispatch<SetStateAction<1 | 2 | 3>>;
}) {
  const router = useRouter();

  return (
    <main className="flex min-h-[calc(100vh-3rem)] flex-col px-5 pb-6 text-[var(--ink)]">
      <section className="flex flex-1 items-center justify-center text-center">
        <div className="flex max-w-sm flex-col items-center">
          <div className="grid size-20 place-items-center rounded-full bg-[#d9e8c5] text-[var(--forest)] shadow-sm">
            <LuCheck className="size-10" strokeWidth={2.5} aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight">
            Entry added successfully
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
            Your entry has been recorded and is ready to view in your
            transactions.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="rounded-2xl border border-[#b9cda0] bg-[#e5efd9] px-4 py-3 text-sm font-extrabold text-[var(--forest)] transition-colors active:bg-[#d9e8c5]"
        >
          Add a new Entry
        </button>
        <button
          type="button"
          onClick={() => router.push("/transactions")}
          className="rounded-2xl bg-[var(--forest)] px-4 py-3 text-sm font-extrabold text-[var(--surface)] shadow-lg shadow-[var(--forest)]/15 transition-colors active:bg-[#36563f]"
        >
          Done
        </button>
      </div>
    </main>
  );
}