import type { Notification } from "@/shared/types/domain";
import { mockCustomers, mockTransactions } from "@/shared/data/domain-mock-data";

/**
 * Resolves the destination URL for a notification click:
 * - Payment received or purchase made -> transaction receipt (/transactions/:id)
 * - Balance reminder -> customer screen (/customers/:id)
 * - Trend-related/analytics -> transaction analytics page (/transactions/analytics)
 */
export function getNotificationHref(notification: Notification): string {
  // 1. Direct transaction reference (payment received or purchase made)
  if (notification.transactionId) {
    return `/transactions/${notification.transactionId}`;
  }

  // 2. Balance reminder (category Owed or title/detail indicating balance reminder)
  const isBalanceReminder =
    notification.category === "Owed" ||
    /balance|owe|due|reminder/i.test(`${notification.title} ${notification.detail}`);

  if (isBalanceReminder) {
    if (notification.customerId) {
      return `/customers/${notification.customerId}`;
    }

    // Try finding customer referenced in detail
    const matchedCustomer = mockCustomers.find((c) =>
      notification.detail.toLowerCase().includes(c.name.toLowerCase()),
    );
    if (matchedCustomer) {
      return `/customers/${matchedCustomer.id}`;
    }

    return "/customers";
  }

  // 3. Payment received or purchase made without direct transactionId
  const isPaymentOrPurchase =
    notification.category === "Paid" ||
    /payment|purchase|sale|bought|paid|settled|received/i.test(
      `${notification.title} ${notification.detail}`,
    );

  if (isPaymentOrPurchase) {
    const targetCustomerId =
      notification.customerId ||
      mockCustomers.find((c) =>
        notification.detail.toLowerCase().includes(c.name.toLowerCase()),
      )?.id;

    if (targetCustomerId) {
      const customerTxn = mockTransactions.find(
        (t) => t.customerId === targetCustomerId,
      );
      if (customerTxn) {
        return `/transactions/${customerTxn.id}`;
      }
      return `/customers/${targetCustomerId}`;
    }

    return "/transactions";
  }

  // 4. Trend-related / analytics
  const isTrendOrAnalytics =
    notification.category === "Analytics" ||
    /trend|analytics|week|month|summary|performance|revenue|growth/i.test(
      `${notification.title} ${notification.detail}`,
    );

  if (isTrendOrAnalytics) {
    return "/transactions/analytics";
  }

  // 5. Direct customer reference fallback
  if (notification.customerId) {
    return `/customers/${notification.customerId}`;
  }

  return "/transactions";
}

