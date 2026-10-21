import { LuBadgeCheck, LuUserRound } from "react-icons/lu";
import { CURRENT_BUSINESS, CURRENT_USER } from "@/shared/data/current-context";

export function ProfileIntro() {
  const initials = CURRENT_USER.fullName
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <section className="flex items-center gap-3 rounded-2xl border border-[#e3e9d8] bg-[var(--paper)] px-4 py-4" aria-label="Business profile">
      <div className="relative z-10 grid size-16 shrink-0 place-items-center rounded-2xl border-[3px] border-[#f7f8f0] bg-[#e2ecd7] text-2xl font-extrabold tracking-tight text-[var(--forest)] shadow-sm">
        {initials}
      </div>
      <div className="relative z-10 min-w-0 flex-1">
        <p className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.08em] text-[#788872]">
          <LuBadgeCheck className="size-3 text-[#7b9a4b]" aria-hidden="true" />
          Your business profile
        </p>
        <p className="truncate text-xl font-extrabold leading-tight tracking-tight text-[#244431]">
          {CURRENT_USER.fullName}
        </p>
        <p className="mt-1 truncate text-[13px] font-semibold text-[#5d705e]">
          {CURRENT_BUSINESS?.name ?? "Your business"}
        </p>
        <p className="mt-1.5 truncate text-[10px] font-medium text-[#899486]">
          {CURRENT_BUSINESS?.category ?? "Business"}
          <span aria-hidden="true"> · </span>
          {CURRENT_BUSINESS?.phone ?? CURRENT_USER.phone ?? "No phone number"}
        </p>
      </div>
      <button type="button" className="relative z-10 grid size-10 shrink-0 place-items-center rounded-[10px] border border-[#e5eadc] bg-[#f7f8f1] text-[#536c4b]" aria-label="Edit profile">
        <LuUserRound className="size-6" aria-hidden="true" />
      </button>
    </section>
  );
}
