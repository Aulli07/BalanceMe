import { getCashRecordedAmount } from "@/features/dashboard/selectors/get-cash-recorded";
import {
  getLargestCustomerOwe,
  getTotalAmountOwed,
  getTotalCustomersOwing,
} from "@/features/dashboard/selectors/get-customers-owing";
import { getCustomerWithClearedBalance } from "@/features/dashboard/selectors/get-cleared-balance";
import { getLargestSale } from "@/features/dashboard/selectors/get-largest-sale";
import { getNewestCustomer } from "@/features/dashboard/selectors/get-newest-customer";
import { getNoSalesToday } from "@/features/dashboard/selectors/get-no-sales-today";
import { getRecordingStreak } from "@/features/dashboard/selectors/get-recording-streak";
import { getSalesTrend } from "@/features/dashboard/selectors/get-sales-trend";
import { getStrongestSellingCategory } from "@/features/dashboard/selectors/get-selling-category";

import type {
  PulseDisplayData,
  PulseEntry,
  PulsePriority,
  PulseValues,
} from "@/features/dashboard/types/pulse-entry";
import { formatNaira, parseNairaToKobo } from "@/shared/utils/format-naira";
import { pulseStyles } from "../data/pulse-icon-style";



export function getPulseDisplayData(
  pulseEntries: PulseEntry[],
  businessId: string,
) {
  return pulseEntries
    .map((entry) => getPulseData(entry, businessId))
    .filter((pulse): pulse is PulseDisplayData => pulse !== null)
    .sort((first, second) => getPriorityRank(second.priority) - getPriorityRank(first.priority));
}

