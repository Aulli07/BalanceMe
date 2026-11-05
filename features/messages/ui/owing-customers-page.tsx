"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LuArrowLeft, LuSearch, LuUsersRound } from "react-icons/lu";
import { useOwingCustomers } from "../hooks/use-owing-customers";
import type { OwingCustomer, OwingSort, ReminderChannel } from "../types";
import { OwingCustomerCard } from "./owing-customer-card";
import { ReminderSheet } from "./reminder-sheet";
import { formatNaira } from "@/shared/utils/format-naira";
import { channelLabel, normalizeNigerianPhone } from "../utils";



export function OwingCustomersPage() {
  const router = useRouter();

  const [sort, setSort] = useState<OwingSort>("amount");
  const [query, setQuery] = useState("");
  const [reminderCustomer, setReminderCustomer] =
    useState<OwingCustomer | null>(null);
  const [toast, setToast] = useState("");

  const {
    businessName,
    customers,
    messages,
    totalOwedAmount,
    getSortedCustomers,
    updateMessage,
    setChannel,
    resetMessage,
    saveReminder,
    recordReminder,
  } = useOwingCustomers();

  const visibleCustomers = useMemo(
    () => getSortedCustomers(sort, query),
    [getSortedCustomers, query, sort],
  );

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2600);
  };

  const sendMessage = (customer: OwingCustomer) => {
    const state = messages[customer.id];
    if (!state) return;
    const { channel, message } = state;
    let url: string | null = null;

    if (channel === "whatsapp" && customer.phone) {
      url = `https://wa.me/${normalizeNigerianPhone(customer.phone)}?text=${encodeURIComponent(message)}`;
    } else if (channel === "sms" && customer.phone) {
      url = `sms:${customer.phone.replace(/\s/g, "")}?body=${encodeURIComponent(message)}`;
    } else if (channel === "email" && customer.email) {
      url = `mailto:${customer.email}?subject=${encodeURIComponent(`Payment reminder from ${businessName}`)}&body=${encodeURIComponent(message)}`;
    }

    if (!url) {
      showToast(
        `Add ${channel === "email" ? "an email address" : "a phone number"} first.`,
      );
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
    recordReminder(customer.id, channel);
    showToast(`Opening ${channelLabel(channel)}…`);
  };

  return (
    <main className="min-h-screen bg-[var(--paper)] pb-28 text-[var(--ink)]">
      <header className="px-5 pt-5">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Back to profile"
            className="grid size-10 place-items-center rounded-2xl bg-[var(--surface)] text-[var(--forest)] shadow-sm active:scale-95"
          >
            <LuArrowLeft className="size-5" />
          </button>
          <h1 className="text-xl font-extrabold tracking-tight">
            Message customers
          </h1>
        </div>
        <section
          className="mt-5 overflow-hidden rounded-[1.65rem] bg-[var(--forest)] px-5 py-5 text-[var(--surface)] shadow-lg shadow-[#123d2b]/15"
          aria-label="Customers owing summary"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-[#c7e2b0]">
            Outstanding balances
          </p>
          <div className="mt-2 flex items-end justify-between gap-3">
            <p className="min-w-0 truncate text-3xl font-extrabold tracking-tight">
              {formatNaira(totalOwedAmount)}
            </p>
            <span className="mb-1 flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold">
              <LuUsersRound className="size-3.5" />
              {customers.length}{" "}
              {customers.length === 1 ? "customer" : "customers"}
            </span>
          </div>
        </section>
      </header>

      <section className="px-5 pt-5" aria-label="Customer filters">
        <label className="flex items-center gap-2 rounded-xl border border-[#dfe6d8] bg-[var(--surface)] px-3 py-2.5 focus-within:ring-2 focus-within:ring-[var(--lime)]">
          <LuSearch className="size-4 text-[var(--muted)]" />
          <span className="sr-only">Search customers</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name"
            className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:font-medium placeholder:text-[var(--muted)]"
          />
        </label>
        <div
          className="mt-3 flex gap-2 overflow-x-auto pb-1"
          role="group"
          aria-label="Sort customers"
        >
          {(
            [
              ["amount", "Amount owed"],
              ["oldest", "Oldest debt"],
              ["name", "Name"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setSort(value)}
              aria-pressed={sort === value}
              className={`shrink-0 rounded-full px-3 py-2 text-[11px] font-extrabold ${sort === value ? "bg-[#dcecc9] text-[var(--forest)]" : "bg-[var(--surface)] text-[var(--muted)] ring-1 ring-[#dfe6d8]"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      <section className="px-5 pb-2 pt-4" aria-live="polite">
        {customers.length === 0 ? (
          <div className="mt-10 rounded-[1.75rem] border border-dashed border-[#d6e1cd] bg-[var(--surface)] px-6 py-10 text-center">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#e9f3dc] text-2xl">
              ✦
            </span>
            <h2 className="mt-4 text-lg font-extrabold">
              Nobody owes you right now
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
              You’re all caught up. New outstanding balances will appear here.
            </p>
          </div>
        ) : visibleCustomers.length === 0 ? (
          <p className="py-10 text-center text-sm font-semibold text-[var(--muted)]">
            No customers match “{query}”.
          </p>
        ) : (
          <div className="space-y-3">
            {visibleCustomers.map((customer) => (
              <OwingCustomerCard
                key={customer.id}
                customer={customer}
                message={messages[customer.id]?.message ?? ""}
                channel={messages[customer.id]?.channel ?? "whatsapp"}
                onMessageChange={(message) =>
                  updateMessage(customer.id, message)
                }
                onChannelChange={(channel) => setChannel(customer.id, channel)}
                onReset={() => resetMessage(customer)}
                onSend={() => sendMessage(customer)}
                onReminder={() => setReminderCustomer(customer)}
              />
            ))}
          </div>
        )}
      </section>

      <ReminderSheet
        customer={reminderCustomer}
        onClose={() => setReminderCustomer(null)}
        onSave={saveReminder}
      />
      {toast && (
        <div
          role="status"
          className="fixed inset-x-5 bottom-22 z-[60] mx-auto w-fit max-w-[calc(100%-2.5rem)] rounded-full bg-[#173a2b] px-4 py-2.5 text-xs font-bold text-white shadow-xl"
        >
          {toast}
        </div>
      )}
    </main>
  );
}
