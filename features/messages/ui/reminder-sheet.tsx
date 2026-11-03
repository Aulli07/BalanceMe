"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { LuCalendarDays, LuTrash2, LuX } from "react-icons/lu";
import type { OwingCustomer } from "../types";

interface ReminderSheetProps {
  customer: OwingCustomer | null;
  onClose: () => void;
  onSave: (customerId: string, reminder: OwingCustomer["reminder"]) => void;
}

export function ReminderSheet({
  customer,
  onClose,
  onSave,
}: ReminderSheetProps) {
  const [date, setDate] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setDate(customer?.reminder?.date.slice(0, 10) ?? "");
    setNote(customer?.reminder?.note ?? "");
  }, [customer]);

  if (!customer || typeof document === "undefined") return null;

  const save = () => {
    if (!date) return;
    onSave(customer.id, {
      date: new Date(`${date}T09:00:00`).toISOString(),
      note: note.trim() || undefined,
    });
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end bg-[#10271c]/45"
      onClick={onClose}
      role="presentation"
    >
      <section
        aria-labelledby="reminder-sheet-title"
        className="w-full rounded-t-[2rem] bg-[var(--surface)] px-5 pb-8 pt-3 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto h-1.5 w-14 rounded-full bg-[#dce4d5]" />
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-[var(--muted)]">
              {customer.name}
            </p>
            <h2
              id="reminder-sheet-title"
              className="mt-1 text-2xl font-extrabold tracking-tight"
            >
              Set a reminder
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close reminder sheet"
            className="grid size-10 place-items-center rounded-2xl bg-[#eef3e8] text-[var(--forest)]"
          >
            <LuX className="size-5" />
          </button>
        </div>
        <label
          className="mt-6 block text-xs font-extrabold uppercase tracking-wide text-[var(--muted)]"
          htmlFor="reminder-date"
        >
          Reminder date
        </label>
        <div className="mt-2 flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-[#fffef9] px-4 py-3">
          <LuCalendarDays
            className="size-5 text-[var(--forest)]"
            aria-hidden="true"
          />
          <input
            id="reminder-date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none"
          />
        </div>
        <label
          className="mt-5 block text-xs font-extrabold uppercase tracking-wide text-[var(--muted)]"
          htmlFor="reminder-note"
        >
          Note <span className="normal-case font-medium">(optional)</span>
        </label>
        <textarea
          id="reminder-note"
          rows={2}
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="e.g. Promised to pay on Friday"
          className="mt-2 w-full resize-none rounded-2xl border border-[var(--line)] bg-[#fffef9] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--lime)]"
        />
        <button
          type="button"
          onClick={save}
          disabled={!date}
          className="mt-5 w-full rounded-2xl bg-[var(--forest)] py-3.5 text-sm font-extrabold text-[var(--surface)] disabled:opacity-40"
        >
          Save reminder
        </button>
        {customer.reminder && (
          <button
            type="button"
            onClick={() => {
              onSave(customer.id, undefined);
              onClose();
            }}
            className="mt-3 flex w-full items-center justify-center gap-2 py-2 text-sm font-bold text-[#ad5543]"
          >
            <LuTrash2 className="size-4" />
            Clear reminder
          </button>
        )}
      </section>
    </div>,
    document.body,
  );
}
