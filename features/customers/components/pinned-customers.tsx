import Link from "next/link";
import Image from "next/image";
import { LuPin } from "react-icons/lu";
import type { Customer } from "@/shared/types/domain";
import { getCustomerSaleTransactionCount } from "../selectors/get-customer-txn-count";

export function PinnedCustomers({
  customers,
}: {
  customers: Customer[];
}) {
  const pinned = customers.filter((c) => c.pinned);

  if (pinned.length === 0) return null;

  return (
    <section className="mt-5" aria-label="Pinned customers">
      <div className="flex items-center gap-1.5 mb-3">
        <LuPin className="size-3.5 text-[var(--forest)]" />
        <h2 className="text-xs font-bold uppercase tracking-wide text-[#778477]">
          Pinned
        </h2>
      </div>

      <div
        className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {pinned.map((customer) => {
          const txnCount = getCustomerSaleTransactionCount(customer.id);
          const initials = customer.name.slice(0, 2).toUpperCase();

          return (
            <Link
              key={customer.id}
              href={`/customers/${customer.id}`}
              className="flex flex-col items-center gap-1.5 min-w-[72px] max-w-[80px] rounded-xl px-2 py-2.5 transition-colors active:bg-[#e8eddd]/60"
            >
              {/* Avatar */}
              {customer.avatarUrl ? (
                <Image
                  src={customer.avatarUrl}
                  alt={customer.name}
                  width={44}
                  height={44}
                  className="size-11 rounded-full object-cover ring-2 ring-[#e2ecd7]"
                />
              ) : (
                <span className="grid size-11 place-items-center rounded-full bg-[#e2ecd7] text-[11px] font-extrabold text-[var(--forest)] ring-2 ring-[#d3dec8]">
                  {initials}
                </span>
              )}

              {/* Name */}
              <span className="w-full truncate text-center text-[11px] font-semibold leading-tight text-[#294735]">
                {customer.name.split(" ")[0]}
              </span>

              {/* Transaction count */}
              <span className="text-[10px] font-medium leading-none text-[#778477]">
                {txnCount} txn{txnCount !== 1 ? "s" : ""}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
