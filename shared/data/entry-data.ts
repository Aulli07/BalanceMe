import { LuArrowRight, LuCircleDollarSign, LuHandCoins } from "react-icons/lu";

export const entryOptions = [
  {
    title: "Sale",
    description: "Record a sale the customer will pay for later.",
    href: "/add-entry?mode=sale",
    icon: LuCircleDollarSign,
  },
  {
    title: "Repayment",
    description: "Record money received toward an existing debt.",
    href: "/add-entry?mode=repayment",
    icon: LuHandCoins,
  },
  {
    title: "Sale plus repayment",
    description: "Record a sale and the amount paid today together.",
    href: "/add-entry?mode=sale-repayment",
    icon: LuArrowRight,
  },
];