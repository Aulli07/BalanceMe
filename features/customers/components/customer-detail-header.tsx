"use client";

import { LuArrowLeft } from "react-icons/lu";


export function CustomerDetailHeader() {
  return (
    <header className="flex items-center justify-between">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]"
      >
        <LuArrowLeft className="size-4" />
        Customers
      </button>
    </header>
  );
}

