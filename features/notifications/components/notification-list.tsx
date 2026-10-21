import { LuArrowUpRight, LuClock3 } from "react-icons/lu";
import type { Notification } from "@/shared/types/domain";
import { formatNotificationTime } from "../selectors/format-notif-time";

type NotificationListProps = {
  notifications: Notification[];
};

export function NotificationList({ notifications }: NotificationListProps) {
  return (
    <section className="space-y-3 px-5 pb-6" aria-live="polite">
      {notifications.map((notification) => (
        <article key={notification.id} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 shadow-sm shadow-[var(--forest)]/5">
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
            <time dateTime={notification.createdAt} className="flex items-center gap-1 text-xs font-semibold text-[var(--muted)]">
              <LuClock3 className="size-3" aria-hidden="true" />
              {formatNotificationTime(notification.createdAt)}
            </time>
            <button type="button" className="inline-flex h-7 items-center gap-1 rounded-lg border border-[var(--line)] bg-[var(--paper)] px-2.5 text-xs font-bold text-[var(--forest)] transition hover:bg-[var(--line)] active:scale-95">
              View
              <LuArrowUpRight className="size-3" aria-hidden="true" />
            </button>
          </div>
        </article>
      ))}

      {notifications.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface)] px-5 py-12 text-center">
          <p className="font-bold text-[var(--forest)]">No notifications found</p>
          <p className="mt-1 text-sm text-[var(--muted)]">Try a different search or filter.</p>
        </div>
      )}
    </section>
  );
}
