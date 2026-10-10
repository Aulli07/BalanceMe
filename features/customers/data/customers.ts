export type Customer = {
  name: string;
  initials: string;
  transactions: number;
  owing?: string;
  avatarColor: string;
};

export const customers: Customer[] = [
  {
    name: "Mariam Bello",
    initials: "MB",
    transactions: 18,
    owing: "₦12,500",
    avatarColor: "bg-[#e2ecd7] text-[var(--forest)]",
  },
  {
    name: "Chika Okafor",
    initials: "CO",
    transactions: 12,
    avatarColor: "bg-[#f2e3d8] text-[#805644]",
  },
  {
    name: "Tunde Adeyemi",
    initials: "TA",
    transactions: 9,
    owing: "₦35,000",
    avatarColor: "bg-[#e0e9ed] text-[#456076]",
  },
  {
    name: "Amina Yusuf",
    initials: "AY",
    transactions: 21,
    avatarColor: "bg-[#f2eccf] text-[#79652e]",
  },
  {
    name: "Emeka Nwosu",
    initials: "EN",
    transactions: 7,
    owing: "₦4,800",
    avatarColor: "bg-[#e9e2ec] text-[#665372]",
  },
];
