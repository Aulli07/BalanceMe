import type { FormType } from "../hooks/useEntryForm";
import { DebtEntry } from "./debt-entry";
import { RepaymentEntry } from "./repayment-entry";

export function DebtRepaymentEntry({ form }: { form: FormType }) {
  const { debtRepaymentMode, setDebtRepaymentMode } = form;

  return (
    <section className="mt-4">
      <div className="flex rounded-2xl bg-[#e1e8dd] p-1">
        <button
          type="button"
          onClick={() => setDebtRepaymentMode(0)}
          aria-pressed={debtRepaymentMode === 0}
          className={`flex min-h-10 flex-1 items-center justify-center rounded-xl px-2 py-2 text-[15px] font-bold ${
            debtRepaymentMode === 0
              ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm shadow-[var(--forest)]/20"
              : "text-[#57705f]"
          }`}
        >
          Purchase
        </button>
        <button
          type="button"
          onClick={() => setDebtRepaymentMode(1)}
          aria-pressed={debtRepaymentMode === 1}
          className={`flex min-h-10 flex-1 items-center justify-center rounded-xl px-2 py-2 text-[15px] font-bold ${
            debtRepaymentMode === 1
              ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm shadow-[var(--forest)]/20"
              : "text-[#57705f]"
          }`}
        >
          Debt repayment
        </button>
      </div>

      {debtRepaymentMode === 0 ? <DebtEntry form={form} /> : <RepaymentEntry form={form} />}
    </section>
  );
}