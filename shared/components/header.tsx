import { LuBot, LuBell } from "react-icons/lu"

export function Header() {
  return (
    <header className="w-full bg-[var(--paper)]">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Open BalanceMe AI chat"
            className="relative grid h-12 place-items-center rounded-full bg-transparent text-[var(--forest-dark)] transition-transform duration-150 active:scale-95"
          >
            <LuBot className="h-6 w-6" strokeWidth={1.8} />
          </button>
        </div>

        <div
          aria-label="BalanceMe"
          className="flex h-12 items-center justify-center gap-2 whitespace-nowrap text-[var(--forest-dark)]"
        >
          <span className="grid size-7 place-items-center rounded-[10px] bg-[var(--forest)] px-1 text-base font-black tracking-[-1px] text-[var(--lime)]">
            b .
          </span>
          <span className="text-md font-black tracking-[-0.55px]">BalanceMe</span>
        </div>

        <div className="flex items-center">
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid h-12 place-items-center rounded-full bg-transparent text-[var(--forest-dark)] transition-transform duration-150 active:scale-95"
          >
            <LuBell className="h-6 w-6" strokeWidth={1.8} />
            <span className="absolute right-0 top-3 h-2 w-2 rounded-full border border-[var(--paper)] bg-[#acd953]" />
          </button>
        </div>
      </div>
    </header>
  )
}