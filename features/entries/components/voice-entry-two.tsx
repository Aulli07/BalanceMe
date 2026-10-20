import { useState } from "react";
import { createPortal } from "react-dom";
import { LuChevronDown } from "react-icons/lu";
import { mockCategories, mockCustomers } from "@/shared/data/domain-mock-data";

import { EntryProps } from "../types/entry-type";



export function VoiceEntryTwo({
  onNext,
  setCustomer,
  customer,
  setAmount,
  amount,
  entryDescription,
  setEntryDescription
}: EntryProps) {

  return (
    <main className="px-4 pt-3">
      <EntryFormDetails
        customer={customer}
        setCustomer={setCustomer}
        amount={amount}
        setAmount={setAmount}
        entryDescription={entryDescription}
        setEntryDescription={setEntryDescription}
      />
      <button
        type="button"
        onClick={() => onNext?.()}
        disabled={!entryDescription?.category}
        className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl text-[var(--paper)] py-2 text-sm font-bold bg-[var(--forest)] shadow-lg shadow-[var(--forest)]/15"
      >
        Complete
      </button>
    </main>
  )
}


function EntryFormDetails({
  customer,
  setCustomer,
  amount,
  setAmount,
  entryDescription,
  setEntryDescription,
}: EntryProps) {
  const [selectedTrigger, setSelectedTrigger] = useState(false);
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);

  function pasteAmount(eventValue: string, type: 0|1) {
    setAmount?.((currentAmount) => {
      const nextAmount = [...currentAmount] as [string, string];
      nextAmount[type] = eventValue;
      return nextAmount;
    })
  }
  
  return (
    <section aria-labelledby="entry-form-details">
      <div className="grid min-w-0 gap-1.5 text-sm font-bold text-[var(--ink)]">
        Customer
        <div className="flex w-full items-center gap-2 rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-3 py-2 text-left shadow-sm transition-colors focus-within:border-[var(--forest)]">
          <span
            className="grid size-8 shrink-0 place-items-center rounded-xl bg-[#e2ecd7] text-sm font-extrabold text-[var(--forest)]"
          >
            {(customer?.name.at(0) ?? "S") + (customer?.name.at(1) ?? "C")}
          </span>
          <span className="min-w-0 flex-1 truncate text-base font-extrabold text-[var(--ink)]">{customer?.name ?? "Select customer"}</span>
          <div className="flex size-7 items-center justify-center">
            <LuChevronDown
            className="size-7 shrink-0 text-[#758477]"
            aria-hidden="true"
            onClick={() => setSelectedTrigger((prev) => !prev)}
          />
          </div>
        </div>
  
        {selectedTrigger &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex items-end bg-black/30"
              onClick={() => setSelectedTrigger(false)}
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
                    onClick={() => setSelectedTrigger(false)}
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
                        setSelectedTrigger(false);
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
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <label className="grid min-w-0 gap-1.5 text-sm font-bold text-[var(--ink)]">
          Paid
          <input
            className="box-border min-w-0 w-full rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-3 py-1.5 text-sm text-left"
            value={amount?.[0] || ""}
            placeholder=""
            onChange={(event) => pasteAmount(event.target.value, 0)}
          />
        </label>
        <label className="grid min-w-0 gap-1.5 text-sm font-bold text-[var(--ink)]">
          Owes
          <input
            className="box-border min-w-0 w-full rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-3 py-1.5 text-sm text-left"
            value={amount?.[1] || ""}
            placeholder=""
            onChange={(event) => pasteAmount(event.target.value, 1)}
          />
        </label>
      </div>

      <div className="mt-3 grid min-w-0 gap-2.5">
        <div className="grid w-full min-w-0 gap-1.5 text-sm font-bold text-[var(--ink)]">
          Category
          <button
            type="button"
            onClick={() => setCategoryPickerOpen(true)}
            aria-label="Select category"
            className="flex w-full min-w-0 max-w-full items-center justify-between rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-3 py-2 text-left text-sm font-medium shadow-sm transition-colors active:bg-[#f0f4ea]"
          >
            <span className={entryDescription?.category ? "text-[var(--ink)]" : "text-[#829082]"}>
              {entryDescription?.category?.name ?? "Select a category"}
            </span>
            <LuChevronDown className="size-5 shrink-0 text-[#758477]" aria-hidden="true" />
          </button>
        </div>

        {categoryPickerOpen &&
          createPortal(
            <div
              className="fixed inset-0 z-50 flex items-end bg-black/30"
              onClick={() => setCategoryPickerOpen(false)}
            >
              <div
                className="w-full rounded-t-[2rem] bg-[var(--surface)] px-5 pb-8 pt-4 text-[var(--ink)] shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-[#dce4d5]" />
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-extrabold">Select category</h2>
                  <button
                    type="button"
                    onClick={() => setCategoryPickerOpen(false)}
                    className="rounded-full bg-[#eef3e8] px-3 py-1 text-sm font-bold text-[var(--forest)]"
                  >
                    Close
                  </button>
                </div>
                <div className="grid gap-2">
                  {mockCategories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setEntryDescription?.((current) => ({ ...current, category }));
                        setCategoryPickerOpen(false);
                      }}
                      className={`rounded-2xl border px-4 py-3 text-left font-bold transition-colors ${
                        entryDescription?.category?.id === category.id
                          ? "border-[#a8c487] bg-[#dfead2] text-[var(--forest)]"
                          : "border-[#e1e7dc] bg-[#fffef9] active:bg-[#e8eddd]"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>,
            document.body,
          )}

        <label className="grid min-w-0 gap-1.5 text-sm font-bold text-[var(--ink)]">
          Description
          <textarea
            name="description"
            rows={2}
            placeholder="What was this entry for?"
            value={entryDescription?.description || ""}
            onChange={(event) => setEntryDescription?.((current) => ({ ...current, description: event.target.value }))}

            className="box-border min-h-16 min-w-0 w-full max-w-full resize-none rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-3 py-2 text-sm font-medium shadow-sm outline-none placeholder:text-[#829082] focus:border-[var(--forest)]"
          />
        </label>

        <label className="grid min-w-0 gap-1.5 text-sm font-bold text-[var(--ink)]">
          Receipt
          <input
            name="receipt"
            type="file"
            accept="image/*"
            onChange={(event) => setEntryDescription?.((current) => ({ ...current, receipt: event.target.files?.[0] }))}

            className="box-border block min-w-0 w-full max-w-full rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium shadow-sm file:mr-2 file:rounded-lg file:border-0 file:bg-[#e8eee1] file:px-2 file:py-1.5 file:font-bold file:text-[var(--forest)]"
          />
        </label>
      </div>
    </section>
  )
}
