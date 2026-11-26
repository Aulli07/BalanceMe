import type { TransactionMonth } from "@/features/transactions/data/txn-stuff";

import {
  LuArrowDownLeft,
  LuCreditCard,
  LuChartNoAxesCombined,
  LuCircleDollarSign,
  LuReceiptText,
  LuShoppingBag,
} from "react-icons/lu";

export const ANALYTICS_PERIODS = [
  { id: "TODAY", label: "Today" },
  { id: "YESTERDAY", label: "Yesterday" },
  { id: "7D", label: "7 days" },
  { id: "14D", label: "14 days" },
  { id: "30D", label: "30 days" },
] as const;

export type AnalyticsPeriod = (typeof ANALYTICS_PERIODS)[number]["id"];
export type AnalyticsSelection = AnalyticsPeriod | TransactionMonth;

export const ANALYTICS_CARDS = [
  {
    key: "received",
    label: "Total received",
    icon: LuArrowDownLeft,
    color: "bg-[var(--forest)] text-[var(--lime)]",
  },
  {
    key: "owed",
    label: "Total owed",
    icon: LuCircleDollarSign,
    color: "bg-[#fff8e9] text-[#855126]",
  },
  {
    key: "purchaseAmountPaid",
    label: "Initial amount paid",
    icon: LuCreditCard,
    color: "bg-[#e9f1df] text-[var(--forest)]",
  },
  {
    key: "totalPurchasePrice",
    label: "Total purchase price",
    icon: LuShoppingBag,
    color: "bg-[var(--surface)] text-[var(--forest)]",
  },
  {
    key: "rate",
    label: "Collection rate",
    icon: LuChartNoAxesCombined,
    color: "bg-[#e9f1df] text-[var(--forest)]",
  },
  {
    key: "count",
    label: "Transactions",
    icon: LuReceiptText,
    color: "bg-[var(--surface)] text-[var(--forest)]",
  },
] as const;