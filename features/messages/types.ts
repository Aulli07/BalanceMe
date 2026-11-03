import type { Customer, CustomerLastReminded, CustomerReminder } from "@/shared/types/domain";

export type ReminderChannel = CustomerLastReminded["channel"];
export type OwingSort = "amount" | "oldest" | "name";

export type OwingCustomer = Customer & {
  owedKobo: number;
  owingSince: string;
  reminder?: CustomerReminder;
  lastReminded?: CustomerLastReminded;
};

export type CustomerMessageState = Record<
  string,
  { channel: ReminderChannel; message: string }
>;

export interface OwingCustomerCardProps {
  customer: OwingCustomer;
  message: string;
  channel: ReminderChannel;
  onMessageChange: (message: string) => void;
  onChannelChange: (channel: ReminderChannel) => void;
  onReset: () => void;
  onSend: () => void;
  onReminder: () => void;
}
