import { formatNaira } from "@/shared/utils/format-naira";

export function getWhatsAppHref(name: string, phone: string | undefined, owedKobo: number) {
  const digits = phone?.replace(/\D/g, "") ?? "";
  const recipient = digits.startsWith("0") ? `234${digits.slice(1)}` : digits;
  const firstName = name.trim().split(/\s+/)[0] ?? "there";
  const message = encodeURIComponent(
    `Hi ${firstName}, a friendly reminder that your outstanding balance is ${formatNaira(owedKobo)}. Thank you.`,
  );

  return recipient
    ? `https://wa.me/${recipient}?text=${message}`
    : `https://wa.me/?text=${message}`;
}


export function getOwingAgeLabel(oldestOutstandingAt: string) {
  const days = Math.max(
    0,
    Math.floor((Date.now() - new Date(oldestOutstandingAt).getTime()) / 86_400_000),
  );

  return days === 0
    ? "Added today"
    : `Owing ${days} ${days === 1 ? "day" : "days"}`;
}