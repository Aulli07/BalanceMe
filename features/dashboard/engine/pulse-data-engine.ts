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


import type { PulseDisplayData, PulseEntry, PulsePriority, PulseValues } from "@/features/dashboard/types/pulse-entry";
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

    return createPulse(entry, formatNaira(maxAmount), {
      customerName: customerOwed.name,
      amount: formatNaira(maxAmount),
    });
  }


  if (entry.condition === "customers-have-outstanding-debt") {
    const { count } = getTotalCustomersOwing(businessId);
    const totalOwedKobo = getTotalAmountOwed(businessId);
    if (count === 0 || totalOwedKobo <= 0) return null;

    return createPulse(entry, formatNaira(totalOwedKobo), {
      customerCount: count,
      amount: formatNaira(totalOwedKobo),
    });
  }


  if (entry.condition === "category-is-strongest-selling") {
    const result = getStrongestSellingCategory(businessId);
    if (!result) return null;

    return createPulse(entry, formatNaira(result.totalKobo), {
      categoryName: result.category.name,
      amount: formatNaira(result.totalKobo),
    });
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
    );
  }


  if (entry.condition === "largest-sale-recorded") {
    const result = getLargestSale(businessId);
    if (!result) return null;

    return createPulse(entry, formatNaira(result.sale.totalKobo), {
      customerName: result.customer.name,
      amount: formatNaira(result.sale.totalKobo),
    });
  }


  if (entry.condition === "no-sales-recorded-today") {
    if (!getNoSalesToday(businessId)) return null;
    return createPulse(entry, "No sales", {});
  }


  if (entry.condition === "new-customer-added") {
    const customer = getNewestCustomer(businessId);
    if (!customer) return null;

    return createPulse(entry, customer.name, { customerName: customer.name });
  }


  if (entry.condition === "customer-cleared-balance") {
    const result = getCustomerWithClearedBalance(businessId);
    if (!result) return null;

    return createPulse(entry, formatNaira(result.totalKobo), {
      customerName: result.customer.name,
      amount: formatNaira(result.totalKobo),
    });
  }


  if (entry.condition === "recording-streak-achieved") {
    const dayCount = getRecordingStreak(businessId);
    if (dayCount < 2) return null;

    return createPulse(entry, `${dayCount} days`, { dayCount });
  }

  return null;
}

function createPulse(
  entry: PulseEntry,
  amount: string,
  values: PulseValues,
  trend?: string,
): PulseDisplayData {
  return {
    id: entry.id,
    priority: entry.priority,
    tone: entry.tone,
    title: fillTemplate(entry.title, values),
    amount,
    detail: fillTemplate(entry.messageTemplate, values),
    trend,
    ...pulseStyles[entry.tone],
    icon: entry.icon,
  };
}

function fillTemplate(template: string, values: PulseValues) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
}

function getPriorityRank(priority: PulsePriority) {
  return { high: 3, medium: 2, low: 1 }[priority];
}

