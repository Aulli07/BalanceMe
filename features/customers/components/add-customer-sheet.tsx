"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { LuX, LuUser, LuPhone, LuMail, LuImagePlus } from "react-icons/lu";
import {
  validateCustomerInput,
  addCustomer,
} from "../selectors/add-customer";

interface AddCustomerSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCustomerAdded?: () => void;
}

export function AddCustomerSheet({
  open,
  setOpen,
  onCustomerAdded,
}: AddCustomerSheetProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  if (typeof document === "undefined") return null;

  function resetForm() {
    setName("");
    setPhone("");
    setEmail("");
    setError(null);
    setSaving(false);
  }

  function handleClose() {
    resetForm();
    setOpen(false);
  }

  function handleSubmit() {
    const validationError = validateCustomerInput({ name, phone, email });
    if (validationError) {
      setError(validationError);
      return;
    }

    setSaving(true);
    setError(null);

    addCustomer({ name, phone, email });
    resetForm();
    setOpen(false);
    onCustomerAdded?.();
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
        >
          <motion.div
            className="w-full rounded-t-[2rem] bg-[var(--surface)] px-5 pb-7 pt-3 text-[var(--ink)]"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="mx-auto mb-7 h-1.5 w-16 rounded-full bg-[#dce4d5]" />

            {/* Title row */}
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Add a customer
              </h2>
              <button
                type="button"
                aria-label="Close"
                onClick={handleClose}
                className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f0f3eb] text-[#56705d]"
              >
                <LuX className="size-5" />
              </button>
            </div>

            {/* Form fields */}
            <div className="mt-5 grid gap-4">
              {/* Name */}
              <FormField
                icon={<LuUser className="size-[18px]" />}
                label="Customer name"
                placeholder="e.g. Mariam Bello"
                value={name}
                onChange={setName}
                required
              />

              {/* Phone */}
              <FormField
                icon={<LuPhone className="size-[18px]" />}
                label="Phone number"
                placeholder="+234 801 234 5678"
                value={phone}
                onChange={setPhone}
                type="tel"
              />

              {/* Email */}
              <FormField
                icon={<LuMail className="size-[18px]" />}
                label="Email address"
                placeholder="customer@example.com"
                value={email}
                onChange={setEmail}
                type="email"
              />

              {/* Avatar placeholder */}
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-[var(--line)] px-4 py-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f0f3eb] text-[#56705d]">
                  <LuImagePlus className="size-[18px]" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">
                    Customer photo
                  </p>
                  <p className="text-[11px] text-[var(--muted)]">
                    Optional · tap to upload
                  </p>
                </div>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
            )}

            {/* Submit button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="mt-6 w-full rounded-full bg-[var(--forest)] py-3.5 text-base font-bold text-white transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-50"
            >
              {saving ? "Adding…" : "Add customer"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function FormField({
  icon,
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#e1e7dc] bg-[#fffef9] px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[var(--forest)]/30">
      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#edf3df] text-[var(--forest)]">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <label className="block text-[11px] font-bold uppercase tracking-wide text-[var(--muted)]">
          {label}
          {required && <span className="text-red-400"> *</span>}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-0.5 w-full bg-transparent text-sm font-semibold text-[var(--ink)] outline-none placeholder:text-[var(--muted)]/50"
        />
      </div>
    </div>
  );
}
