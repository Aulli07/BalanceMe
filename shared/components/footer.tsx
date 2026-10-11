"use client";

import { useEffect, useState, type ReactNode } from "react";
import footerLinks from "@/shared/data/footer-links";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AddEntry } from "./add-entry";

export function Footer() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [ open, setOpen ] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const normalizePath = (p: string) =>
    p.length > 1 ? p.replace(/\/+$/, "") : p;
  const current = normalizePath(pathname);
  const isActive = (to: string) => {
    const target = normalizePath(to);
    if (target === "/") return current === "/";
    return current === target || current.startsWith(target + "/");
  };

  return (
    <footer className="fixed bottom-0 px-6 w-full border-t border-[#e8eeff] bg-[#f6f6ee]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full justify-between items-center pb-2 pt-3"
      >
        {footerLinks.map((link) => {
          const active = isActive(link.to);
          const isAddButton = link.title === "Add";

          if (isAddButton) {
            return (
              <div> 
                <AddEntry open={open} setOpen={setOpen} />
                <button
                  onClick={() => setOpen(prev => !prev)}
                  type="button"
                  aria-label={link.title}
                  className="-mt-2 grid size-12 place-items-center justify-self-center rounded-2xl border-4 border-[#f6f6ee] bg-[#123d2b] text-[#cbf36a] shadow-lg shadow-[#1d4627]/20 transition-transform active:scale-95"
                >
                  {link.lightIcon && <link.lightIcon className="h-8 w-8 font-bold" />}
                </button>
              </div>
            );
          }
          

          return (
            <Link
              href={link.to}
              key={link.title}
              type="button"
              aria-label={link.title}
              className={[
                "relative flex flex-col items-center justify-center gap-1 rounded-none bg-transparent py-1 text-[#879287] transition-colors",
                active && "text-[#123d2b] before:absolute before:-top-1 before:h-0.5 before:w-7 before:rounded-full before:bg-[#5e8542] before:content-['']",
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