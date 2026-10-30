import { LuPhone, LuMessageCircle } from "react-icons/lu";

export function CustomerActions({ phone }: { phone?: string }) {
  return (
    <div className="mt-5 grid grid-cols-2 gap-3">
      <a
        href={phone ? `tel:${phone}` : "#"}
        className="flex items-center justify-center gap-2 rounded-full border border-[var(--forest)] bg-[var(--forest)] py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <LuPhone className="size-4" />
        Call
      </a>
      <a
        href={phone ? `sms:${phone}` : "#"}
        className="flex items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-white py-3 text-sm font-semibold text-[var(--ink)] transition-opacity hover:opacity-90"
      >
        <LuMessageCircle className="size-4" />
        Message
      </a>
    </div>
  );
}

