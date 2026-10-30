import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export function CustomerDetailHeader() {
  return (
    <header className="flex items-center justify-between">
      <Link
        href="/customers"
        className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]"
      >
        <LuArrowLeft className="size-4" />
        Customers
      </Link>
    </header>
  );
}

