"use client";

import { useState } from "react";
import { LuChevronDown, LuCheck } from "react-icons/lu";

type EntryCustomer = {
  name: string;
  initials: string;
  avatarClassName: string;
};

const recentCustomers: EntryCustomer[] = [
  {
    name: "Select customer",
    initials: "SC",
    avatarClassName: "bg-[#e2ecd7] text-[var(--forest)]",
  },
  {
    name: "Chika",
    initials: "CO",
    avatarClassName: "bg-[#e2ecd7] text-[var(--forest)]",
  },
  {
    name: "Tunde",
    initials: "TA",
    avatarClassName: "bg-[#f2e3d8] text-[#805644]",
  },
  {
    name: "Zainab",
    initials: "ZB",
    avatarClassName: "bg-[#e8eed7] text-[#64783f]",
  },
];

export function EntryCustomer() {
  const [selectedCustomer, setSelectedCustomer] = useState(recentCustomers[0]);

  return (
    <section className="px-5 pt-5" aria-labelledby="entry-customer-heading">
      {/* <h2
        id="entry-customer-heading"
        className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#7f8d82]"
      >
        Who is this for?
      </h2> */}

      <button
        type="button"
        className="flex w-full items-center gap-4 rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-5 py-3 text-left shadow-sm transition-colors active:bg-[#f0f4ea]"
        aria-label={`Change customer, currently ${selectedCustomer.name}`}
      >
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-xl text-xl font-extrabold ${selectedCustomer.avatarClassName}`}
        >
          {selectedCustomer.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xl font-extrabold text-[var(--ink)]">
            {selectedCustomer.name === "Tunde" ? "Tunde Adebayo" : selectedCustomer.name}
          </span>
        </span>
        <LuChevronDown className="size-7 shrink-0 text-[#758477]" aria-hidden="true" />
      </button>

      {/* <div className="mt-3 flex items-center gap-3">
        <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
          {recentCustomers.slice(1).map((customer) => {
            const isSelected = customer.initials === selectedCustomer.initials;

            return (
              <button
                key={customer.initials}
                type="button"
                onClick={() => setSelectedCustomer(customer)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-3 py-2 text-sm font-bold transition-colors ${
                  isSelected
                    ? "border-[#a8c487] bg-[#eef5df] text-[var(--forest)]"
                    : "border-[#e1e7dc] bg-[var(--surface)] text-[#627267]"
                }`}
                aria-pressed={isSelected}
              >
                <span className={`grid size-7 place-items-center rounded-full text-[10px] font-extrabold ${customer.avatarClassName}`}>
                  {isSelected ? <LuCheck className="size-3.5" aria-hidden="true" /> : customer.initials}
                </span>
                {customer.name}
              </button>
            );
          })}
        </div>
      </div> */}
    </section>
  );
}