function getPulseData(entry: PulseEntry, businessId: string): PulseDisplayData | null {
  if (entry.condition === "customer-has-largest-outstanding-debt") {
    const { customerOwed, maxAmount } = getLargestCustomerOwe(businessId);
    if (!customerOwed || maxAmount <= 0) return null;

    return createPulse(
      entry,
      formatNaira(maxAmount),
      {
        customerName: customerOwed.name,
        amount: formatNaira(maxAmount),
      },
      undefined,
      { href: `/customers/${customerOwed.id}`, label: "Follow up" },
      "Debt Alert",
      "OWES",
    );
  }

  if (entry.condition === "customers-have-outstanding-debt") {
    const { count } = getTotalCustomersOwing(businessId);
    const totalOwedKobo = getTotalAmountOwed(businessId);
    if (count === 0 || totalOwedKobo <= 0) return null;

    return createPulse(
      entry,
      formatNaira(totalOwedKobo),
      {
        customerCount: count,
        amount: formatNaira(totalOwedKobo),
      },
      undefined,
      { href: "/customers", label: "View owing" },
      "Pending Balance",
      "TOTAL",
    );
  }

  if (entry.condition === "category-is-strongest-selling") {
    const result = getStrongestSellingCategory(businessId);
    if (!result) return null;

    return createPulse(
      entry,
      formatNaira(result.totalKobo),
      {
        categoryName: result.category.name,
        amount: formatNaira(result.totalKobo),
      },
      undefined,
      { href: "/transactions/analytics", label: "View analytics" },
      "Top Category",
      "BROUGHT IN",
    );
  }

  if (
    entry.condition === "sales-exceed-previous-period" ||
    entry.condition === "sales-are-below-previous-period"
  ) {
    const trend = getSalesTrend(businessId);
    const isGrowing = trend.differenceKobo > 0;
    const isDeclining = trend.differenceKobo < 0;

    if (
      (entry.condition === "sales-exceed-previous-period" && !isGrowing) ||
      (entry.condition === "sales-are-below-previous-period" && !isDeclining)
    ) {
      return null;
    }

    return createPulse(
      entry,
      formatNaira(trend.currentTotalKobo),
      { amount: formatNaira(Math.abs(trend.differenceKobo)) },
      `${isGrowing ? "+" : "-"}${formatNaira(Math.abs(trend.differenceKobo))} vs previous 7 days`,
      { href: "/transactions/analytics", label: "View sales trend" },
      isGrowing ? "Sales Surge" : "Sales Dip",
      "MADE",
    );
  }

  if (
    entry.condition === "cash-recorded-exceeds-previous-period" ||
    entry.condition === "cash-recorded-is-below-previous-period"
  ) {
    const todayAmount = getCashRecordedAmount(businessId, "today");
    const yesterdayAmount = getCashRecordedAmount(businessId, "yesterday");
    const differenceKobo =
      parseNairaToKobo(todayAmount) - parseNairaToKobo(yesterdayAmount);
    const isGrowing = differenceKobo > 0;
    const isDeclining = differenceKobo < 0;

    if (
      (entry.condition === "cash-recorded-exceeds-previous-period" && !isGrowing) ||
      (entry.condition === "cash-recorded-is-below-previous-period" && !isDeclining)
    ) {
      return null;
    }

    return createPulse(
      entry,
      todayAmount,
      { amount: formatNaira(Math.abs(differenceKobo)) },
      `${isGrowing ? "+" : "-"}${formatNaira(Math.abs(differenceKobo))} vs yesterday`,
      { href: "/transactions/analytics", label: "View cash flow" },
      isGrowing ? "Cash Inflow" : "Cash Watch",
      "MADE",
    );
  }

  if (entry.condition === "largest-sale-recorded") {
    const result = getLargestSale(businessId);
    if (!result) return null;

    return createPulse(
      entry,
      formatNaira(result.sale.totalKobo),
      {
        customerName: result.customer.name,
        amount: formatNaira(result.sale.totalKobo),
      },
      undefined,
      { href: `/transactions/${result.sale.id}`, label: "View receipt" },
      "Record Sale",
      "MADE",
    );
  }

  if (entry.condition === "no-sales-recorded-today") {
    if (!getNoSalesToday(businessId)) return null;
    return createPulse(
      entry,
      "No sales",
      {},
      undefined,
      { href: "/add-entry", label: "Record sale" },
      "Daily Check",
      "STATUS",
    );
  }

  if (entry.condition === "new-customer-added") {
    const customer = getNewestCustomer(businessId);
    if (!customer) return null;

    return createPulse(
      entry,
      customer.name,
      { customerName: customer.name },
      undefined,
      { href: `/customers/${customer.id}`, label: "View profile" },
      "New Customer",
      "NAME",
    );
  }

  if (entry.condition === "customer-cleared-balance") {
    const result = getCustomerWithClearedBalance(businessId);
    if (!result) return null;

    return createPulse(
      entry,
      formatNaira(result.totalKobo),
      {
        customerName: result.customer.name,
        amount: formatNaira(result.totalKobo),
      },
      undefined,
      { href: `/customers/${result.customer.id}`, label: "View customer" },
      "Balance Cleared",
      "CLEARED",
    );
  }

  if (entry.condition === "recording-streak-achieved") {
    const dayCount = getRecordingStreak(businessId);
    if (dayCount < 2) return null;

    return createPulse(
      entry,
      `${dayCount} days`,
      { dayCount },
      undefined,
      { href: "/transactions", label: "View activity" },
      "Habit Streak",
      "STREAK",
    );
  }

  return null;
}

function createPulse(
  entry: PulseEntry,
  amount: string,
  values: PulseValues,
  trend?: string,
  action?: { href: string; label: string },
  customTagLabel?: string,
  metricLabel?: string,
): PulseDisplayData {
  const toneStyle = pulseStyles[entry.tone];

  return {
    id: entry.id,
    category: entry.category,
    priority: entry.priority,
    tone: entry.tone,
    title: fillTemplate(entry.title, values),
    amount,
    trend,
    bgColor: toneStyle.bgColor,
    elementColor: toneStyle.elementColor,
    borderColor: toneStyle.borderColor,
    cardGradient: toneStyle.cardGradient,
    badgeBg: toneStyle.badgeBg,
    iconBg: toneStyle.iconBg,
    tagLabel: customTagLabel ?? toneStyle.tagLabel,
    metricLabel,
    metricTag: metricLabel,
    icon: entry.icon,
    actionHref: action?.href,
    actionLabel: action?.label,
  };
}

function fillTemplate(template: string, values: PulseValues) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

function getPriorityRank(priority: PulsePriority) {
  return { high: 3, medium: 2, low: 1 }[priority];
}
