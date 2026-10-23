import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export function TransactionDetailsHeader() {
  return (
    <header className="flex items-center gap-3 px-5 pt-5">
      <Link
        href="/transactions"
        aria-label="Back to transactions"
        className="grid size-9 place-items-center rounded-full text-[var(--forest)]"
      >
        <LuArrowLeft className="size-5" aria-hidden="true" />
      </Link>
      <h1 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
        Transaction details
      </h1>
    </header>
  );
}
