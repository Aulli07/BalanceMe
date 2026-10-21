"use client";

import { useMemo, useState } from "react";
import { NotificationFilters } from "@/features/notifications/components/notification-filters";
import { NotificationList } from "@/features/notifications/components/notification-list";
import { NotificationsHeader } from "@/features/notifications/components/notifications-header";
import { type NotificationFilter } from "@/features/notifications/constants";
import { getVisibleNotifications } from "@/features/notifications/selectors/get-visible-notifs";
import { ACTIVE_BUSINESS_ID } from "@/shared/data/current-context";
import { mockNotifications } from "@/shared/data/domain-mock-data";

const notifications = mockNotifications.filter(
  (notification) => notification.businessId === ACTIVE_BUSINESS_ID,
);

export default function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState<NotificationFilter>("All");
  const [query, setQuery] = useState("");
  const visibleNotifications = useMemo(
    () => getVisibleNotifications(notifications, activeFilter, query),
    [activeFilter, query],
  );

  return (
    <main className="min-h-screen bg-[var(--paper)] pb-24 text-[var(--ink)]">
      <NotificationsHeader query={query} onQueryChange={setQuery} />
      <NotificationFilters
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <NotificationList notifications={visibleNotifications} />
    </main>
  );
}
