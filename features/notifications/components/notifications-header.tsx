import { LuSearch } from "react-icons/lu";

type NotificationsHeaderProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

export function NotificationsHeader({ query, onQueryChange }: NotificationsHeaderProps) {
  return (
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
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search notifications"
          className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
        />
      </label>
    </header>
  );
}
