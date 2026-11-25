import Image from "next/image";
import Link from "next/link";
import { LuPin } from "react-icons/lu";
import { Customer } from "@/shared/types/domain";

import { getCustomerDebtSummaries } from "@/shared/selectors/customer-owe-getters";
import { getOwingAgeLabel } from "@/features/dashboard/utils/get-dash-utils";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/domain-mock-data";
import { getInitialsOfName } from "@/shared/utils/get-initials";



export function CustomerSummary({
  visibleCustomers,
}: {
  visibleCustomers: Customer[];
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
            className="flex w-full items-center gap-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-left shadow-xs transition-colors active:bg-[#edf3e7]"
            aria-label={`View ${customer.name}`}
          >
            {/* <span className="flex min-w-0 items-center gap-3"> */}
            {customer.avatarUrl ? (
              <Image
                src={customer.avatarUrl}
                alt=""
                width={44}
                height={44}
                className="shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#e2ecd7] text-base font-extrabold text-[var(--forest)]">
                {getInitialsOfName(customer.name)}
              </span>
            )}
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 truncate text-sm font-extrabold text-[var(--ink)]">
                <span className="truncate">{customer.name} </span>
                {customer.pinned && (
                  <LuPin
                    className="size-4 shrink-0 text-[var(--forest)]"
                    aria-label="Pinned customer"
                  />
                )}
              </span>
            </span>
            {summary ? (
              <span className="shrink-0 rounded-lg bg-[#f7e4d3] px-2.5 py-1.5 text-right text-[11px] font-bold text-[#81502f]">
                {getOwingAgeLabel(summary.oldestOutstandingAt)}
              </span>
            ) : (
              <span className="shrink-0 rounded-lg bg-[#e2ecd7] px-2.5 py-1 text-right text-xs font-bold text-[var(--forest)]">
                Settled
              </span>
            )}
            {/* </span> */}
          </Link>
        );
      })}
    </div>
  );
}
