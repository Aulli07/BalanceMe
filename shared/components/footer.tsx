"use client";

import { useEffect, useState, type ReactNode } from "react";
import footerLinks from "@/shared/data/footer-links";
import { usePathname } from "next/navigation";
import Link from "next/link";

export function Footer() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  const normalizePath = (p: string) =>
    p.length > 1 ? p.replace(/\/+$/, "") : p;
  const current = normalizePath(pathname);
  const isActive = (to: string) => {
    const target = normalizePath(to);
    if (target === "/") return current === "/";
    return current === target || current.startsWith(target + "/");
  };

  return (
    <footer className="mt-auto px-6 w-full border-t border-[#e8eeff] bg-[#f6f6ee]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full justify-between items-center pb-2 pt-3"
      >
        {footerLinks.map((link) => {
          // const isActive = Boolean(item.active);
          const active = isActive(link.to);
          const isAddButton = link.title === "Add";

          if (isAddButton) {
            return (
              <Link
                href={link.to}
                key={link.title}
                type="button"
                aria-label={link.title}
                className="-mt-2 grid h-15 w-15 place-items-center justify-self-center rounded-full border-[4px] border-[#f6f6ee] bg-[#123d2b] text-[#cbf36a] shadow-[0_6px_15px_rgba(29,70,39,0.2)] transition-transform active:scale-95"
              >
                {link.lightIcon && <link.lightIcon className="h-8 w-8" />}
              </Link>
            );
          }

          return (
            <Link
              href={link.to}
              key={link.title}
              type="button"
              aria-label={link.title}
              className={[
                "relative flex flex-col items-center justify-center gap-1 rounded-none bg-transparent py-[3px] text-[rgb(135,146,135)] transition-colors",
                active && "text-[#123d2b] before:absolute before:-top-1 before:h-[3px] before:w-[27px] before:rounded-full before:bg-[#5e8542] before:content-['']",
              ].join(" ")}
            >
              <span className="sr-only">{link.title}</span>
              <span className="flex items-center justify-center">{link.lightIcon && <link.lightIcon className="h-6 w-6" />}</span>
            </Link>
          );
        })}
      </nav>
    </footer>
  );
}