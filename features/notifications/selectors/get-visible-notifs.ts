import type { Notification } from "@/shared/types/domain";
import type { NotificationFilter } from "../constants";

export function getVisibleNotifications(
  notifications: Notification[],
  activeFilter: NotificationFilter,
  query: string,
) {
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
}
