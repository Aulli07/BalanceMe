import { LuChartNoAxesCombined, LuDownload } from "react-icons/lu";
import Link from "next/link";




export function TransactionHeader({ onDownload }: { onDownload: () => void }) {
  return (
    <section aria-labelledby="transactions-heading" className="px-5 pt-5">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h1
            id="transactions-heading"
            className="mt-1 text-2xl font-bold tracking-tight text-[var(--ink)]"
          >
            Transactions
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/transactions/analytics"
            className="grid size-9 place-items-center text-[var(--forest)]"
            aria-label="View transaction insights"
          >
            <LuChartNoAxesCombined className="size-5" aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="grid size-9 place-items-center text-[var(--forest)]"
            aria-label="Download transaction data"
            onClick={onDownload}
          >
            <LuDownload className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
