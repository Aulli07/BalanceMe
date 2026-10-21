"use client";

import { useMemo, useState } from "react";
import { LuArrowUpRight, LuClock3, LuSearch } from "react-icons/lu";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/current-context";
import { mockNotifications } from "@/shared/data/domain-mock-data";

const filters = ["All", "Paid", "Owed", "Analytics"] as const;

const notifications = mockNotifications.filter(
  (notification) => notification.businessId === ACTIVE_BUSINESS_ID,
);

function formatNotificationTime(createdAt: string) {
  return new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(createdAt));
}

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [query, setQuery] = useState("");

  const visibleNotifications = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesFilter =
        activeFilter === "All" || notification.category === activeFilter;
      const matchesQuery =
        !normalizedQuery ||
        `${notification.title} ${notification.detail}`
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesFilter && matchesQuery;
    });
  }, [activeFilter, query]);

  return (
    <main className="min-h-screen bg-[var(--paper)] pb-24 text-[var(--ink)]">
      <header className="sticky top-0 z-10 bg-[var(--paper)]/95 px-5 pt-6 backdrop-blur-sm">
        <h1 className="text-2xl font-bold tracking-tight text-[var(--forest-dark)]">
          Notification
        </h1>

        <label className="mt-5 flex h-12 items-center gap-2.5 rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-3.5 text-[var(--muted)] shadow-sm shadow-[var(--forest)]/5 focus-within:border-[var(--forest-soft)] focus-within:ring-4 focus-within:ring-[var(--lime)]/20">
          <LuSearch className="size-4.5 shrink-0" aria-hidden="true" />
          <span className="sr-only">Search notifications</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search notifications"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
          />
        </label>

        <div className="grid grid-cols-4 gap-1.5 py-4" role="group" aria-label="Filter notifications">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActiveFilter(filter)}
                className={`h-9 rounded-xl text-xs font-bold transition ${
                  isActive
                    ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm shadow-[var(--forest)]/20"
                    : "text-[var(--muted)] hover:bg-[var(--line)] hover:text-[var(--forest)]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </header>

      <section className="space-y-3 px-5 pb-6" aria-live="polite">
        {visibleNotifications.map((notification) => (
          <article
            key={notification.id}
            className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-sm shadow-[var(--forest)]/5"
          >
            <div className="flex items-start gap-2.5">
              <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-[var(--forest)] text-lg font-extrabold tracking-tighter text-[var(--lime)]">
                b.
              </span>

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-bold leading-tight text-[var(--ink)]">
                    {notification.title}
                  </h2>
                  {notification.unread && (
                    <span className="size-1.5 shrink-0 rounded-full bg-[var(--forest-soft)]" aria-label="New" />
                  )}
                </div>
                <p className="mt-1 text-xs font-medium leading-relaxed text-[var(--muted)]">
                  {notification.detail}
                </p>
              </div>
            </div>

            <div className="ml-10 mt-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs font-semibold text-[var(--muted)]">
                <LuClock3 className="size-3" aria-hidden="true" />
                {formatNotificationTime(notification.createdAt)}
              </span>
              <button
                type="button"
                className="inline-flex h-7 items-center gap-1 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2.5 text-xs font-bold text-[var(--forest)] transition hover:bg-[var(--line)] active:scale-95"
              >
                View
                <LuArrowUpRight className="size-3" aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}

        {visibleNotifications.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] px-5 py-12 text-center">
            <p className="font-bold text-[var(--forest)]">No notifications found</p>
            <p className="mt-1 text-sm text-[var(--muted)]">Try a different search or filter.</p>
          </div>
        )}
      </section>
    </main>
  );
}
