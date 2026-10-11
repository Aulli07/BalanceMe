"use client";

import { customerType } from "@/app/add-entry/page";
import { Dispatch, SetStateAction, useState } from "react";
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

export function AddEntryOne({
  setCustomer,
  customer,
  setStep,
  setAmount,
  setEntryType,
}: {
  setCustomer: Dispatch<SetStateAction<customerType | undefined>>;
  customer: customerType | undefined;
  setStep: Dispatch<SetStateAction<1 | 2>>;
  setAmount: Dispatch<SetStateAction<[string, string]>>;
  setEntryType: Dispatch<SetStateAction<1 | 0>>;
}) {
  const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "0",
    "back",
  ];

  return (
    <main className="px-5 pt-5">
      <EntryCustomer setCustomer={setCustomer} customer={customer} />
      <EntryAmount setAmount={setAmount} setEntryType={setEntryType} />
    </main>
  );
}

export function EntryCustomer({
  setCustomer,
  customer,
}: {
  setCustomer: Dispatch<SetStateAction<customerType | undefined>>;
  customer: customerType | undefined;
}) {
  return (
    <section className="px-5 pt-5" aria-labelledby="entry-customer-heading">
      <button
        type="button"
        className="flex w-full items-center gap-4 rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-5 py-3 text-left shadow-sm transition-colors active:bg-[#f0f4ea]"
        aria-label={`Change customer, currently ${customer?.name ?? ""}`}
      >
        <span
          className={`grid size-12 shrink-0 place-items-center rounded-xl text-xl font-extrabold bg-[#e2ecd7] text-[var(--forest)]`}
        >
          {(customer?.name.at(0) ?? "S") + (customer?.name.at(1) ?? "C")}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xl font-extrabold text-[var(--ink)]">
            {customer?.name ?? "Select Customer"}
          </span>
        </span>
        <LuChevronDown
          className="size-7 shrink-0 text-[#758477]"
          aria-hidden="true"
        />
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

export function EntryAmount() {
  const [amount, setAmount] = useState<[string, string]>(["0", "0"]);
  const [entryType, setEntryType] = useState<0 | 1>(0);
  const [direction, setDirection] = useState(1);

  const numbers = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "0",
    "back",
  ];

  const pressKey = (key: string) => {
    setAmount((currentAmount) => {
      const nextAmount = [...currentAmount] as [string, string];
      const previous = nextAmount[entryType];

      if (key === "back") {
        nextAmount[entryType] =
          previous.length > 1 ? previous.slice(0, -1) : "0";
        return nextAmount;
      }
      if (key === ".") {
        if (previous.includes(".")) return currentAmount;
        nextAmount[entryType] = previous === "" ? "0." : previous + ".";
        return nextAmount;
      }
      if (previous === "0") {
        nextAmount[entryType] = key;
        return nextAmount;
      }
      if (previous.replace(".", "").length >= 10) return currentAmount;
      nextAmount[entryType] = previous + key;
      return nextAmount;
    });
  };

  const selectEntryType = (nextType: 0 | 1) => {
    // setDirection(nextType > entryType ? 1 : -1);
    setEntryType(nextType);
  };

  const [whole, decimal] = amount[entryType].split(".");
  const display =
    (whole ? Number(whole).toLocaleString("en-NG") : "0") +
    (decimal !== undefined ? `.${decimal}` : "");

  return (
    <section className="mt-7 px-5" aria-labelledby="entry-amount-heading">
      <div className="flex rounded-3xl bg-[#e8eee1]">
        <button
          type="button"
          onClick={() => selectEntryType(0)}
          aria-pressed={entryType === 0}
          className={`flex flex-1 items-center justify-center gap-3 rounded-2xl py-2 text-md font-bold ${
            entryType === 0
              ? "bg-black-500 text-[var(--surface)] shadow-md shadow-[var(--forest)]/15"
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
              ? "bg-[var(--forest)] text-[var(--surface)] shadow-md shadow-[var(--forest)]/15"
              : "text-[#758178]"
          }`}
        >
          <LuHandCoins className="size-5" aria-hidden="true" />
          Dues
        </button>
      </div>

      {/* <AnimatePresence initial={false} mode="wait" custom={direction}>
        <motion.div
          key={entryType}
          custom={direction}
          initial={{ x: direction * 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 360, damping: 30 }}
          className="overflow-hidden"
        > */}
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
              onClick={() => pressKey(number)}
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

        <button
          type="button"
          className="mt-5 flex w-full items-center justify-center gap-4 rounded-xl bg-[var(--forest)] py-2 text-xl font-bold text-[var(--surface)] shadow-lg shadow-[var(--forest)]/15"
        >
          Continue
          <LuArrowRight className="size-6" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
