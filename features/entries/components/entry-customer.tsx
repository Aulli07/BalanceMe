import { useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { LuChevronDown, LuSearch } from "react-icons/lu";

import type { FormType } from "../hooks/useEntryForm";
import { filterCustomersByName } from "../selectors/filter-customers-by-name";

import { mockCustomers } from "@/shared/data/domain-mock-data";




export function EntryCustomer({ setCustomer, customer }: {
  setCustomer?: FormType["setCustomer"];
  customer?: FormType["customer"];
}) {
  const [selectedTrigger, setSelectedTrigger] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredCustomers = filterCustomersByName(mockCustomers, searchQuery);

  const closePicker = () => {
    setSelectedTrigger(false);
    setSearchQuery("");
  };

  return (
    <section aria-labelledby="entry-customer-heading">
      <button
        type="button"
        onClick={() => setSelectedTrigger((prev) => !prev)}
        className="flex min-h-15 w-full items-center justify-between gap-3 rounded-2xl border border-[#e4e9df] bg-[var(--surface)] px-4 text-left shadow-sm shadow-[var(--forest)]/5 transition-colors active:border-[var(--forest)]"
      >
        <span className="flex min-w-0 items-center gap-3">
          {customer ? (
            customer.avatarUrl ? (
              <Image
                src={customer.avatarUrl}
                alt=""
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#d9e8c5] text-sm font-extrabold text-[var(--forest)]">
                {customer.name.slice(0, 2)}
              </span>
            )
          ) : null}
          <span className="truncate text-[17px] font-extrabold text-[var(--ink)]">
            {customer ? customer.name : "Select Customer"}
          </span>
        </span>
        <LuChevronDown
          className="size-6 shrink-0 text-[#758477]"
          aria-hidden="true"
        />
      </button>

      {selectedTrigger &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-end bg-black/30"
            onClick={closePicker}
          >
            <div
              className="w-full rounded-t-[2rem] bg-[var(--surface)] px-5 pb-8 pt-4 text-[var(--ink)] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-[#dce4d5]" />
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-extrabold">Select customer</h2>
                <button
                  type="button"
                  onClick={closePicker}
                  className="rounded-full bg-[#eef3e8] px-3 py-1 text-sm font-bold text-[var(--forest)]"
                >
                  Close
                </button>
              </div>
              <div className="grid gap-2">
                {filteredCustomers.map((customer) => (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => {
                      setCustomer?.(customer);
                      closePicker();
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-[#e1e7dc] bg-[#fffef9] px-4 py-3 text-left transition-colors active:bg-[#e8eddd]"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-[#d9e8c5] text-sm font-extrabold text-[var(--forest)]">
                      {customer.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="font-bold">{customer.name}</span>
                  </button>
                ))}
                {filteredCustomers.length === 0 && (
                  <p className="rounded-2xl bg-[#f4f7f0] px-4 py-5 text-center text-sm font-bold text-[#758477]">
                    No customers found.
                  </p>
                )}
              </div>
              <label className="mt-4 flex items-center gap-3 rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-4 py-3">
                <LuSearch className="size-5 shrink-0 text-[#758477]" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search customers"
                  className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-[#758477]"
                />
              </label>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}