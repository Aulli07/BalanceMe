"use client";

import { Dispatch, SetStateAction, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import Link from "next/link";
import { LiaMicrophoneSolid } from "react-icons/lia";
import { LuArrowRight, LuImagePlus, LuPencilLine, LuX } from "react-icons/lu";
import type { IconType } from "react-icons";

type EntryOption = {
  icon: IconType;
  title: string;
  description: string;
  arrowIcon: IconType;
  iconContainerClassName: string;
  to: string;
};

const entryOptions: EntryOption[] = [
  {
    icon: LuPencilLine,
    title: "Written",
    description: "Type purchases or customer credit",
    arrowIcon: LuArrowRight,
    iconContainerClassName: "bg-[#edf3df] text-[var(--forest)]",
    to: "/add-entry",
  },
  {
    icon: LiaMicrophoneSolid,
    title: "Voice",
    description: "Speak a note, then review and send",
    arrowIcon: LuArrowRight,
    iconContainerClassName: "bg-[#f0f5df] text-[var(--forest)]",
    to: "/add-entry/voice",
  },
  {
    icon: LuImagePlus,
    title: "Screenshot",
    description: "Upload a transfer receipt or invoice",
    arrowIcon: LuArrowRight,
    iconContainerClassName: "bg-[#e8f2e8] text-[#52765c]",
    to: "/add-entry/screenshot",
  },
];

type AddEntryProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function AddEntry({ open, setOpen }: AddEntryProps) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    if (open) document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

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
          <motion.div
            className="w-full rounded-t-[2rem] bg-[var(--surface)] px-5 pb-7 pt-3 text-[var(--ink)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-7 h-1.5 w-16 rounded-full bg-[#dce4d5]" />

            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight">Add an entry</h2>
              <button
                type="button"
                aria-label="Close add entry"
                onClick={() => setOpen(false)}
                className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f0f3eb] text-[#56705d]"
              >
                <LuX className="size-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 grid gap-3">
              {entryOptions.map((entry) => {
                const EntryIcon = entry.icon;
                const ArrowIcon = entry.arrowIcon;

                return (
                  <Link
                    key={entry.title}
                    href={entry.to}
                    onClick={() => setOpen(false)}
                    className="flex min-h-20 items-center gap-4 rounded-3xl border border-[#e1e7dc] bg-[#fffef9] px-4 text-left shadow-sm hover:bg-[#f6f9f1] active:bg-[#e8eddd]"
                  >
                    <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${entry.iconContainerClassName}`}>
                      <EntryIcon className="size-6" aria-hidden="true" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block text-lg font-bold">{entry.title}</span>
                      <span className="mt-0.5 block text-xs leading-tight text-[var(--muted)]">
                        {entry.description}
                      </span>
                    </div>
                    <ArrowIcon className="size-6 shrink-0 text-[#789078]" aria-hidden="true" />
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
