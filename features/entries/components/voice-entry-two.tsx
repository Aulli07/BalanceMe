import { useState } from "react";
import { createPortal } from "react-dom";
import { LuChevronDown } from "react-icons/lu";
import { mockCustomers } from "@/shared/data/domain-mock-data";
import type { EntryProps } from "../types/entry-type";

export function VoiceEntryTwo(props: EntryProps) {
  const { onNext, customer, entryDescription } = props;

  return (
    <main className="px-4 pt-3">
      <EntryFormDetails {...props} />
      <button
        type="button"
        onClick={() => onNext?.()}
        disabled={!customer || !entryDescription?.description.trim()}
        className="mt-3 flex w-full items-center justify-center gap-3 rounded-xl bg-[var(--forest)] py-2 text-sm font-bold text-[var(--paper)] shadow-lg shadow-[var(--forest)]/15 disabled:opacity-50"
      >
        Complete
      </button>
    </main>
  );
}

function EntryFormDetails({ customer, setCustomer, amount, setAmount, entryDescription, setEntryDescription }: EntryProps) {
  const [customerPickerOpen, setCustomerPickerOpen] = useState(false);

  function updateAmount(value: string, index: 0 | 1) {
    setAmount?.((current) => {
      const next = [...current] as [string, string];
      next[index] = value;
      return next;
    });
  }

  return (
    <section aria-labelledby="entry-form-details">
      <div className="grid gap-1.5 text-sm font-bold text-[var(--ink)]">
        Customer
        <button type="button" onClick={() => setCustomerPickerOpen(true)} className="flex w-full items-center gap-2 rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-3 py-2 text-left shadow-sm">
          <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[#e2ecd7] text-sm font-extrabold text-[var(--forest)]">
            {customer?.name.slice(0, 2).toUpperCase() ?? "SC"}
          </span>
          <span className="min-w-0 flex-1 truncate text-base font-extrabold">{customer?.name ?? "Select customer"}</span>
          <LuChevronDown className="size-5 text-[#758477]" aria-hidden="true" />
        </button>
      </div>

      {customerPickerOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-end bg-black/30" onClick={() => setCustomerPickerOpen(false)}>
          <div className="w-full rounded-t-[2rem] bg-[var(--surface)] px-5 pb-8 pt-4 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-extrabold">Select customer</h2><button type="button" onClick={() => setCustomerPickerOpen(false)}>Close</button></div>
            <div className="grid gap-2">{mockCustomers.map((item) => <button key={item.id} type="button" onClick={() => { setCustomer?.(item); setCustomerPickerOpen(false); }} className="rounded-2xl border border-[#e1e7dc] bg-[#fffef9] px-4 py-3 text-left font-bold">{item.name}</button>)}</div>
          </div>
        </div>, document.body,
      )}

      <div className="mt-2 grid grid-cols-2 gap-2">
        <label className="grid gap-1.5 text-sm font-bold">Paid<input value={amount?.[0] ?? ""} onChange={(event) => updateAmount(event.target.value, 0)} className="rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-3 py-1.5" /></label>
        <label className="grid gap-1.5 text-sm font-bold">Owes<input value={amount?.[1] ?? ""} onChange={(event) => updateAmount(event.target.value, 1)} className="rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-3 py-1.5" /></label>
      </div>
      <div className="mt-3 grid gap-2.5">
        <label className="grid gap-1.5 text-sm font-bold">Description<textarea rows={2} placeholder="What was this entry for?" value={entryDescription?.description ?? ""} onChange={(event) => setEntryDescription?.((current) => ({ ...current, description: event.target.value }))} className="resize-none rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-3 py-2" /></label>
        <label className="grid gap-1.5 text-sm font-bold">Receipt<input type="file" accept="image/*" onChange={(event) => setEntryDescription?.((current) => ({ ...current, receipt: event.target.files?.[0] }))} /></label>
      </div>
    </section>
  );
}
