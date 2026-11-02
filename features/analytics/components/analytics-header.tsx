import { LuArrowLeft, LuDownload } from "react-icons/lu";
import Link from "next/link";

export function AnalyticsHeader({ onExport }: { onExport: () => void }) {
  return (
    <header className="flex items-center justify-between px-5 pt-5 pb-2">
      <div className="flex items-center gap-3">
        <Link
          href="/transactions"
          aria-label="Back to transactions"
          className="grid size-9 place-items-center rounded-full border border-[var(--line)] bg-[var(--surface)] text-[var(--forest)]"
        >
          <LuArrowLeft className="size-4" aria-hidden="true" />
        </Link>
        <h1 className="text-xl font-extrabold tracking-tight text-[var(--ink)]">
          Analytics
        </h1>
      </div>
      <button
        type="button"
        onClick={onExport}
        className="flex items-center gap-1.5 rounded-full bg-[var(--forest)] px-3.5 py-2 text-xs font-bold text-[var(--surface)] shadow-sm shadow-[var(--forest)]/15"
      >
        <LuDownload className="size-3.5" aria-hidden="true" />
        Export
      </button>
    </header>
  );
}
