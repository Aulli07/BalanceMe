export type PulseIconName = "chart" | "receipt" | "customer" | "overdue";

export type PulseData = {
  title: string;
  amount: string;
  detail: string;
  trend?: string;
  bgColor: string;
  elementColor: string;
  borderColor: string;
  icon: PulseIconName;
};

export const businessPulses: PulseData[] = [
  {
    title: "A good week",
    amount: "₦1,482,300",
    detail: "You brought in",
    trend: "+12.4% more than last week",
    bgColor: "bg-[#eef5df]",
    elementColor: "text-[#568044]",
    borderColor: "border-[#dce8c4]",
    icon: "chart",
  },
  {
    title: "You stayed active",
    amount: "38 transactions",
    detail: "You recorded",
    trend: "+8 more than last week",
    bgColor: "bg-[#e6f1ee]",
    elementColor: "text-[#2e7663]",
    borderColor: "border-[#c5e1d8]",
    icon: "receipt",
  },
  {
    title: "Your customers are growing",
    amount: "32 customers",
    detail: "This week, you sold to",
    // trend: "3 more repeat customers",
    bgColor: "bg-[#e9edfa]",
    elementColor: "text-[#526ba8]",
    borderColor: "border-[#cbd5f0]",
    icon: "customer",
  },
  {
    title: "Keep an eye on Adaeze",
    amount: "₦28,500",
    detail: "Adaeze owes you",
    trend: "Overdue for 12 days",
    bgColor: "bg-[#fcebe6]",
    elementColor: "text-[#b4614f]",
    borderColor: "border-[#f0cfc7]",
    icon: "overdue",
  },
];
