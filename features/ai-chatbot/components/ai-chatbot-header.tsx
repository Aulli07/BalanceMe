"use client";

import { useRouter } from "next/navigation";
import { LuArrowLeft, LuSparkles } from "react-icons/lu";

export function AiChatbotHeader() {
  const router = useRouter();

  return (
    <header className="flex h-17 items-center justify-between border-b border-[var(--line)] bg-[var(--paper)] px-5">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={() => router.push("/")}
          aria-label="Go back"
          className="grid size-8 shrink-0 place-items-center rounded-full text-[var(--forest-soft)] transition-transform active:scale-90"
        >
          <LuArrowLeft className="size-5" strokeWidth={2} aria-hidden="true" />
        </button>

        <h1 className="truncate text-xl font-extrabold tracking-tight text-[var(--forest-dark)]">
          BallyAI
        </h1>
      </div>

      <button
        type="button"
        aria-label="AI chat options"
        className="grid size-10 shrink-0 place-items-center rounded-full bg-[#eaf1de] text-[var(--forest)] transition-transform active:scale-95"
      >
        <LuSparkles className="size-5" strokeWidth={1.9} aria-hidden="true" />
      </button>
    </header>
  );
}
