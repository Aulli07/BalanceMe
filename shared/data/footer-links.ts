import type { ComponentType, ReactNode } from "react";
import { LuWallet, LuHouse, LuUser, LuUsersRound, LuPlus } from "react-icons/lu";

type IconLike = ComponentType<{ className?: string }>;

type FooterType = {
  to: string;
  lightIcon: IconLike;
  darkIcon: IconLike;
  alt: string;
  title: string;
  width: number;
  height: number;
  header?: string;
};

export const footerLinks: FooterType[] = [
  {
    to: "/",
    lightIcon: LuHouse,
    darkIcon: LuHouse,
    alt: "home-icon",
    title: "Home",
    width: 4,
    height: 4,
  },
  {
    to: "/transactions",
    lightIcon: LuWallet,
    darkIcon: LuWallet,
    alt: "compare-icon",
    title: "Transactions",
    width: 4,
    height: 4,
  },
  {
    to: "/add",
    lightIcon: LuPlus,
    darkIcon: LuPlus,
    alt: "posts-icon",
    title: "Add",
    width: 4,
    height: 4,
  },
  {
    to: "/customers",
    lightIcon: LuUsersRound,
    darkIcon: LuUsersRound,
    alt: "profile-icon",
    title: "Customers",
    width: 4,
    height: 4,
  },
  {
    to: "/profile",
    lightIcon: LuUser,
    darkIcon: LuUser,
    alt: "insights-icon",
    title: "Profile",
    width: 4,
    height: 4,
  },
];

export default footerLinks;
