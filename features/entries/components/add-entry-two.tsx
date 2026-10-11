"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowRight, LuDelete, LuHandCoins, LuWalletCards } from "react-icons/lu";


export function AddEntryTwo() {
  
}

export function EntryConfirmedDetails() {
  return (
    <main>
      <section className="flex items-center gap-3 rounded-2xl border border-[#e3e9d8] bg-[var(--paper)] px-4 py-4" aria-label="Business profile">
        <div
          className={`grid size-12 shrink-0 place-items-center rounded-xl text-xl font-extrabold ${selectedCustomer.avatarClassName}`}
        >
          AC
        </div>
        <div className="min-w-0 flex-1">
          <span className="block truncate text-xl font-extrabold text-[var(--ink)]">
            Alwell Chukwuka
          </span>
        </div>
        <div className="flex flex-col gap-2 min-w-o">
          <p className="flex items-center gap-1 text-md font-extrabold leading-tight tracking-tight text-[var(--forest)]">
            70000
          </p>
          {true && (
            <span className={`mt-1 flex place-items-center items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-bold leading-none`}>
              {amount[1].includes("Owes") && <LuClock3 className="size-2.5" aria-hidden="true" />}
              {transaction.status}
            </span>
          )}
        </div>
      </section>
    </main>
  )
}