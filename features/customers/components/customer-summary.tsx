import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
import { Customer } from "@/shared/types/domain";

import { getCustomerSaleTransactionCount } from "../selectors/get-customer-txn-count";



export function CustomerSummary({
  visibleCustomers
}: {
  visibleCustomers: Customer[]
}) {

  return (
    <div className="border-t border-[#e8ebdf] mt-5">
      {visibleCustomers.map((customer) => (
        <Link
          href={`/customers/${customer.id}`}
          key={customer.id}
          type="button"
          className="flex min-h-17 w-full items-center gap-2.5 border-b border-[#e8ebdf] px-0.5 py-2 text-left transition-colors active:bg-[#e8eddd]/50"
          aria-label={`Preview ${customer.name}`}
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#e2ecd7] text-sm font-extrabold text-[var(--forest)]">
            {customer.name.slice(0, 2).toUpperCase()}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[14px] font-bold leading-tight text-[#294735]">
              {customer.name}
            </span>
            <span className="mt-1 block truncate text-xs font-medium leading-tight text-[#778477]">
              {getCustomerSaleTransactionCount(customer.id)} recorded
              transactions
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-1">
            {customer.pinned && (
              <span className="inline-flex min-h-6 items-center rounded-[7px] bg-[#e2ecd7] px-1.5 text-[10px] font-bold leading-none text-[var(--forest)]">
                Pinned
              </span>
            )}
            <LuChevronRight
              className="size-5 text-[#9aa695] opacity-60"
              aria-hidden="true"
            />
          </span>
        </Link>
      ))}
    </div>
  )
}
