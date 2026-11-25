import Image from "next/image";
import { LuMail, LuPhone } from "react-icons/lu";
import type { Customer } from "@/shared/types/domain";
import { getInitialsOfName } from "@/shared/utils/get-initials";
import { ContactDetail } from "../ui/contact-detail";

export function CustomerHero({ customer }: { customer: Customer }) {
  const memberSince = new Intl.DateTimeFormat("en-NG", {
    month: "long",
    year: "numeric",
    timeZone: "Africa/Lagos",
  }).format(new Date(customer.createdAt));

  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-[var(--forest)] px-5 py-6 text-white shadow-sm">
      <div className="absolute -right-12 -top-12 size-44 rounded-full border-[18px] border-[var(--lime)]/10" />
      <div className="relative">
        <div className="flex items-start gap-4">
          {customer.avatarUrl ? (
            <Image
              src={customer.avatarUrl}
              alt={customer.name}
              width={96}
              height={96}
              className="size-20 shrink-0 rounded-2xl border-2 border-white/20 object-cover"
            />
          ) : (
            <div className="grid size-20 shrink-0 place-items-center rounded-2xl bg-[var(--lime)] text-xl font-extrabold text-[var(--forest-dark)]">
              {getInitialsOfName(customer.name)}
            </div>
          )}

          <div className="min-w-0 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="truncate text-2xl font-extrabold tracking-tight">
                {customer.name}
              </h1>
              {customer.pinned && (
                <span className="rounded-full bg-[var(--lime)] px-2.5 py-1 text-[11px] font-extrabold text-[var(--forest-dark)]">
                  Pinned
                </span>
              )}
            </div>
            <p className="mt-1 text-sm font-medium text-white/65">
              Customer since {memberSince}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <ContactDetail
            icon={<LuPhone className="size-4" />}
            label="Phone"
            value={customer.phone ?? "Not provided"}
          />
          <ContactDetail
            icon={<LuMail className="size-4" />}
            label="Email"
            value={customer.email ?? "Not provided"}
          />
        </div>
      </div>
    </section>
  );
}
