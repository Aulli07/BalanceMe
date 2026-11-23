"use client";

import Link from "next/link";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LuArrowRight, LuCircleDollarSign, LuHandCoins, LuX } from "react-icons/lu";

type AddEntryProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const entryOptions = [
  {
    title: "Sale",
    description: "Record a sale the customer will pay for later.",
    href: "/add-entry?mode=sale",
    icon: LuCircleDollarSign,
  },
  {
    title: "Repayment",
    description: "Record money received toward an existing debt.",
    href: "/add-entry?mode=repayment",
    icon: LuHandCoins,
  },
  {
    title: "Sale plus repayment",
    description: "Record a sale and the amount paid today together.",
    href: "/add-entry?mode=sale-repayment",
    icon: LuArrowRight,
  },
];

export function AddEntry({ open, setOpen }: AddEntryProps) {
  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [open, setOpen]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setOpen(false)}
        >
          <motion.section
            aria-labelledby="add-entry-title"
            className="w-full rounded-t-[2rem] bg-[var(--surface)] px-5 pb-7 pt-2 text-[var(--ink)] shadow-2xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-3 h-1.5 w-16 rounded-full bg-[#dce4d5]" />

            <div className="flex items-center justify-between gap-4">
              <h2 id="add-entry-title" className="text-lg font-bold tracking-tight">
                Select a mode
              </h2>
              <button
                type="button"
                aria-label="Close mode selector"
                onClick={() => setOpen(false)}
                className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#f0f3eb] text-[#56705d]"
              >
                <LuX className="size-4" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-3 grid gap-3">
              {entryOptions.map((entry) => {
                const EntryIcon = entry.icon;

                return (
                  <Link
                    key={entry.title}
                    href={entry.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-20 items-center gap-4 rounded-3xl border border-[#e1e7dc] bg-[#fffef9] px-4 text-left shadow-sm transition-colors hover:bg-[#f6f9f1] active:bg-[#e8eddd]"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#edf3df] text-[var(--forest)]">
                      <EntryIcon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-md font-bold">{entry.title}</span>
                      <span className="mt-0.5 block text-xs leading-tight text-[var(--muted)]">
                        {entry.description}
                      </span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
