import { LuArrowUpDown, LuChevronRight } from "react-icons/lu";
import { customers } from "@/features/customers/data/customers";



export function CustomerList() {
  return (
    <section aria-label="Customer list">
      <div className="mb-1.5 mt-5 flex items-baseline justify-between gap-2">
        <h2 className="text-lg font-bold tracking-tight text-[#244431]">
          Your customers
        </h2>
        <span className="text-xs font-semibold text-[#899486]">
          <LuArrowUpDown className="size-4 inline-block" aria-hidden="true" /> Sort
        </span>
      </div>

      <div className="border-t border-[#e8ebdf]">
        {customers.map((customer) => (
          <button
            key={customer.name}
            type="button"
            className="flex min-h-17 w-full items-center gap-2.5 border-b border-[#e8ebdf] px-0.5 py-2 text-left transition-colors active:bg-[#e8eddd]/50"
            aria-label={`Preview ${customer.name}${customer.owing ? `, owes ${customer.owing}` : ", fully settled"}`}
          >
            <span className={`grid size-12 shrink-0 place-items-center rounded-xl text-sm font-extrabold ${customer.avatarColor}`}>
              {customer.initials}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-bold leading-tight text-[#294735]">
                {customer.name}
              </span>
              <span className="mt-1 block truncate text-xs font-medium leading-tight text-[#778477]">
                {customer.transactions} recorded transactions
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-1">
              {customer.owing && (
                <span className="inline-flex min-h-6 items-center rounded-[7px] bg-[#f5e4df] px-1.5 text-[10px] font-bold leading-none text-[#895046]">
                  Owes {customer.owing}
                </span>
              )}
              <LuChevronRight className="size-5 text-[#9aa695] opacity-60" aria-hidden="true" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
