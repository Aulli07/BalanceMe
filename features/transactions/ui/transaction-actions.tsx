import { LuDownload, LuShare2 } from "react-icons/lu";

export function TransactionActions() {
  return (
    <div className="mt-auto ">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-2 rounded-2xl border border-[var(--forest)] text-sm font-bold text-[var(--forest)] transition-colors hover:bg-[var(--forest)] hover:text-white"
        >
          <LuDownload className="size-4" />
          Download
        </button>
        <button
          type="button"
          className="flex h-10 items-center justify-center gap-2 rounded-2xl bg-[var(--forest)] text-sm font-bold text-white transition-colors hover:bg-[var(--forest-dark)]"
        >
          <LuShare2 className="size-4" />
          Share
        </button>
      </div>
    </div>
  );
}
