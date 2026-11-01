export const ANALYTICS_PERIODS = [
  { id: "TODAY", label: "Today" },
  { id: "7D", label: "7D" },
  { id: "30D", label: "30D" },
] as const;

export type AnalyticsPeriod = (typeof ANALYTICS_PERIODS)[number]["id"];
