import Image from "next/image";
import { createPortal } from "react-dom";
import { LuChevronDown } from "react-icons/lu";

import { FormType, useEntryForm } from "../hooks/useEntryForm";
// import { EntryProps } from "../types/entry-type";

import { mockCustomers } from "@/shared/data/domain-mock-data";




export function EntryCustomer({ setCustomer, customer }: {
  setCustomer?: FormType["setCustomer"];
  customer?: FormType["customer"];
}) {
  const { selectedTrigger, isSelectedTrigger } = useEntryForm();

  return (
    <section aria-labelledby="entry-customer-heading">
      <button
        type="button"
        onClick={() => isSelectedTrigger((prev) => !prev)}
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
            onClick={() => isSelectedTrigger(false)}
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
                  onClick={() => isSelectedTrigger(false)}
                  className="rounded-full bg-[#eef3e8] px-3 py-1 text-sm font-bold text-[var(--forest)]"
                >
                  Close
                </button>
              </div>
              <div className="grid gap-2">
                {mockCustomers.map((customer) => (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => {
                      setCustomer?.(customer);
                      isSelectedTrigger(false);
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-[#e1e7dc] bg-[#fffef9] px-4 py-3 text-left transition-colors active:bg-[#e8eddd]"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-[#d9e8c5] text-sm font-extrabold text-[var(--forest)]">
                      {customer.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="font-bold">{customer.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}