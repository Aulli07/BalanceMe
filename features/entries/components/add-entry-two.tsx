"use client";

import { createPortal } from "react-dom";
import { useState } from "react";
import Image from "next/image";
import { LuArrowRight, LuCalendarDays, LuChevronDown, LuPlus } from "react-icons/lu";

import { EntryProps } from "../types/entry-type";
import { mockCategories } from "@/shared/data/domain-mock-data";
import type { Category } from "@/shared/types/domain";



export function AddEntryTwo({
  customer,
  amount,
  entryType,
  entryDescription,
  setEntryDescription,
  setStep
}: EntryProps) {
  return (
    <main className="flex min-h-[calc(100vh-6rem)] flex-col px-5 pb-7 pt-5">
      <EntryConfirmedDetails customer={customer} amount={amount} entryType={entryType} />
      <EntryDescription
        entryDescription={entryDescription}
        setEntryDescription={setEntryDescription}
      />
      <button
        type="button"
        onClick={() => setStep?.(3)}
        disabled={!entryDescription?.category}
        className="mt-auto flex w-full items-center justify-center gap-1 rounded-2xl bg-[var(--forest)] px-5 py-3 text-[16px] font-bold text-[var(--surface)] shadow-lg shadow-[var(--forest)]/15 transition-all hover:bg-[var(--forest-dark)] active:scale-[.98] disabled:cursor-not-allowed disabled:bg-[var(--forest)]/80 disabled:text-[var(--surface)]/90 disabled:shadow-none"
      >
        Complete
        <LuArrowRight className="size-5" aria-hidden="true" />
      </button>
    </main>
  )
}




export function EntryConfirmedDetails({ customer, amount }: EntryProps) {
  const productPrice = Number(amount?.[0] || 0);
  const amountPaid = Number(amount?.[1] || 0);
  const amountOwed = Math.max(productPrice - amountPaid, 0);

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] bg-[var(--forest)] px-5 py-6 text-[var(--surface)] shadow-lg shadow-[var(--forest)]/20" aria-label="Confirmed entry details">
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0 text-center flex gap-3">
          {customer?.avatarUrl ? (
            <Image src={customer.avatarUrl} alt={`${customer.name}'s profile`} width={52} height={52} className="mx-auto size-14 rounded-full border-2 border-white/25 object-cover" />
          ) : (
            <span className="mx-auto grid size-13 place-items-center rounded-full bg-[#d9e8c5] text-base font-extrabold text-[var(--forest)]">{customer?.name.slice(0, 2).toUpperCase() ?? "SC"}</span>
          )}
          <p className="mt-3 truncate text-lg font-extrabold">{customer?.name ?? "Select customer"}</p>
        </div>
        <div className="shrink-0 pt-1 text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#d9e8c5]">Amount owed</p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight">{"\u20A6"}{amountOwed.toLocaleString("en-NG")}</p>
        </div>
      </div>
      <div className="relative mt-7 flex justify-end gap-2 text-right">
        <div className="rounded-xl bg-white/10 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#d9e8c5]">Product price</p>
          <p className="mt-0.5 text-sm font-extrabold">{"\u20A6"}{productPrice.toLocaleString("en-NG")}</p>
        </div>
        <div className="rounded-xl bg-[#d9e8c5] px-3 py-2 text-[var(--forest)]">
          <p className="text-[10px] font-bold uppercase tracking-wide text-[#48684e]">Amount paid</p>
          <p className="mt-0.5 text-sm font-extrabold">{"\u20A6"}{amountPaid.toLocaleString("en-NG")}</p>
        </div>
      </div>
    </section>
  );
}

