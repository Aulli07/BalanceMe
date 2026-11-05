"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  LuBellRing,
  LuMail,
  LuMessageSquare,
  LuRotateCcw,
  LuSend,
  LuSmartphone,
} from "react-icons/lu";
import type { OwingCustomer, OwingCustomerCardProps, ReminderChannel } from "../types";
import { formatNaira } from "@/shared/utils/format-naira";
import { getOptionData } from "../data";
import { getInitialsOfName } from "@/shared/utils/get-initials";



const relativeTime = (date: string) => {
  const days = Math.max(
    0,
    Math.floor((Date.now() - +new Date(date)) / 86_400_000),
  );
  return days === 0 ? "today" : `${days} ${days === 1 ? "day" : "days"} ago`;
};

export function OwingCustomerCard({
  customer,
  message,
  channel,
  onMessageChange,
  onChannelChange,
  onReset,
  onSend,
  onReminder,
}: OwingCustomerCardProps) {
  const textarea = useRef<HTMLTextAreaElement>(null);

  const isReminderOverdue = customer.reminder
    ? +new Date(customer.reminder.date) < new Date().setHours(0, 0, 0, 0)
    : false;
  const initials = getInitialsOfName(customer.name);

  useEffect(() => {
    if (!textarea.current) return;
    textarea.current.style.height = "auto";
    textarea.current.style.height = `${Math.min(textarea.current.scrollHeight, 54)}px`;
  }, [message]);

  const options = getOptionData(customer);

  return (
    <article className="overflow-hidden rounded-[1.4rem] border border-[#e2e8da] bg-[var(--surface)] p-4 shadow-sm shadow-[#23452c]/5">
      <div className="flex min-w-0 items-start gap-3">
        {customer.avatarUrl ? (
          <Image
            src={customer.avatarUrl}
            width={44}
            height={44}
            alt=""
            className="size-11 shrink-0 rounded-2xl object-cover"
          />
        ) : (
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#e6f0d6] text-sm font-extrabold text-[var(--forest)]">
            {initials}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <Link
            href={`/customers/${customer.id}`}
            className="block truncate text-[15px] font-extrabold text-[var(--ink)] underline-offset-2 hover:underline"
          >
            {customer.name}
          </Link>
          <p className="mt-1 text-[11px] font-medium text-[var(--muted)]">
            Owing since {relativeTime(customer.owingSince)}
          </p>
        </div>
        <p className="max-w-[42%] shrink-0 truncate text-right text-base font-extrabold text-[#a34e3d]">
          {formatNaira(customer.owedAmount)}
        </p>
      </div>

      {customer.reminder && (
        <div
          className={`mt-3 flex gap-2 rounded-xl px-3 py-2 text-[11px] font-bold ${isReminderOverdue ? "bg-[#fff0e9] text-[#a9523d]" : "bg-[#f0f5e7] text-[#54714a]"}`}
        >
          <LuBellRing className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span className="min-w-0">
            {isReminderOverdue ? "Reminder overdue · " : "Reminder · "}
            {customer.reminder.note ||
              new Intl.DateTimeFormat("en-NG", {
                weekday: "short",
                day: "numeric",
                month: "short",
              }).format(new Date(customer.reminder.date))}
          </span>
        </div>
      )}

      <fieldset className="mt-4">
        <legend className="sr-only">Send with</legend>
        <div className="flex flex-wrap gap-2">
          {options.map(({ id, label, icon: Icon, available, hint }) => (
            <button
              key={id}
              type="button"
              title={available ? `Send via ${label}` : hint}
              aria-pressed={channel === id}
              disabled={!available}
              onClick={() => onChannelChange(id)}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-extrabold transition ${channel === id && available ? "border-[var(--forest)] bg-[var(--forest)] text-white" : "border-[#dce4d5] bg-[#fafbf6] text-[#637262]"} disabled:cursor-not-allowed disabled:opacity-45`}
            >
              <Icon className="size-3.5" />
              {available ? label : hint}
            </button>
          ))}
        </div>
      </fieldset>

      {!customer.phone && !customer.email ? (
        <div className="mt-4 flex gap-2">
          <Link
            href={`/customers/${customer.id}`}
            className="flex-1 rounded-xl bg-[#fff1eb] px-3 py-2.5 text-center text-xs font-extrabold text-[#9c5848]"
          >
            Add contact details
          </Link>
          <button
            type="button"
            onClick={onReminder}
            className="rounded-xl border border-[#dce5d4] px-3 py-2.5 text-xs font-extrabold text-[#54714a]"
          >
            {customer.reminder ? "Edit reminder" : "Set reminder"}
          </button>
        </div>
      ) : (
        <>
          <div className="mt-4 rounded-xl border border-[#e2e8da] bg-[#fbfcf8] p-2.5 focus-within:ring-2 focus-within:ring-[var(--lime)]">
            <textarea
              ref={textarea}
              aria-label={`Message for ${customer.name}`}
              rows={2}
              value={message}
              onChange={(event) => onMessageChange(event.target.value)}
              className="block max-h-[54px] min-h-[42px] w-full resize-none bg-transparent text-xs leading-relaxed text-[var(--ink)] outline-none"
            />
            <button
              type="button"
              onClick={onReset}
              className="mt-1 flex items-center gap-1 text-[10px] font-extrabold text-[#55744c]"
            >
              <LuRotateCcw className="size-3" />
              Reset template
            </button>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={onSend}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--forest)] py-2.5 text-xs font-extrabold text-[var(--surface)] shadow-sm active:scale-[.98]"
            >
              <LuSend className="size-4" />
              Send
            </button>
            <button
              type="button"
              onClick={onReminder}
              className="rounded-xl border border-[#dce5d4] px-3 py-2.5 text-xs font-extrabold text-[#54714a]"
            >
              {customer.reminder ? "Edit reminder" : "Set reminder"}
            </button>
          </div>
        </>
      )}
      {customer.lastReminded && (
        <p className="mt-3 text-[10px] font-semibold text-[var(--muted)]">
          Last reminded:{" "}
          {customer.lastReminded.channel === "whatsapp"
            ? "WhatsApp"
            : customer.lastReminded.channel.toUpperCase()}
          , {relativeTime(customer.lastReminded.at)}
        </p>
      )}
    </article>
  );
}
