"use client";

import { createPortal } from "react-dom";
import { LuCircleAlert } from "react-icons/lu";

export function FullPaymentError({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5"
      onClick={onClose}
    >
      <section
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="full-payment-error-title"
        className="w-full max-w-sm rounded-2xl bg-[var(--surface)] px-5 py-6 text-center text-[var(--ink)] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <LuCircleAlert className="mx-auto size-10 text-[#81502f]" />
        <h2
          id="full-payment-error-title"
          className="mt-3 text-lg font-extrabold"
        >
          This is already fully paid
        </h2>
        <p className="mt-2 text-sm font-medium text-[#607568]">
          Amount paid cannot be equal to or greater than the product price.
          Reduce the amount paid or increase the product price.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 w-full rounded-xl bg-[var(--forest)] px-4 py-3 text-sm font-extrabold text-[var(--surface)]"
        >
          Okay
        </button>
      </section>
    </div>,
    document.body,
  );
}
