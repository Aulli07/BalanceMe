import {
  LuChartNoAxesCombined,
  LuCircleDollarSign,
  LuReceiptText,
  LuUserRoundSearch,
} from "react-icons/lu";
import type { PulseIcon } from "@/features/dashboard/types/pulse-entry";


export const pulseIcons = {
  chart: LuChartNoAxesCombined,
  receipt: LuReceiptText,
  customer: LuUserRoundSearch,
  overdue: LuCircleDollarSign,
} satisfies Record<PulseIcon, typeof LuChartNoAxesCombined>;


export const pulseStyles = {
  success: {
    bgColor: "bg-[#eef5df]",
    elementColor: "text-[#568044]",
    borderColor: "border-[#dce8c4]",
  },
  warning: {
    bgColor: "bg-[#fff4df]",
    elementColor: "text-[#a86c1f]",
    borderColor: "border-[#f2ddb7]",
  },
  danger: {
    bgColor: "bg-[#fcebe6]",
    elementColor: "text-[#b4614f]",
    borderColor: "border-[#f0cfc7]",
  },
  neutral: {
    bgColor: "bg-[#e9edfa]",
    elementColor: "text-[#526ba8]",
    borderColor: "border-[#cbd5f0]",
  },
};