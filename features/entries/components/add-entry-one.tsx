"use client";

import { LuArrowRight, LuChevronDown } from "react-icons/lu";
import Image from "next/image";
import { createPortal } from "react-dom";

import { useEntryForm } from "../hooks/useEntryForm";
import { EntryProps } from "../types/entry-type";
import { mockCustomers } from "@/shared/data/domain-mock-data";

export function AddEntryOne({
  setCustomer,
  customer,
  setStep,
  setAmount,
  amount,
  setEntryType,
  entryType,
}: EntryProps) {
  if (entryType === undefined || amount === undefined) return null;

  return (
    <main className="flex min-h-[calc(100vh-6rem)] flex-col px-5 pb-7 pt-5">
      <EntryCustomer setCustomer={setCustomer} customer={customer} />
      <EntryAmount
        setAmount={setAmount}
        setEntryType={setEntryType}
        entryType={entryType}
        amount={amount}
        customer={customer}
      />

      <button
        type="button"
        onClick={() => setStep?.(2)}
        disabled={!customer || amount[entryType] === "0"}
        className="mt-auto flex w-full items-center justify-center gap-1 rounded-2xl bg-[var(--forest)] px-5 py-3 text-[16px] font-bold text-[var(--surface)] shadow-lg shadow-[var(--forest)]/15 transition-all hover:bg-[var(--forest-dark)] active:scale-[.98] disabled:cursor-not-allowed disabled:bg-[var(--forest)]/80 disabled:text-[var(--surface)]/90 disabled:shadow-none"
      >
        Continue
        <LuArrowRight className="size-5" aria-hidden="true" />
      </button>
    </main>
  );
}

export function EntryCustomer({
  setCustomer,
  customer,
}: EntryProps) {
  const { selectedTrigger, isSelectedTrigger } = useEntryForm();

  return (
    <section aria-labelledby="entry-customer-heading">
      <button
        type="button"
        onClick={() => isSelectedTrigger((prev) => !prev)}
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-[#e4e9df] bg-[var(--surface)] px-4 text-left shadow-sm shadow-[var(--forest)]/5 transition-colors active:border-[var(--forest)]"
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
        <LuChevronDown className="size-6 shrink-0 text-[#758477]" aria-hidden="true" />
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

export function EntryAmount({
  setAmount,
  setEntryType,
  entryType,
  amount,
  customer,
}: EntryProps) {
  const selectEntryType = (nextType: 0 | 1) => {
    setEntryType?.(nextType);
  };

  if (entryType === undefined || amount === undefined) {
    return null;
  }

  const productPrice = Number(amount[0]) || 0;
  const amountPaid = Number(amount[1]) || 0;
  const amountOwed = Math.max(productPrice - amountPaid, 0);

  return (
    <section className="mt-4" aria-labelledby="entry-amount-heading">
      <div className="flex rounded-2xl bg-[#e1e8dd] p-1">
        <button
          type="button"
          onClick={() => selectEntryType(0)}
          aria-pressed={entryType === 0}
          className={`flex min-h-10 flex-1 items-center justify-center rounded-xl px-2 py-2 text-[15px] font-bold ${
            entryType === 0
              ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm shadow-[var(--forest)]/20"
              : "text-[#57705f]"
          }`}
        >
          Purchase
        </button>
        <button
          type="button"
          onClick={() => selectEntryType(1)}
          aria-pressed={entryType === 1}
          className={`flex min-h-10 flex-1 items-center justify-center rounded-xl px-2 py-2 text-[15px] font-bold ${
            entryType === 1
              ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm shadow-[var(--forest)]/20"
              : "text-[#57705f]"
          }`}
        >
          Debt repayment
        </button>
      </div>

      <div className="mt-4 rounded-[1.25rem] border border-[#e5e9df] bg-[var(--surface)] px-4 py-3 shadow-sm shadow-[var(--forest)]/5">
        <label
          className="flex items-center justify-between gap-4 border-b border-[#e9ede5] pb-3"
          htmlFor="entry-product-price"
        >
          <span className="text-[13px] font-bold text-[#53705f]">Product price</span>
          <input
            id="entry-product-price"
            type="number"
            // inputMode="decimal"
            // min="0"
            // step="0.01"
            value={amount[0]}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => setAmount?.((current) => [event.target.value, current[1]])}
            className="w-40 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-right text-[28px] font-extrabold leading-none tracking-tight text-[var(--forest)] outline-none placeholder:text-[#9aab9e]"
          />
        </label>

        <label
          className="flex items-center justify-between gap-4 pt-3"
          htmlFor="entry-amount-paid"
        >
          <span className="text-[13px] font-bold text-[#53705f]">Amount paid</span>
          <input
            id="entry-amount-paid"
            type="number"
            // inputMode="decimal"
            // min="0"
            // step="0.01"
            value={amount[1]}
            onFocus={(event) => event.currentTarget.select()}
            onChange={(event) => setAmount?.((current) => [current[0], event.target.value])}
            className="w-40 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-right text-[28px] font-extrabold leading-none tracking-tight text-[var(--forest)] outline-none placeholder:text-[#9aab9e]"
          />
        </label>
      </div>

      <p
        id="entry-amount-heading"
        className="mt-3 rounded-xl bg-[#f7e4d3] px-4 py-2 text-center text-[14px] font-bold text-[#81502f]"
      >
        {"\u20A6"} {amountOwed.toLocaleString("en-NG")} will be added to{" "}
        {customer?.name ?? "this customer"}&apos;s debt
      </p>
    </section>
  );
}
