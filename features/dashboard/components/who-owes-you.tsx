import Image from "next/image";
import Link from "next/link";
import { LuPin } from "react-icons/lu";

import { getCustomerDebtSummaries } from "../selectors/get-customers-owing";
import { formatNaira } from "@/shared/utils/format-naira";
import { sortCustomers } from "../selectors/sort-owing-customers";
import { getInitials } from "@/features/transactions/utils/get-name-initials";
import { getOwingAgeLabel, getWhatsAppHref } from "../utils/get-dash-utils";


const MAX_CUSTOMERS_SHOWN = 5;


export function WhoOwesYou({ businessId }: { businessId: string }) {
  const customers = sortCustomers(getCustomerDebtSummaries(businessId));
  const visibleCustomers = customers.slice(0, MAX_CUSTOMERS_SHOWN);

  return (
    <section aria-labelledby="who-owes-you-heading" className="mt-2">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2
          id="who-owes-you-heading"
          className="text-lg font-extrabold text-[var(--forest)] tracking-tight"
        >
          Who owes you
        </h2>
        {customers.length > MAX_CUSTOMERS_SHOWN && (
          <Link
            href="/customers"
            className="min-h-11 inline-flex items-center text-sm font-bold text-[var(--forest)] underline-offset-2 hover:underline"
          >
            See all ({customers.length})
          </Link>
        )}
      </div>

      {visibleCustomers.length === 0 ? (
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-5 text-center shadow-sm">
          <p className="font-extrabold text-[var(--ink)]">No one owes you right now</p>
          <p className="mt-1 text-sm leading-5 text-[var(--muted)]">
            When you add a sale that isn&apos;t fully paid, it will show up here.
          </p>
        </div>
      ) : (
        <div className="grid gap-3">
          {visibleCustomers.map((summary) => {
            const { customer } = summary;
            const initials = getInitials(customer.name);

            return (
              <article
                key={customer.id}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm"
              >
                <div className="flex min-w-0 items-start gap-3">
                  {customer.avatarUrl ? (
                    <Image
                      src={customer.avatarUrl}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 shrink-0 rounded-2xl object-cover"
                    />
                  ) : (
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#e2ecd7] text-sm font-extrabold text-[var(--forest)]">
                      {initials}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/customers/${customer.id}`}
                      className="flex w-fit max-w-full items-center gap-1 truncate text-[15px] font-extrabold text-[var(--ink)] underline-offset-2 hover:underline"
                    >
                      <span className="truncate">{customer.name}</span>
                      {customer.pinned && (
                        <LuPin
                          className="size-3.5 shrink-0 text-[var(--forest)]"
                          aria-label="Pinned customer"
                        />
                      )}
                    </Link>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <p className="text-xs font-medium text-[var(--muted)]">
                        {getOwingAgeLabel(summary.oldestOutstandingAt)}
                      </p>
                      {summary.hasOverdueDebt && (
                        <span className="rounded-full bg-[#f8ead5] px-2 py-0.5 text-[11px] font-bold text-[#855126]">
                          Overdue
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="shrink-0 text-right text-lg font-extrabold tracking-tight text-[var(--forest)]">
                    {formatNaira(summary.owedAmount)}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  <a
                    href={getWhatsAppHref(
                      customer.name,
                      customer.phone,
                      summary.owedAmount,
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center rounded-xl border border-[#dce5d4] px-3 text-sm font-bold text-[var(--forest)] transition-colors hover:bg-[#f0f4ea]"
                  >
                    Remind
                  </a>
                  <Link
                    href={`/add-entry?customerId=${encodeURIComponent(customer.id)}&mode=repayment`}
                    className="inline-flex min-h-11 items-center justify-center rounded-xl bg-[var(--forest)] px-3 text-sm font-bold text-[var(--surface)] transition-colors hover:bg-[var(--forest-dark)]"
                  >
                    Record payment
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
