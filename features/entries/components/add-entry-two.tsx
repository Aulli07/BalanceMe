"use client";

import Image from "next/image";
import { LuArrowRight, LuCalendarDays } from "react-icons/lu";
import type { FormType } from "../hooks/useEntryForm";
import type { EntryProps } from "../types/entry-type";

export function AddEntryTwo({ form }: { form: FormType }) {
  const {
    customer,
    purchaseAmount,
    amountPaid,
    amountRepaid,
    entryType,
    selectedPurchase,
    description,
    setDescription,
    dueDate,
    setDueDate,
    setReceipt,
    setStep,
  } = form;

  return (
    <main className="flex min-h-[calc(100vh-5rem)] flex-col px-5 pb-7 pt-5">
      <EntryConfirmedDetails
        customer={customer}
        purchaseAmount={purchaseAmount}
        amountPaid={amountPaid}
        amountRepaid={amountRepaid}
        entryType={entryType}
        selectedPurchase={selectedPurchase}
      />
      <EntryDescription
        description={description}
        setDescription={setDescription}
        dueDate={dueDate}
        setDueDate={setDueDate}
        setReceipt={setReceipt}
      />
      <button
        type="button"
        onClick={() => setStep(3)}
        className="mt-auto flex w-full items-center justify-center gap-1 rounded-2xl bg-[var(--forest)] px-5 py-3 text-[16px] font-bold text-[var(--surface)]"
      >
        Complete <LuArrowRight className="size-5" aria-hidden="true" />
      </button>
    </main>
  );
}

function EntryConfirmedDetails({
  customer,
  purchaseAmount,
  amountPaid,
  amountRepaid,
  entryType,
  selectedPurchase,
}: EntryProps) {
  const purchasePrice = Number(purchaseAmount || 0);
  const paid = Number(amountPaid || 0);
  const repaid = Number(amountRepaid || 0);
  const amountOwed = Math.max(purchasePrice - paid, 0);
  const repaymentOwed = selectedPurchase
    ? Math.max(
        (selectedPurchase.productPrice - selectedPurchase.amountPaid) / 100 -
          repaid,
        0,
      )
    : 0;
  const isRepayment = entryType === 1;

  return (
    <section className="rounded-2xl bg-[var(--forest)] px-5 py-6 text-[var(--surface)] shadow-lg shadow-[var(--forest)]/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3 text-center">
          {customer?.avatarUrl ? (
            <Image
              src={customer.avatarUrl}
              alt={`${customer.name}'s profile`}
              width={52}
              height={52}
              className="size-14 rounded-full border-2 border-white/25 object-cover"
            />
          ) : (
            <span className="grid size-13 place-items-center rounded-full bg-[#d9e8c5] font-extrabold text-[var(--forest)]">
              {customer?.name.slice(0, 2).toUpperCase() ?? "SC"}
            </span>
          )}
          <p className="mt-3 truncate text-lg font-extrabold">
            {customer?.name ?? "Select customer"}
          </p>
        </div>
        <div className="shrink-0 pt-1 text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#d9e8c5]">
            {isRepayment ? "Amount repaid" : "Amount owed"}
          </p>
          <p className="mt-1 text-2xl font-extrabold">
            ₦{(isRepayment ? repaid : amountOwed).toLocaleString("en-NG")}
          </p>
        </div>
      </div>
      {isRepayment && selectedPurchase ? (
        <div className="mt-6 rounded-2xl bg-white/10 px-4 py-3">
          <p className="truncate text-base font-extrabold">
            For: {selectedPurchase.description}
          </p>
          <p className="mt-2 text-xs font-extrabold text-[#d9e8c5]">
            Still owes ₦{repaymentOwed.toLocaleString("en-NG")}
          </p>
        </div>
      ) : (
        <div className="mt-7 flex justify-end gap-2 text-right">
          <AmountLabel label="Product price" value={purchasePrice} />
          <AmountLabel label="Amount paid" value={paid} />
        </div>
      )}
    </section>
  );
}

function AmountLabel({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl bg-white/10 px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#d9e8c5]">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-extrabold">
        ₦{value.toLocaleString("en-NG")}
      </p>
    </div>
  );
}

function EntryDescription({
  description,
  setDescription,
  dueDate,
  setDueDate,
  setReceipt,
}: EntryProps) {
  return (
    <section className="mt-5" aria-labelledby="entry-description-heading">
      <label className="grid gap-2 text-sm font-bold text-[var(--ink)]">
        Description
        <textarea
          rows={3}
          value={description ?? ""}
          onChange={(event) => setDescription?.(event.target.value)}
          placeholder="What was this entry for?"
          className="resize-none rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-4 py-3"
        />
      </label>
      <label className="mt-4 grid gap-2 text-sm font-bold text-[var(--ink)]">
        Due date
        <div className="relative">
          <input
            type="date"
            value={dueDate ?? ""}
            onChange={(event) => setDueDate?.(event.target.value)}
            className="w-full rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-4 py-3"
          />
          <LuCalendarDays className="pointer-events-none absolute right-3 top-3 size-5 text-[#758477]" />
        </div>
      </label>
      <label className="mt-4 grid gap-2 text-sm font-bold text-[var(--ink)]">
        Receipt
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(event) => setReceipt?.(event.target.files?.[0])}
        />
      </label>
    </section>
  );
}
