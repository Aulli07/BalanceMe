import { Dispatch, SetStateAction } from "react";
import { LuArrowRight } from "react-icons/lu";

export function EntryContinue({
  setStep, canContinue
}: {
  setStep?: Dispatch<SetStateAction<1|2|3>>, 
  canContinue: boolean
}) {
  return (
    <button
      type="button"
      onClick={() => setStep?.(2)}
      disabled={!canContinue}
      className="mt-auto flex w-full items-center justify-center gap-1 rounded-2xl bg-[var(--forest)] px-5 py-3 text-[16px] font-bold text-[var(--surface)] shadow-lg shadow-[var(--forest)]/15 transition-all hover:bg-[var(--forest-dark)] active:scale-[.98] disabled:cursor-not-allowed disabled:bg-[var(--forest)]/80 disabled:text-[var(--surface)]/90 disabled:shadow-none"
    >
      Continue
      <LuArrowRight className="size-5" aria-hidden="true" />
    </button>
  )
}