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

export const customerInitials = [
  { initials: "AM", className: "bg-green-100 text-green-900" },
  { initials: "KO", className: "bg-orange-100 text-orange-900" },
  { initials: "NC", className: "bg-blue-100 text-blue-900" },
  { initials: "EO", className: "bg-amber-100 text-amber-900" },
];
