"use client";

import { createPortal } from "react-dom";
import { Dispatch, SetStateAction, useState } from "react";
import { LuAArrowDown, LuChevronDown, LuClock3 } from "react-icons/lu";
import { customerType } from "@/app/add-entry/page";


export type entryDetailType = {
  category: string;
  description: string;
  receipt?: File;
}

const entryCategories = ["Feed", "Foodstuffs", "Livestock Sale", "Electronics"];


export function AddEntryTwo({
  customer,
  amount,
  entryType,
  entryDescription,
  setEntryDescription,
  setStep
}: {
  customer: customerType | undefined;
  amount: [string, string];
  entryType: 0|1;
  entryDescription: entryDetailType;
  setEntryDescription: Dispatch<SetStateAction<entryDetailType>>;
  setStep: Dispatch<SetStateAction<1|2|3>>;
}) {

  return (
    <main>
      <EntryConfirmedDetails customer={customer} amount={amount} entryType={entryType} />
      <EntryDescription
        entryDescription={entryDescription}
        setEntryDescription={setEntryDescription}
      />
      <button
        type="button"
        onClick={() => setStep(3)}
        disabled={!entryDescription.category}
        className="mt-5 flex w-full items-center justify-center gap-4 rounded-xl bg-[#c7d9ae] py-2 text-md font-bold text-[var(--forest)] shadow-lg shadow-[var(--forest)]/15"
      >
        Complete
      </button>
    </main>
  )
}




export function EntryConfirmedDetails({
  customer,
  amount,
  entryType
}: {
  customer: customerType | undefined;
  amount: [string, string];
  entryType: 0|1;
}) {

  return (
    <section className="mx-5 mt-5 overflow-hidden rounded-3xl border border-[#dce7d2] bg-[#f7faf2] shadow-sm" aria-label="Confirmed entry details">
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#d9e8c5] text-lg font-extrabold text-[var(--forest)]">
          {customer?.image ?? "SC"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-extrabold text-[var(--ink)]">
            {customer?.name ?? "Select customer"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-extrabold tracking-tight text-[var(--forest)]">
            ₦{Number(amount[0] || 0).toLocaleString("en-NG")}
          </p>
          <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${
            amount[1]
              ? "bg-[#f5e8d8] text-[#855126]"
              : "bg-[#dfeeda] text-[#568044]"
          }`}>
            {amount[1] && <LuClock3 className="size-2.5" aria-hidden="true" />}
            {amount[1] && "Due"} + {Number(amount[1] || 0).toLocaleString("en-NG")}
          </span>
        </div>
      </div>
    </section>
  )
}


function EntryDescription({
  entryDescription,
  setEntryDescription
}: {
  entryDescription: entryDetailType;
  setEntryDescription: Dispatch<SetStateAction<entryDetailType>>;
}) {
  const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);

  const updateDescription = (field: keyof entryDetailType, value: string | File | undefined) => {
    setEntryDescription((current) => ({
      ...current,
      [field]: value,
    }));
  };

  return (
    <section className="mt-5 px-5" aria-labelledby="entry-description-heading">
      <div className="mt-4 grid gap-4 min-w-0">
        <div className="grid gap-2 text-md min-w-0 w-full font-bold text-[var(--ink)]">
          Category
          <button
            type="button"
            onClick={() => setCategoryPickerOpen(true)}
            aria-label="Select category"
            className="flex items-center w-full max-w-full min-w-0 justify-between rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-4 py-3 text-left font-medium shadow-sm transition-colors active:bg-[#f0f4ea]"
          >
            <span className={entryDescription.category ? "text-[var(--ink)]" : "text-[#829082]"}>
              {entryDescription.category || "Select a category"}
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
                  {entryCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        updateDescription("category", category);
                        setCategoryPickerOpen(false);
                      }}
                      className={`rounded-2xl border px-4 py-3 text-left font-bold transition-colors ${
                        entryDescription.category === category
                          ? "border-[#a8c487] bg-[#dfead2] text-[var(--forest)]"
                          : "border-[#e1e7dc] bg-[#fffef9] active:bg-[#e8eddd]"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>,
            document.body,
          )}

        <label className="grid min-w-0 gap-2 text-md font-bold text-[var(--ink)]">
          Description
          <textarea
            name="description"
            rows={3}
            placeholder="What was this entry for?"
            value={entryDescription.description}
            onChange={(event) => updateDescription("description", event.target.value)}
            className="box-border min-w-0 w-full max-w-full resize-none rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-4 py-3 font-medium shadow-sm outline-none placeholder:text-[#829082] focus:border-[var(--forest)]"
          />
        </label>

        <label className="grid min-w-0 gap-2 text-md font-bold text-[var(--ink)]">
          Receipt
          <input
            name="receipt"
            type="file"
            accept="image/*"
            onChange={(event) => updateDescription("receipt", event.target.files?.[0])}
            className="box-border block min-w-0 w-full max-w-full rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-4 py-3 text-sm font-medium shadow-sm file:mr-3 file:rounded-lg file:border-0 file:bg-[#e8eee1] file:px-3 file:py-2 file:font-bold file:text-[var(--forest)]"
          />
        </label>
      </div>
    </section>
  )
}