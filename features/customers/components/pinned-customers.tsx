import { LuPin } from "react-icons/lu";
import type { Customer } from "@/shared/types/domain";
import { PinnedCustomerCard } from "./pinned-customer-card";

export function PinnedCustomers({
  customers,
}: {
  customers: Customer[];
}) {
  const pinned = customers.filter((c) => c.pinned);

  if (pinned.length === 0) return null;

  return (
    <section className="mt-4" aria-label="Pinned customers">
      <div className="mb-2.5 flex items-center gap-1.5">
        <LuPin className="size-3.5 text-[var(--forest)]" aria-hidden="true" />
        <h2 className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
          Pinned
        </h2>
      </div>

      <div
        className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {pinned.map((customer) => (
          <PinnedCustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </section>
  );
}
