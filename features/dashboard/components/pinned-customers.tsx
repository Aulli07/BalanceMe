import { LuPin } from "react-icons/lu";
import { mockCustomers } from "@/shared/data/domain-mock-data";
import { PinnedCustomerCard } from "@/features/customers/components/pinned-customer-card";

export function PinnedCustomers({ businessId }: { businessId: string }) {
  const pinnedCustomers = mockCustomers.filter(
    (customer) => customer.businessId === businessId && customer.pinned
  );

  if (pinnedCustomers.length === 0) return null;

  return (
    <section aria-labelledby="pinned-customers-heading" className="mt-2">
      <div className="mb-2.5 flex items-center justify-between">
        <h2
          id="pinned-customers-heading"
          className="flex items-center gap-1.5 text-base font-extrabold uppercase text-[var(--forest)]"
        >
          <LuPin className="size-5 text-[var(--forest)]" aria-hidden="true" />
          Pinned customers
        </h2>
        {/* <span className="rounded-full bg-[#e2ecd7] px-2 py-0.5 text-xs font-bold text-[var(--forest)]">
          {pinnedCustomers.length}
        </span> */}
      </div>

      <div
        className="flex gap-2.5 overflow-x-auto pb-1 -mx-1 px-1"
        style={{ scrollbarWidth: "none" }}
      >
        {pinnedCustomers.map((customer) => (
          <PinnedCustomerCard key={customer.id} customer={customer} />
        ))}
      </div>
    </section>
  );
}
