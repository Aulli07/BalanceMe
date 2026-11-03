import { ReminderChannel } from "./types";

export function normalizeNigerianPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("234")) return digits;
  return `234${digits.replace(/^0+/, "")}`;
}


export function channelLabel(channel: ReminderChannel) {
  return channel === "whatsapp"
    ? "WhatsApp"
    : channel === "sms"
      ? "SMS"
      : "Email";
}