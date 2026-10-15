export type Customer = {
  id: string;
  name: string;
  initials: string;
  transactions: number;
  owing: boolean;
  avatarColor: string;
};

export const customers: Customer[] = [
  {
    id: "12449",
    name: "Mariam Bello",
    initials: "MB",
    transactions: 18,
    owing: true,
    avatarColor: "bg-[#e2ecd7] text-[var(--forest)]",
  },
  {
    id: "1234",
    name: "Chika Okafor",
    initials: "CO",
    transactions: 12,
    owing: false,
    avatarColor: "bg-[#f2e3d8] text-[#805644]",
  },
  {
    id: "30029",
    name: "Tunde Adeyemi",
    initials: "TA",
    transactions: 9,
    owing: true,
    avatarColor: "bg-[#e0e9ed] text-[#456076]",
  },
  {
    id: "12090",
    name: "Amina Yusuf",
    initials: "AY",
    transactions: 21,
    owing: false,
    avatarColor: "bg-[#f2eccf] text-[#79652e]",
  },
  {
    id: "33212",
    name: "Emeka Nwosu",
    initials: "EN",
    transactions: 7,
    owing: true,
    avatarColor: "bg-[#e9e2ec] text-[#665372]",
  },
];

export const customerInitials = [
  { initials: "AM", className: "bg-green-100 text-green-900" },
  { initials: "KO", className: "bg-orange-100 text-orange-900" },
  { initials: "NC", className: "bg-blue-100 text-blue-900" },
  { initials: "EO", className: "bg-amber-100 text-amber-900" },
];
