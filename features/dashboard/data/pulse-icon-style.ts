import {
  LuChartNoAxesCombined,
  LuCircleDollarSign,
  LuReceiptText,
  LuUserRoundSearch,
} from "react-icons/lu";
import type { PulseIcon, PulseTone } from "@/features/dashboard/types/pulse-entry";

export const pulseIcons = {
  chart: LuChartNoAxesCombined,
  receipt: LuReceiptText,
  customer: LuUserRoundSearch,
  overdue: LuCircleDollarSign,
} satisfies Record<PulseIcon, typeof LuChartNoAxesCombined>;

export type PulseThemeStyle = {
  bgColor: string;
  elementColor: string;
  borderColor: string;
  cardGradient: string;
  badgeBg: string;
  iconBg: string;
  tagLabel: string;
};

export const pulseStyles: Record<PulseTone, PulseThemeStyle> = {
  success: {
    bgColor: "bg-[#f3f9ed]",
    elementColor: "text-[var(--forest)]",
    borderColor: "border-[#cfe3c0]",
    cardGradient: "from-[#f4f9ee] via-[var(--surface)] to-[#eaf4e2]",
    badgeBg: "bg-[#e2f0d7] text-[var(--forest)] border border-[#cbe1be]",
    iconBg: "bg-[var(--forest)] text-[var(--lime)]",
    tagLabel: "Growth",
  },
  warning: {
    bgColor: "bg-[#fefcf3]",
    elementColor: "text-[#92540c]",
    borderColor: "border-[#f2ddb7]",
    cardGradient: "from-[#fefbf2] via-[var(--surface)] to-[#fcf3e1]",
    badgeBg: "bg-[#fceed1] text-[#7a4103] border border-[#f5dcaf]",
    iconBg: "bg-[#92540c] text-amber-100",
    tagLabel: "Attention",
  },
  danger: {
    bgColor: "bg-[#fdf6f4]",
    elementColor: "text-[#9e2a1b]",
    borderColor: "border-[#f1cdc5]",
    cardGradient: "from-[#fdf6f4] via-[var(--surface)] to-[#faece8]",
    badgeBg: "bg-[#fcdcd7] text-[#871f11] border border-[#f7c5bd]",
    iconBg: "bg-[#9e2a1b] text-red-100",
    tagLabel: "Action Required",
  },
  neutral: {
    bgColor: "bg-[#f5f7f2]",
    elementColor: "text-[var(--forest-soft)]",
    borderColor: "border-[var(--line)]",
    cardGradient: "from-[#f5f7f2] via-[var(--surface)] to-[#eef3eb]",
    badgeBg: "bg-[#e5ede0] text-[var(--forest)] border border-[var(--line)]",
    iconBg: "bg-[var(--forest-soft)] text-[var(--lime)]",
    tagLabel: "Milestone",
  },
};
