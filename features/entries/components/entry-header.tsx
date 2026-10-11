"use client";

import { useRouter } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";

export function EntryHeader() {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between gap-4 px-5 pt-4">
      <div className="flex min-w-0 items-center gap-2">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="grid size-8 shrink-0 place-items-center text-[var(--forest)] transition-transform active:scale-90"
        >
          <LuArrowLeft className="size-6" strokeWidth={2.2} aria-hidden="true" />
        </button>
        <div>
          <h1 className="text-xl font-extrabold leading-none tracking-tight text-[var(--ink)]">
            Add entry
          </h1>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2" aria-label="Step 1 of 2">
        <span className="h-2 w-10 rounded-full bg-[var(--forest)]" />
        <span className="h-2 w-7 rounded-full bg-[#dfe6d9]" />
      </div>
    </header>
  );
}
