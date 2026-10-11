"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowRight, LuDelete, LuHandCoins, LuWalletCards } from "react-icons/lu";

export function EntryAmount() {
  const [amount, setAmount] = useState<[string, string]>(["0", "0"]);
  const [entryType, setEntryType] = useState<0 | 1>(0);
  const [direction, setDirection] = useState(1);

  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "back"];

  const pressKey = (key: string) => {
    setAmount((currentAmount) => {
      const nextAmount = [...currentAmount] as [string, string];
      const previous = nextAmount[entryType];

      if (key === "back") {
        nextAmount[entryType] = previous.length > 1 ? previous.slice(0, -1) : "0";
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
    setDirection(nextType > entryType ? 1 : -1);
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
              ? "bg-[var(--forest)] text-[var(--surface)] shadow-md shadow-[var(--forest)]/15"
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
                className={`grid h-10 place-items-center rounded-xl border border-[#e1e7dc] text-2xl font-bold text-[var(--ink)] shadow-sm transition-colors active:bg-[#e8eddd] ${
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
