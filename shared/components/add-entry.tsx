import { Dispatch, SetStateAction, useEffect } from "react";
import { createPortal } from "react-dom";
import { LiaMicrophoneSolid } from "react-icons/lia";
import { LuX } from "react-icons/lu";

export function AddEntry( {setOpen} : {setOpen: Dispatch<SetStateAction<boolean>>}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    }
  }, [setOpen])

  return createPortal (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40" onClick={() => setOpen(false)}>
      <div className="w-full rounded-t-[2rem] bg-[var(--surface)] px-5 pb-7 pt-3 text-[var(--ink)]">
        <div className="mx-auto mb-7 h-1.5 w-16 rounded-full bg-[#dce4d5]" />

        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight">Add an entry</h2>
          <button
            type="button"
            aria-label="Close add entry"
            className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f0f3eb] text-3xl font-light text-[#56705d]"
          >
            <LuX className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-4 grid gap-3">
          <button
            type="button"
            className="flex min-h-[80px] items-center gap-4 rounded-3xl border border-[#e1e7dc] bg-[#fffef9] px-4 text-left shadow-sm"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#edf3df] text-3xl text-[var(--forest)]">
              <LiaMicrophoneSolid className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-bold">Written entry</span>
              <span className="mt-0.5 block text-xs leading-tight text-[var(--muted)]">
                Type income, purchases or customer credit
              </span>
            </span>
            <span className="text-3xl font-light text-[#789078]" aria-hidden="true">→</span>
          </button>

          <button
            type="button"
            className="flex min-h-[80px] items-center gap-4 rounded-3xl border border-[#e1e7dc] bg-[#fffef9] px-4 text-left shadow-sm"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f0f5df] text-3xl text-[var(--forest)]">
              ♫
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-bold">Voice entry</span>
              <span className="mt-0.5 block text-xs leading-tight text-[var(--muted)]">
                Speak a note, then review the transcript
              </span>
            </span>
            <span className="text-3xl font-light text-[#789078]" aria-hidden="true">→</span>
          </button>

          <button
            type="button"
            className="flex min-h-[104px] items-center gap-4 rounded-3xl border border-[#e1e7dc] bg-[#fffef9] px-4 text-left shadow-sm"
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#e8f2e8] text-3xl text-[#52765c]">
              ▧
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-bold">Screenshot entry</span>
              <span className="mt-2 block text-sm leading-tight text-[var(--muted)]">
                Scan a transfer receipt into your records
              </span>
            </span>
            <span className="text-3xl font-light text-[#789078]" aria-hidden="true">→</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}