import { LuArrowDownRight, LuArrowUpRight, LuReceiptText, LuUsersRound } from "react-icons/lu";



export function CustomerSummary() {
  return (
    <section className="grid grid-cols-2 gap-2.5" aria-label="Customer summary for this week">
      {/* <article className="relative isolate flex h-28 min-w-0 flex-col justify-between overflow-hidden rounded-2xl bg-[var(--forest)] p-3 text-[var(--surface)] shadow-md shadow-[var(--forest)]/10 after:absolute after:-bottom-20 after:-right-8 after:-z-10 after:size-36 after:rounded-full after:border after:border-[var(--lime)]/20 after:shadow-[0_0_0_12px_rgba(203,243,106,0.04),0_0_0_27px_rgba(203,243,106,0.03)] after:content-['']">
        <div className="relative z-10">
          <p className="flex items-center gap-1 text-[10px] font-bold leading-tight text-green-100">
            <LuUsersRound className="size-3.5" aria-hidden="true" />
            Total customers
          </p>
          <strong className="mt-1 block text-3xl font-extrabold leading-none tracking-tight text-[var(--lime)]">
            128
          </strong>
        </div>
        <p className="relative z-10 flex items-center gap-1 text-[9px] font-medium text-green-100">
          <LuArrowUpRight className="size-3" aria-hidden="true" />
          Up 6 this week
        </p>
      </article> */}

      <article className="flex h-28 min-w-0 flex-col justify-between rounded-2xl border border-[#efddd5] bg-[#fff0eb] p-3 text-[var(--ink)]">
        <div>
          <p className="flex items-center gap-1 text-[10px] font-bold leading-tight text-[#8c645c]">
            <LuReceiptText className="size-3.5" aria-hidden="true" />
            Currently owing
          </p>
          <strong className="mt-1 block text-3xl font-extrabold leading-none tracking-tight text-[#70433d]">
            18
          </strong>
        </div>
        <p className="flex items-center gap-1 text-[9px] font-medium text-[#89564e]">
          <LuArrowDownRight className="size-3" aria-hidden="true" />
          Down 2 this week
        </p>
      </article>
    </section>
  );
}
