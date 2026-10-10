import { LuArrowUpRight, LuChartNoAxesColumnIncreasing, LuDownload, LuReceiptText } from "react-icons/lu";

export function TransactionHeader() {
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
          <button
            type="button"
            className="grid size-9 place-items-center text-[var(--forest)]"
            aria-label="View transaction insights"
          >
            <LuChartNoAxesColumnIncreasing className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="grid size-9 place-items-center text-[var(--forest)]"
            aria-label="Download transaction data"
          >
            <LuDownload className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <article className="relative isolate h-28 min-w-0 overflow-hidden rounded-2xl bg-[var(--forest)] p-3 text-[var(--surface)] shadow-md shadow-[var(--forest)]/10 after:absolute after:-bottom-20 after:-right-8 after:-z-10 after:size-36 after:rounded-full after:border after:border-[var(--lime)]/20 after:shadow-[0_0_0_12px_rgba(203,243,106,0.04),0_0_0_27px_rgba(203,243,106,0.03)] after:content-['']">
          <div className="relative z-10 flex h-full flex-col justify-between">
            <p className="flex items-center gap-1 text-xs font-bold leading-tight text-green-100">
              {/* <LuReceiptText className="size-3.5" /> */}
              All time
            </p>
            <div>
              <p className="text-2xl font-extrabold leading-none tracking-tight text-[var(--lime)]">
                38 txns
              </p>
              <p className="mt-1 text-[10px] font-medium text-green-100">
                +8 from last week
              </p>
            </div>
          </div>
        </article>

        <article className="h-28 min-w-0 rounded-2xl border border-[#dfe8ce] bg-[#eef4df] p-3 text-[var(--ink)]">
          <div className="flex h-full flex-col justify-between">
            <p className="text-xs font-bold leading-tight text-[var(--muted)]">
              Total recorded
            </p>
            <div>
              <p className="whitespace-nowrap text-2xl font-extrabold leading-none tracking-tight text-[var(--forest)]">
                ₦1.48m
              </p>
              <p className="mt-1 text-[10px] font-semibold text-[#568044]">
                +12.4% this week
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
