import {
  LuBadgeCheck,
  LuBuilding2,
  LuChevronRight,
  LuCircleHelp,
  LuMessageCircle,
  LuMoon,
  LuShieldCheck,
} from "react-icons/lu";




export function ProfileSections() {
  return (
    <>
      <section className="mt-[19px]" aria-label="BalanceMe membership">
        <button type="button" className="flex min-h-16 w-full items-center gap-2.5 rounded-2xl bg-[var(--forest)] px-3 text-left text-[var(--surface)] shadow-md shadow-[var(--forest)]/10 active:scale-[.985]">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[var(--lime)] text-[var(--forest)]">
            <LuBadgeCheck className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-sm font-extrabold">Go Premium</span>
            <span className="mt-1 block text-[11px] leading-tight text-[#d3e1ca]">More room to grow your business</span>
          </span>
          <span className="rounded-md bg-[#e0f0b9] px-1.5 py-1 text-[9px] font-extrabold uppercase tracking-wide text-[#28452d]">Explore</span>
          <LuChevronRight className="size-5 shrink-0 text-[#d7e6c7]" aria-hidden="true" />
        </button>
      </section>

      <section className="mt-8" aria-labelledby="account-heading">
        <h2 id="account-heading" className="mb-2 px-0.5 text-sm font-bold uppercase tracking-tight text-[#839081]">Your account</h2>
        <div className="overflow-hidden rounded-xl border border-[#e5e9dc] bg-[var(--surface)]/80">
          <SettingRow icon={LuBuilding2} title="Business details" subtitle="Name, contact and business category" />
          <div className="border-t border-[#edf0e7]" />
          <SettingRow icon={LuMoon} title="Change theme" subtitle="Make BalanceMe comfortable for you" value="Light" />
        </div>
      </section>

      <button type="button" className="mt-5 flex min-h-18 w-full items-center gap-2.5 rounded-2xl border border-[#f0ddd5] bg-[#fff0eb] px-3 text-left active:scale-[.99]">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f6dfd7] text-[#865347]">
          <LuMessageCircle className="size-5" aria-hidden="true" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[13px] font-extrabold text-[#70473d]">Message customers who owe</span>
          <span className="mt-1 block text-[11px] leading-tight text-[#936c61]">Review a friendly balance reminder before you decide</span>
        </span>
        <LuChevronRight className="size-5 shrink-0 text-[#a67568]" aria-hidden="true" />
      </button>


      <section className="mt-8" aria-labelledby="help-heading">
        <h2 id="help-heading" className="mb-2 px-0.5 text-sm font-bold uppercase tracking-tight text-[#839081]">Help &amp; information</h2>
        <div className="overflow-hidden rounded-2xl border border-[#e5e9dc] bg-[var(--surface)]/80">
          <SettingRow icon={LuCircleHelp} title="About BalanceMe" subtitle="A clearer picture of your everyday business" />
          <div className="border-t border-[#edf0e7]" />
          <SettingRow icon={LuMessageCircle} title="Help & support" subtitle="Find answers and get a hand when you need it" />
          <div className="border-t border-[#edf0e7]" />
          <SettingRow icon={LuShieldCheck} title="Privacy & data" subtitle="Understand how your records stay yours" />
        </div>
      </section>
    </>
  );
}


function SettingRow({ icon: Icon, title, subtitle, value, message = false }: { icon: typeof LuBuilding2; title: string; subtitle: string; value?: string; message?: boolean }) {
  return (
    <button type="button" className="flex min-h-16 w-full items-center gap-2.5 px-3 py-2 text-left active:bg-[#e8eddd]/60">
      <span className={`grid size-7 shrink-0 place-items-center rounded-[11px] ${message ? "bg-[#f7ebe5] text-[#855145]" : "bg-[#eef3e5] text-[#496a48]"}`}>
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[14px] font-bold leading-tight text-[#294735]">{title}</span>
        <span className="mt-1 block truncate text-[10px] font-medium leading-tight text-[#879185]">{subtitle}</span>
      </span>
      <span className="flex shrink-0 items-center gap-1.5 text-[#96a091]">
        {value && <span className="text-[10px] font-semibold text-[#7a8776]">{value}</span>}
        <LuChevronRight className="size-5" aria-hidden="true" />
      </span>
    </button>
  );
}