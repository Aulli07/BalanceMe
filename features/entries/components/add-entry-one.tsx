"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { LuChevronDown, LuWalletCards, LuHandCoins, LuDelete, LuArrowRight } from "react-icons/lu";
import { pressKey } from "../utils/pressKey";
import { entryCustomers, numbers } from "../data/entry-data";
import { createPortal } from "react-dom";
import { useEntryForm } from "../hooks/useEntryForm";
import { EntryProps, VoiceEntryProps } from "../types/entry-type";



export function AddEntryOne({
  setCustomer,
  customer,
  setStep,
  setAmount,
  amount,
  setEntryType,
  entryType,
}: EntryProps) {

  if (entryType === undefined || amount === undefined) {
    return null;
  }

  return (
    <main className="px-5 pt-5">
      <EntryCustomer setCustomer={setCustomer} customer={customer} />
      <EntryAmount setAmount={setAmount} setEntryType={setEntryType} entryType={entryType} amount={amount} />

      <button
        type="button"
        onClick={() => setStep?.(2)}
        disabled={!customer || amount[entryType] === "0"}
        className="mt-5 flex w-full items-center justify-center gap-4 rounded-xl bg-[#c7d9ae] py-2 text-md font-bold text-[var(--forest)] shadow-lg shadow-[var(--forest)]/15"
      >
        Continue
        <LuArrowRight className="size-6" aria-hidden="true" />
      </button>
    </main>
  );
}


export function EntryCustomer({
  setCustomer,
  customer,
}: EntryProps) {

  const {selectedTrigger, isSelectedTrigger} = useEntryForm();
  // const [selectedTrigger, isSelectedTrigger] = useState(false);

  return (
    <section className="" aria-labelledby="entry-customer-heading">
      <div className="flex w-full items-center gap-3 rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-5 py-3 text-left shadow-sm transition-colors focus-within:border-[var(--forest)]">
        <span
          className={`grid size-10 shrink-0 place-items-center rounded-xl text-lg font-extrabold bg-[#e2ecd7] text-[var(--forest)]`}
        >
          {(customer?.name.at(0) ?? "S") + (customer?.name.at(1) ?? "C")}
        </span>
        <span className="text-lg font-extrabold text-[var(--ink)] flex-1">{customer?.name ?? "Select customer"}</span>
        <div className="flex items-center justify-center size-10">
          <LuChevronDown
          className="size-7 shrink-0 text-[#758477]"
          aria-hidden="true"
          onClick={() => isSelectedTrigger((prev) => !prev)}
        />
        </div>
      </div>

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
                {entryCustomers.map((entryCustomer) => (
                  <button
                    key={entryCustomer.name}
                    type="button"
                    onClick={() => {
                      setCustomer?.(entryCustomer);
                      isSelectedTrigger(false);
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-[#e1e7dc] bg-[#fffef9] px-4 py-3 text-left transition-colors active:bg-[#e8eddd]"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-[#d9e8c5] text-sm font-extrabold text-[var(--forest)]">
                      {entryCustomer.image}
                    </span>
                    <span className="font-bold">{entryCustomer.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )
      }
    </section>
  );
}

export function EntryAmount({
  setAmount,
  setEntryType,
  entryType,
  amount,
}: EntryProps) {

  const [direction, setDirection] = useState(1);

  const selectEntryType = (nextType: 0 | 1) => {
    // setDirection(nextType > entryType ? 1 : -1);
    setEntryType?.(nextType);
  };

  if (entryType === undefined || amount === undefined) {
    return null;
  }

  const [whole, decimal] = amount?.[entryType].split(".");
  const display =
    (whole ? Number(whole).toLocaleString("en-NG") : "0") +
    (decimal !== undefined ? `.${decimal}` : "");

  return (
    <section className="mt-7" aria-labelledby="entry-amount-heading">
      <div className="flex rounded-3xl bg-[#e8eee1]">
        <button
          type="button"
          onClick={() => selectEntryType(0)}
          aria-pressed={entryType === 0}
          className={`flex flex-1 items-center justify-center gap-3 rounded-2xl py-2 text-md font-bold ${
            entryType === 0
            ? "bg-[var(--forest)] font-bold text-[var(--surface)] shadow-md shadow-[var(--forest)]/15"
              : "text-[#758178]"
          }`}
        >
          <LuWalletCards className="size-5" aria-hidden="true" />
          Paid
        </button>
        <button
          type="button"
          onClick={() => selectEntryType(1)}
          aria-pressed={entryType === 1}
          className={`flex flex-1 items-center justify-center gap-3 rounded-2xl py-2 text-md font-bold ${
            entryType === 1
              ? "bg-[var(--forest)] font-bold text-[var(--surface)] shadow-md shadow-[var(--forest)]/15"
              : "text-[#758178]"
          }`}
        >
          <LuHandCoins className="size-5" aria-hidden="true" />
          Dues
        </button>
      </div>

      <div>
        <div className="mt-5 text-center">
          <p
            id="entry-amount-heading"
            className="flex items-baseline justify-center gap-2 text-4xl font-extrabold leading-none tracking-tight text-[var(--forest)]"
          >
            <span className="text-2xl text-[#719151]">₦</span>
            {display}
          </p>
          <p className="mt-3 text-base text-[var(--muted)]">
            {entryType === 0
              ? "Money received from Tunde"
              : "Money due from Tunde"}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3" aria-label="Amount keypad">
          {numbers.map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => pressKey(number, setAmount, entryType)}
              aria-label={number === "back" ? "Delete last digit" : number}
              className={`grid h-9 place-items-center rounded-lg border border-[#e1e7dc] text-2xl font-bold text-[var(--ink)] shadow-sm transition-colors active:bg-[#e8eddd] ${
                number === "."
                  ? "bg-[#eef2e8]"
                  : number === "back"
                    ? "bg-[#f4e9d9] text-[#98745b]"
                    : "bg-[var(--surface)]"
              }`}
            >
              {number === "back" ? (
                <LuDelete className="size-6" aria-hidden="true" />
              ) : (
                number
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
