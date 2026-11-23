import { useState } from "react";
import type { FormType } from "../hooks/useEntryForm";
import { DebtEntry } from "./debt-entry";
import { RepaymentEntry } from "./repayment-entry";

export function DebtRepaymentEntry({ form }: { form: FormType }) {
  const [mode, setMode] = useState<0 | 1>(0);

  return (
    <section className="mt-4">
      <div className="flex rounded-2xl bg-[#e1e8dd] p-1">
        <button
          type="button"
          onClick={() => setMode(0)}
          aria-pressed={mode === 0}
          className={`flex min-h-10 flex-1 items-center justify-center rounded-xl px-2 py-2 text-[15px] font-bold ${
            mode === 0
              ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm shadow-[var(--forest)]/20"
              : "text-[#57705f]"
          }`}
        >
          Purchase
        </button>
        <button
          type="button"
          onClick={() => setMode(1)}
          aria-pressed={mode === 1}
          className={`flex min-h-10 flex-1 items-center justify-center rounded-xl px-2 py-2 text-[15px] font-bold ${
            mode === 1
              ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm shadow-[var(--forest)]/20"
              : "text-[#57705f]"
          }`}
        >
          Debt repayment
        </button>
      </div>

      {mode === 0 ? <DebtEntry form={form} /> : <RepaymentEntry form={form} />}
    </section>
  );
}