"use client";

import Image from "next/image";
import { LuArrowRight } from "react-icons/lu";
import type { FormType } from "../hooks/useEntryForm";
import { formatPurchaseDate } from "@/shared/utils/get-time-period";




export function AddEntryTwo({ form }: { form: FormType }) {
  const { setStep } = form;

  return (
    <main className="flex flex-col px-5 pb-20 pt-5">
      <EntryConfirmedDetails
        form={form}
      />
      <EntryDescription
        form={form}
      />
      <button
        type="button"
        onClick={() => setStep(3)}
        className="mt-4 flex w-full items-center justify-center gap-1 rounded-2xl bg-[var(--forest)] px-5 py-3 text-[16px] font-bold text-[var(--surface)]"
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
  // const isRepayment =
  //   entryType === 1 || (entryType === 2 && debtRepaymentMode === 1);

  return (
    <section className="rounded-2xl bg-[var(--forest)] px-5 py-6 text-[var(--surface)] shadow-lg shadow-[var(--forest)]/20">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3 text-center">
          {customer?.avatarUrl ? (
            <Image
              src={customer.avatarUrl}
              alt={`${customer.name}'s profile`}
              width={52}
              height={52}
              className="size-14 rounded-full border-2 border-white/25 object-cover"
            />
          ) : (
            <span className="grid size-13 place-items-center rounded-full bg-[#d9e8c5] font-extrabold text-[var(--forest)]">
              {customer?.name.slice(0, 2).toUpperCase() ?? "SC"}
            </span>
          )}
          <p className="mt-3 truncate text-lg font-extrabold">
            {customer?.name ?? "Select customer"}
          </p>
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

function AmountLabel({
  label,
  value,
  tone = "light",
}: {
  label: string;
  value: number;
  tone?: "light" | "red";
}) {
  const isRed = tone === "red";

  return (
    <div
      className={`rounded-xl px-3 py-2 ${
        isRed ? "bg-[#f7e4d3]" : "bg-white/10"
      }`}
    >
      <p
        className={`text-[10px] font-bold uppercase tracking-wide ${
          isRed ? "text-[#81502f]" : "text-[#d9e8c5]"
        }`}
      >
        {label}
      </p>
      <p
        className={`mt-0.5 text-sm font-extrabold ${
          isRed ? "text-[#81502f]" : "text-[var(--surface)]"
        }`}
      >
        ₦{value.toLocaleString("en-NG")}
      </p>
    </div>
  );
}

function EntryDescription({form} : {form: FormType}) {
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

  // const isRepayment =
  //   entryType === 1 ||
  //   (entryType === 2 && debtRepaymentMode === 1);
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
    </section>
  );
}


