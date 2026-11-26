"use client";

import { useState } from "react";
import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";
import { formatPurchaseDate } from "@/shared/utils/get-time-period";
import { AmountLabel } from "../ui/amount-label";
import { FormType } from "../types/entry-type";
import {
  validateEntryDetails,
  type EntryDetailsValidationErrors,
} from "../selectors/can-continue-entry-two";




export function AddEntryTwo({ form }: { form: FormType }) {
  const { setStep } = form;
  const [hasAttemptedComplete, setHasAttemptedComplete] = useState(false);
  const validationErrors = validateEntryDetails(form);
  const hasValidationErrors = Boolean(
    validationErrors.description || validationErrors.receipt,
  );

  return (
    <main className="flex flex-col px-5 pb-20 pt-5">
      <EntryConfirmedDetails
        form={form}
      />
      <EntryDescription
        form={form}
        validationErrors={hasAttemptedComplete ? validationErrors : {}}
      />
      <button
        type="button"
        disabled={hasAttemptedComplete && hasValidationErrors}
        onClick={() => {
          setHasAttemptedComplete(true);
          if (!hasValidationErrors) setStep(3);
        }}
        className="mt-4 flex w-full items-center justify-center gap-1 rounded-2xl bg-[var(--forest)] px-5 py-3 text-[16px] font-bold text-[var(--surface)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        Complete <LuArrowRight className="size-5" aria-hidden="true" />
      </button>
    </main>
  );
}


function EntryConfirmedDetails({form} : {form: FormType}) {
  const {
    customer,
    productPrice,
    amountPaid,
    amountRepaid,
    entryType,
    selectedPurchase,
  } = form;

  const purchasePrice = Number(productPrice || 0);
  const paid = Number(amountPaid || 0);
  const repaid = Number(amountRepaid || 0);
  const amountOwed = Math.max(purchasePrice - paid, 0);
  const repaymentOwed = selectedPurchase
    ? Math.max(
        (selectedPurchase.sale.productPrice - selectedPurchase.sale.amountPaid) -
          repaid,
        0,
      )
    : 0;

  const isRepayment = entryType === 1;
  const isSaleRepayment = entryType === 2;

  const customerNameParts = customer?.name.trim().split(/\s+/) ?? [];
  const firstName = customerNameParts[0] ?? "";
  const lastName = customerNameParts.slice(1).join(" ");

  return (
    <section className="rounded-2xl bg-[var(--forest)] px-5 py-6 text-[var(--surface)] shadow-lg shadow-[var(--forest)]/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {customer?.avatarUrl ? (
            <Image
              src={customer.avatarUrl}
              alt={`${customer.name}'s profile`}
              width={52}
              height={52}
              className="rounded-full border-2 border-white/25 object-cover"
            />
          ) : (
            <span className="grid size-12 place-items-center rounded-full bg-[#d9e8c5] font-extrabold text-[var(--forest)]">
              {customer?.name.slice(0, 2).toUpperCase() ?? "SC"}
            </span>
          )}
          <div className="flex min-w-0 flex-col justify-center">
            {customer ? (
              <>
                <span className="truncate text-lg font-extrabold leading-tight tracking-wide">
                  {firstName}
                </span>
                {lastName && (
                  <span className="truncate text-lg font-extrabold leading-tight tracking-wide">
                    {lastName}
                  </span>
                )}
              </>
            ) : (
              <span className="text-[17px] font-extrabold">
                Select customer
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0 pt-1 text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#d9e8c5]">
            {isRepayment
              ? "Amount repaid"
              : "Amount owed"}
          </p>
          <p className="mt-1 text-2xl font-extrabold">
            ₦{(isRepayment ? repaid : amountOwed).toLocaleString("en-NG")}
          </p>
        </div>
      </div>
      {isRepayment ? (
        <div className="mt-7 flex justify-end gap-2 text-right">
          <AmountLabel
            label="Amount owed"
            value={repaymentOwed}
            tone="red"
          />
        </div>
      ) : (
        <div className="mt-7 flex justify-end gap-2 text-right">
          <AmountLabel label="Product price" value={purchasePrice} />
          <AmountLabel label="Amount paid" value={paid} />
          {isSaleRepayment && <AmountLabel label="Repayment" value={repaymentOwed} />}
        </div>
      )}
    </section>
  );
}


function EntryDescription({
  form,
  validationErrors,
}: {
  form: FormType;
  validationErrors: EntryDetailsValidationErrors;
}) {
  const {
    entryType,
    selectedPurchase,
    description,
    setDescription,
    receipt,
    setReceipt,
  } = form;

  const isSale = entryType === 0;
  const isRepayment = entryType === 1;
  const isSaleRepayment = entryType === 2;


  const purchasePrice = selectedPurchase
    ? selectedPurchase.sale.productPrice
    : 0;
  const purchaseDate = selectedPurchase
    ? formatPurchaseDate(selectedPurchase.createdAt)
    : "";
  
  return (
    <section className="mt-5 flex flex-col gap-4" aria-labelledby="entry-description-heading">
      {(isRepayment || isSaleRepayment) && (
        <div className="grid gap-2 text-sm font-bold text-[var(--ink)]">
          <p>Repayment Note</p>
          <p className="rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-4 py-3 leading-relaxed text-md">
            {selectedPurchase
              ? `For ${selectedPurchase.sale.description}, priced at ₦${purchasePrice.toLocaleString("en-NG")} and bought on ${purchaseDate}`
              : "Select a purchase to add this repayment note."}
          </p>
        </div>
      )} 

      {(isSale || isSaleRepayment) && (
        <label className="grid gap-2 text-sm font-bold text-[var(--ink)]">
          Sale Description
          <textarea
            rows={3}
            value={description ?? ""}
            onChange={(event) => setDescription?.(event.target.value)}
            placeholder="What was this entry for?"
            className="resize-none rounded-xl border border-[#dfe6d9] bg-[var(--surface)] px-4 py-3"
          />
          {validationErrors.description && (
            <p
              id="entry-description-error"
              role="alert"
              className="text-xs font-semibold text-[#a43826]"
            >
              {validationErrors.description}
            </p>
          )}
        </label>
      )}

      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-[#cfd9c8] bg-[var(--surface)] px-4 py-3 text-sm font-bold text-[var(--ink)]">
        <span className="truncate">{receipt?.name ?? "Add receipt"}</span>
        <span className="shrink-0 rounded-full bg-[#eef3e8] px-2.5 py-1 text-xs font-bold text-[#607568]">
          Optional
        </span>
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={(event) => setReceipt?.(event.target.files?.[0])}
          className="sr-only"
        />
      </label>
      {validationErrors.receipt && (
        <p role="alert" className="text-xs font-semibold text-[#a43826]">
          {validationErrors.receipt}
        </p>
      )}
    </section>
  );
}


