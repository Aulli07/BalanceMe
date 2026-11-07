import Image from "next/image";
import Link from "next/link";
import { LuPin } from "react-icons/lu";
import { Customer } from "@/shared/types/domain";

import { getCustomerDebtSummaries } from "@/features/dashboard/selectors/get-customers-owing";
import { getOwingAgeLabel } from "@/features/dashboard/utils/get-dash-utils";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";
import { getInitialsOfName } from "@/shared/utils/get-initials";



export function CustomerSummary({
  visibleCustomers
}: {
  visibleCustomers: Customer[]
}) {
  const debtSummaries = getCustomerDebtSummaries(ACTIVE_BUSINESS_ID);

  return (
    <div className="mt-5 grid gap-3">
      {visibleCustomers.map((customer) => {
        const summary = debtSummaries.find(
          (item) => item.customer.id === customer.id,
        );

        return (
          <Link
            href={`/customers/${customer.id}`}
            key={customer.id}
            className="flex w-full items-center gap-3 border-b border-[#cbd6c3] px-0.5 py-3 text-left transition-colors active:bg-[#e8eddd]/50"
            aria-label={`View ${customer.name}`}
          >
            {/* <span className="flex min-w-0 items-center gap-3"> */}
              {customer.avatarUrl ? (
                <Image
                  src={customer.avatarUrl}
                  alt=""
                  width={52}
                  height={52}
                  className="size-13 shrink-0 rounded-full object-cover"
                />
              ) : (
                <span className="grid size-13 shrink-0 place-items-center rounded-full bg-[#e2ecd7] text-base font-extrabold text-[var(--forest)]">
                  {getInitialsOfName(customer.name)}
                </span>
              )}
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 truncate text-base font-extrabold text-[var(--ink)]">
                  <span className="truncate">{customer.name}</span>
                  {customer.pinned && (
                    <LuPin
                      className="size-4 shrink-0 text-[var(--forest)]"
                      aria-label="Pinned customer"
                    />
                  )}
                </span>
              </span>
              <span className="shrink-0 rounded-lg bg-[#e2ecd7] px-2.5 py-1 text-right text-xs font-medium text-[var(--forest)]">
                {summary
                  ? getOwingAgeLabel(summary.oldestOutstandingAt)
                  : "Settled"}
              </span>
            {/* </span> */}
          </Link>
        );
      })}
    </div>
  )
}
