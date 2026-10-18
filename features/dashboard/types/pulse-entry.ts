export type PulseCategory =
  | "cash-flow"
  | "debt"
  | "sales"
  | "customers"
  | "payments"
  | "milestone"
  | "nudge";

export type PulsePriority = "high" | "medium" | "low";

export type PulseTone = "success" | "warning" | "danger" | "neutral";

export type PulseIcon = "chart" | "receipt" | "customer" | "overdue";

export type PulseCondition =
  | "customer-has-largest-outstanding-debt"
  | "customer-payment-received"
  | "customers-have-outstanding-debt"
  | "category-is-strongest-selling"
  | "sales-exceed-previous-period"
  | "sales-are-below-previous-period"
  | "cash-recorded-exceeds-previous-period"
  | "cash-recorded-is-below-previous-period"
  | "largest-sale-recorded"
  | "no-sales-recorded-today"
  | "new-customer-added"
  | "customer-cleared-balance"
  | "recording-streak-achieved";

export type PulseEntry = {
  id: string;
  category: PulseCategory;
  priority: PulsePriority;
  condition: PulseCondition;
  tone: PulseTone;
  title: string;
  messageTemplate: string;
  icon: PulseIcon;
};


export type PulseDisplayData = {
  id: string;
  priority: PulsePriority;
  tone: PulseTone;
  title: string;
  amount: string;
  detail: string;
  trend?: string;
  bgColor: string;
  elementColor: string;
  borderColor: string;
  icon: PulseIcon;
};

export type PulseValues = Record<string, string | number>;
