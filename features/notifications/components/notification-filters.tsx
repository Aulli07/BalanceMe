import { notificationFilters, type NotificationFilter } from "../constants";

type NotificationFiltersProps = {
  activeFilter: NotificationFilter;
  onFilterChange: (filter: NotificationFilter) => void;
};

export function NotificationFilters({ activeFilter, onFilterChange }: NotificationFiltersProps) {
  return (
    <div className="grid grid-cols-4 gap-1.5 px-5 py-4" role="group" aria-label="Filter notifications">
      {notificationFilters.map((filter) => {
        const isActive = activeFilter === filter;

        return (
          <button
            key={filter}
            type="button"
            aria-pressed={isActive}
            onClick={() => onFilterChange(filter)}
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
  );
}
