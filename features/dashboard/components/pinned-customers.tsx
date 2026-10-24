import Image from "next/image";
import { ACTIVE_BUSINESS_ID, mockCustomers } from "@/shared/data/domain-mock-data";
import { formatNaira } from "@/shared/utils/format-naira";
import { getTotalAmountOwedForCustomer } from "../selectors/get-customers-owing";



export function PinnedCustomers({businessId}: {businessId: string}) {
  const pinnedCustomers = mockCustomers.filter((customer) => customer.businessId === businessId && customer.pinned);

  if (pinnedCustomers.length === 0) return null;

  return (
    <section aria-labelledby="pinned-customers-heading">
      <h2
        id="pinned-customers-heading"
        className="mb-3 mt-3 text-xl font-bold leading-tight tracking-tight text-[var(--ink)]"
      >
        Pinned customers
      </h2>
      <div className="grid grid-cols-2 gap-3" aria-label="Pinned customers">
        {pinnedCustomers.map((customer) => {
          const amountOwed = getTotalAmountOwedForCustomer(
            ACTIVE_BUSINESS_ID,
            customer.id,
          );
          const owesMoney = amountOwed > 0;

          return (
            <article
              key={customer.id}
              className="flex min-h-32 min-w-0 w-full flex-col justify-between overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-4 shadow-sm shadow-[var(--forest)]/5"
            >
              <div className="flex items-center gap-2.5">
                {customer.avatarUrl ? (
                  <Image
                    src={customer.avatarUrl}
                    alt={customer.name}
                    width={44}
                    height={44}
                    className="size-11 rounded-2xl object-cover"
                  />
                ) : (
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[var(--forest)] text-xs font-bold text-[var(--lime)]">
                    {customer.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
                  </span>
                )}

                <h3 className="min-w-0 truncate text-sm font-bold text-[var(--ink)]">
                  {customer.name}
                </h3>
              </div>

              <div>
                <p
                  className={`text-[11px] font-semibold ${owesMoney ? "text-[#a7503e]" : "text-[var(--forest-soft)]"}`}
                >
                  {owesMoney ? "Owes you" : "All settled"}
                </p>
                <p className="mt-0.5 text-lg font-extrabold tracking-tight text-[var(--forest)]">
                  {formatNaira(amountOwed)}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
