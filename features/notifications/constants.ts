export const notificationFilters = ["All", "Paid", "Owed", "Analytics"] as const;

export type NotificationFilter = (typeof notificationFilters)[number];