/* Legacy layout retained below temporarily while the entry flow is being redesigned. */
export function EntryConfirmedDetailsLegacy({
  customer,
  amount,
  entryType: _entryType
}: EntryProps) {
  void _entryType;

  return (
    <section className="mx-5 mt-5 overflow-hidden rounded-3xl border border-[#dce7d2] bg-[#f7faf2] shadow-sm" aria-label="Confirmed entry details">
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#d9e8c5] text-lg font-extrabold text-[var(--forest)]">
          {customer?.name.slice(0, 2).toUpperCase() ?? "SC"}
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-extrabold text-[var(--ink)]">
            {customer?.name ?? "Select customer"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xl font-extrabold tracking-tight text-[var(--forest)]">
            ₦{Number(amount?.[0] || 0).toLocaleString("en-NG")}
          </p>
          <span className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold ${
            amount?.[1]
              ? "bg-[#f5e8d8] text-[#855126]"
              : "bg-[#dfeeda] text-[#568044]"
          }`}>
            {amount?.[1] && <span aria-hidden="true">•</span>}
            {amount?.[1] && "Due"} + {Number(amount?.[1] || 0).toLocaleString("en-NG")}
          </span>
        </div>
      </div>
    </section>
  )
}


function EntryDescription({
  entryDescription,
  setEntryDescription,
}: EntryProps) {
  // const [categoryPickerOpen, setCategoryPickerOpen] = useState(false);
  // const [creatingCategory, setCreatingCategory] = useState(false);
  // const [categoryName, setCategoryName] = useState("");
  // const [categories, setCategories] = useState<Category[]>(mockCategories);

  const updateDescription = <Field extends keyof NonNullable<typeof entryDescription>>(
    field: Field,
    value: NonNullable<typeof entryDescription>[Field],
  ) => {
    setEntryDescription?.((current) => ({ ...current, [field]: value }));
  };

  // const createCategory = () => {
  //   const name = categoryName.trim();
  //   if (!name) return;

  //   const category: Category = {
  //     id: `category-${Date.now()}`,
  //     businessId: mockCategories[0]?.businessId ?? "business-farm-001",
  //     name,
  //     createdAt: new Date().toISOString(),
  //   };

    // setCategories((current) => [...current, category]);
    // updateDescription("category", category);
    // setCategoryName("");
    // setCreatingCategory(false);
    // setCategoryPickerOpen(false);

  return (
    <section className="mt-5" aria-labelledby="entry-description-heading">
      <div className="grid min-w-0 gap-4">
      {/* <div className="grid min-w-0 gap-4">
        <div className="grid gap-2 text-md min-w-0 w-full font-bold text-[var(--ink)]">
          Category
          <button
            type="button"
            onClick={() => setCategoryPickerOpen(true)}
            aria-label="Select category"
            className="flex items-center w-full max-w-full min-w-0 justify-between rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-4 py-3 text-left font-medium shadow-sm transition-colors active:bg-[#f0f4ea]"
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
                {creatingCategory ? (
                  <div className="mb-3 rounded-2xl border border-[#c9dcb8] bg-[#f4f8ed] p-3">
                    <label className="block text-sm font-bold text-[var(--ink)]" htmlFor="new-category-name">
                      New category name
                    </label>
                    <div className="mt-2 flex gap-2">
                      <input
                        id="new-category-name"
                        autoFocus
                        value={categoryName}
                        onChange={(event) => setCategoryName(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") createCategory();
                        }}
                        placeholder="e.g. Delivery"
                        className="min-w-0 flex-1 rounded-xl border border-[#dfe6d9] bg-white px-3 py-2 text-sm font-medium outline-none focus:border-[var(--forest)]"
                      />
                      <button type="button" onClick={createCategory} disabled={!categoryName.trim()} className="rounded-xl bg-[var(--forest)] px-3 text-sm font-bold text-[var(--lime)] disabled:opacity-40">
                        Add
                      </button>
                    </div>
                  </div>
                ) : (
                  <button type="button" onClick={() => setCreatingCategory(true)} className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#a8c487] bg-[#f4f8ed] px-4 py-3 text-sm font-bold text-[var(--forest)]">
                    <LuPlus className="size-4" aria-hidden="true" /> New category
                  </button>
                )}
                <div className="grid gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        updateDescription("category", category);
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
          )} */}

        <label className="grid min-w-0 gap-2 text-md font-bold text-[var(--ink)]">
          Description
          <textarea
            name="description"
            rows={3}
            placeholder="What was this entry for?"
            value={entryDescription?.description}
            onChange={(event) => updateDescription("description", event.target.value)}
            className="box-border min-w-0 w-full max-w-full resize-none rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-4 py-3 font-medium shadow-sm outline-none placeholder:text-[#829082] focus:border-[var(--forest)]"
          />
        </label>

        <label className="grid min-w-0 gap-2 text-md font-bold text-[var(--ink)]" htmlFor="entry-due-date">
          Due date
          <span className="relative flex items-center">
            <LuCalendarDays className="pointer-events-none absolute left-4 size-5 text-[var(--forest)]" aria-hidden="true" />
            <input
              id="entry-due-date"
              name="dueDate"
              type="date"
              value={entryDescription?.dueDate ?? ""}
              onChange={(event) => updateDescription("dueDate", event.target.value)}
              className="box-border block min-h-12 w-full rounded-xl border border-[#dfe6d9] bg-[var(--surface)] py-3 pl-12 pr-4 font-medium text-[var(--ink)] shadow-sm outline-none focus:border-[var(--forest)]"
            />
          </span>
        </label>
      </div>
    </section>
  )
}
