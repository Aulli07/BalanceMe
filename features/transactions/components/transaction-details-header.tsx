"use client";

import { LuArrowLeft } from "react-icons/lu";


export function TransactionDetailsHeader() {
  return (
    <header className="flex items-center gap-3 px-5 pt-5">
      <button
        onClick={() => window.history.back()}
        className="grid place-items-center rounded-full text-[var(--forest)]"
      >
        <LuArrowLeft className="size-5" />
      </button>
      <h1 className="text-xl font-bold tracking-tight text-[var(--ink)]">
        Transaction details
      </h1>
    </header>
  );
}
