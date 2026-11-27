"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { LuCheck, LuChevronDown } from "react-icons/lu";
import { mockSaleTransactions } from "@/shared/data/domain-mock-data";
import { getOwedDetailsOfTransaction } from "@/shared/selectors/txn-owe-getters";
import type { SaleTransaction } from "@/shared/types/domain";
import { FormType } from "../types/entry-type";
import { isWithinMaxAmountDigits } from "../utils/amount-input";



export function RepaymentEntry({ form }: { form: FormType }) {
  const [open, setOpen] = useState(false);
  const {
    customer,
    amountRepaid,
    setAmountRepaid,
    selectedPurchases,
    setSelectedPurchases,
  } = form;

  const currentSelectedPurchases = selectedPurchases.filter(
    (purchase) => purchase.customerId === customer?.id,
  );
  const purchases = mockSaleTransactions.filter(
    (purchase) =>
      purchase.customerId === customer?.id &&
      getOwedDetailsOfTransaction(purchase).outstandingAmount > 0,
  );
  const originalOwed = currentSelectedPurchases.reduce(
    (total, purchase) =>
      total + getOwedDetailsOfTransaction(purchase).outstandingAmount,
    0,
  );
  const amountOwed = Math.max(originalOwed - (Number(amountRepaid) || 0), 0);

  return (
    <section className="mt-6">
      <div className="overflow-hidden rounded-[1.25rem] border border-[#e5e9df] bg-[var(--surface)] shadow-sm shadow-[var(--forest)]/5">
        <div className="border-b border-[#e9ede5] bg-[#f3f7ed] px-4 py-3">
          <p className="text-sm font-extrabold text-[var(--forest)]">
            Debt repayment
          </p>
          <p className="mt-0.5 text-xs font-medium text-[#607568]">
            Record money received toward an existing purchase.
          </p>
        </div>
        <div className="px-4 py-4">
          <label
            className="flex items-center justify-between gap-4"
            htmlFor="entry-amount-received"
          >
            <span className="text-base font-bold text-[#53705f]">
              Amount received
            </span>
            <input
              id="entry-amount-received"
              type="number"
              min="0"
              value={amountRepaid}
              onFocus={(event) => event.currentTarget.select()}
              onChange={(event) => {
                const value = event.target.value;
                if (isWithinMaxAmountDigits(value)) setAmountRepaid(value);
              }}
              className="w-40 appearance-none bg-transparent text-right text-[28px] font-extrabold leading-none tracking-tight text-[var(--forest)] outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </label>
        </div>
      </div>

      <div className="mt-6 grid gap-3">
        <p className="px-1 text-sm font-extrabold text-[var(--ink)]">
          Which purchases are being repaid?
        </p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={!customer}
          className="flex w-full items-center justify-between gap-4 rounded-xl border border-[#e4e9df] bg-[var(--surface)] px-5 py-4 text-left shadow-sm shadow-[var(--forest)]/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {currentSelectedPurchases.length > 0 ? (
            <span className="font-bold text-[var(--ink)]">
              {currentSelectedPurchases.length} purchase
              {currentSelectedPurchases.length === 1 ? "" : "s"} selected
            </span>
          ) : (
            <span className="font-bold text-[#758477]">
              {customer ? "Select a purchase" : "Select a customer first"}
            </span>
          )}
          <LuChevronDown
            className="size-5 shrink-0 text-[#758477]"
            aria-hidden="true"
          />
        </button>
      </div>

      <p
        id="entry-amount-heading"
        className="mt-3 rounded-xl bg-[#f7e4d3] px-4 py-2 text-center text-[14px] font-bold text-[#81502f]"
      >
        {customer?.name ?? "This customer"} will still owe {"\u20A6"}
        {amountOwed.toLocaleString("en-NG")} after this.
      </p>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-end bg-black/30"
            onClick={() => setOpen(false)}
          >
            <div
              className="w-full rounded-t-[2rem] bg-[var(--surface)] px-5 pb-8 pt-4 text-[var(--ink)] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-[#dce4d5]" />
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-extrabold">Select purchases</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[#eef3e8] px-3 py-1 text-sm font-bold text-[var(--forest)]"
                >
                  Close
                </button>
              </div>
              <div className="grid max-h-[60dvh] gap-3 overflow-y-auto">
                {purchases.length ? (
                  purchases.map((purchase) => (
                    <PurchaseSelection
                      key={purchase.id}
                      purchase={purchase}
                      selected={currentSelectedPurchases.some(
                        (selected) => selected.id === purchase.id,
                      )}
                      onToggle={() => {
                        setSelectedPurchases((current) => {
                          const customerPurchases = current.filter(
                            (selected) => selected.customerId === customer?.id,
                          );
                          return customerPurchases.some(
                            (selected) => selected.id === purchase.id,
                          )
                            ? customerPurchases.filter(
                                (selected) => selected.id !== purchase.id,
                              )
                            : [...customerPurchases, purchase];
                        });
                      }}
                    />
                  ))
                ) : (
                  <p className="rounded-2xl bg-[#f4f7f0] px-4 py-5 text-center text-sm text-[var(--muted)]">
                    No outstanding purchases for this customer.
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="mt-4 w-full rounded-xl bg-[var(--forest)] px-4 py-3 font-bold text-[var(--surface)]"
              >
                Done
              </button>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}

function PurchaseSelection({
  purchase,
  selected,
  onToggle,
}: {
  purchase: SaleTransaction;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`flex w-full items-start justify-between gap-3 rounded-2xl border p-4 text-left transition-colors ${
        selected
          ? "border-[var(--forest)] bg-[#e8eddd]"
          : "border-[#e1e7dc] bg-[#fffef9] active:bg-[#e8eddd]"
      }`}
    >
      <PurchasePreview purchase={purchase} isShowInfo={true} />
      {selected && (
        <LuCheck
          className="mt-1 size-5 shrink-0 text-[var(--forest)]"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

function PurchasePreview({
  purchase,
  isShowInfo,
}: {
  purchase: SaleTransaction;
  isShowInfo: boolean;
}) {
  const price = purchase.sale.productPrice;
  const owed = getOwedDetailsOfTransaction(purchase).outstandingAmount;
  const paid = price - owed;

  return (
    <div className="flex flex-col gap-1">
      <span className="block truncate font-extrabold text-[var(--ink)]">
        {purchase.sale.description}
      </span>
      {isShowInfo && (
        <span className="block text-sm font-semibold text-[#607568]">
          Price {"\u20A6"}
          {price.toLocaleString("en-NG")} · Paid {"\u20A6"}
          {paid.toLocaleString("en-NG")}
        </span>
      )}
      <span className="shrink-0 w-fit rounded-full bg-[#f7e4d3] px-2.5 py-1 text-xs font-extrabold text-[#81502f]">
        Owes {"\u20A6"}
        {owed.toLocaleString("en-NG")}
      </span>
    </div>
  );
}
