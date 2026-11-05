"use client";

import { LuArrowRight, LuChevronDown } from "react-icons/lu";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useState } from "react";

import { useEntryForm } from "../hooks/useEntryForm";
import { EntryProps } from "../types/entry-type";
import {
  mockCustomers,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { SaleTransaction } from "@/shared/types/domain";

export function AddEntryOne({
  setCustomer,
  customer,
  setStep,
  setAmount,
  amount,
  setEntryType,
  entryType,
  selectedPurchase,
  setSelectedPurchase,
}: EntryProps) {
  if (entryType === undefined || amount === undefined) return null;
  const currentPurchase =
    selectedPurchase?.customerId === customer?.id
      ? selectedPurchase
      : undefined;
  const canContinue =
    entryType === 1
      ? Boolean(customer && currentPurchase && Number(amount[1]) > 0)
      : Boolean(customer && Number(amount[0]) > 0);

  return (
    <main className="flex min-h-[calc(100vh-5rem)] flex-col px-5 pb-7 pt-5">
      <EntryCustomer setCustomer={setCustomer} customer={customer} />
      <EntryAmount
        setAmount={setAmount}
        setEntryType={setEntryType}
        entryType={entryType}
        amount={amount}
        customer={customer}
        selectedPurchase={currentPurchase}
        setSelectedPurchase={(purchase) => setSelectedPurchase?.(purchase)}
      />

      <button
        type="button"
        onClick={() => setStep?.(2)}
        disabled={!canContinue}
        className="mt-auto flex w-full items-center justify-center gap-1 rounded-2xl bg-[var(--forest)] px-5 py-3 text-[16px] font-bold text-[var(--surface)] shadow-lg shadow-[var(--forest)]/15 transition-all hover:bg-[var(--forest-dark)] active:scale-[.98] disabled:cursor-not-allowed disabled:bg-[var(--forest)]/80 disabled:text-[var(--surface)]/90 disabled:shadow-none"
      >
        Continue
        <LuArrowRight className="size-5" aria-hidden="true" />
      </button>
    </main>
  );
}

export function EntryCustomer({ setCustomer, customer }: EntryProps) {
  const { selectedTrigger, isSelectedTrigger } = useEntryForm();

  return (
    <section aria-labelledby="entry-customer-heading">
      <button
        type="button"
        onClick={() => isSelectedTrigger((prev) => !prev)}
        className="flex min-h-15 w-full items-center justify-between gap-3 rounded-2xl border border-[#e4e9df] bg-[var(--surface)] px-4 text-left shadow-sm shadow-[var(--forest)]/5 transition-colors active:border-[var(--forest)]"
      >
        <span className="flex min-w-0 items-center gap-3">
          {customer ? (
            customer.avatarUrl ? (
              <Image
                src={customer.avatarUrl}
                alt=""
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#d9e8c5] text-sm font-extrabold text-[var(--forest)]">
                {customer.name.slice(0, 2)}
              </span>
            )
          ) : null}
          <span className="truncate text-[17px] font-extrabold text-[var(--ink)]">
            {customer ? customer.name : "Select Customer"}
          </span>
        </span>
        <LuChevronDown
          className="size-6 shrink-0 text-[#758477]"
          aria-hidden="true"
        />
      </button>

      {selectedTrigger &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-end bg-black/30"
            onClick={() => isSelectedTrigger(false)}
          >
            <div
              className="w-full rounded-t-[2rem] bg-[var(--surface)] px-5 pb-8 pt-4 text-[var(--ink)] shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mx-auto mb-5 h-1.5 w-14 rounded-full bg-[#dce4d5]" />
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-extrabold">Select customer</h2>
                <button
                  type="button"
                  onClick={() => isSelectedTrigger(false)}
                  className="rounded-full bg-[#eef3e8] px-3 py-1 text-sm font-bold text-[var(--forest)]"
                >
                  Close
                </button>
              </div>
              <div className="grid gap-2">
                {mockCustomers.map((customer) => (
                  <button
                    key={customer.id}
                    type="button"
                    onClick={() => {
                      setCustomer?.(customer);
                      isSelectedTrigger(false);
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-[#e1e7dc] bg-[#fffef9] px-4 py-3 text-left transition-colors active:bg-[#e8eddd]"
                  >
                    <span className="grid size-10 place-items-center rounded-xl bg-[#d9e8c5] text-sm font-extrabold text-[var(--forest)]">
                      {customer.name.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="font-bold">{customer.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
}

type EntryAmountProps = EntryProps & {
  selectedPurchase?: SaleTransaction;
  setSelectedPurchase: (purchase: SaleTransaction | undefined) => void;
};

export function EntryAmount({
  setAmount,
  setEntryType,
  entryType,
  amount,
  customer,
  selectedPurchase,
  setSelectedPurchase,
}: EntryAmountProps) {
  const [purchasePickerOpen, setPurchasePickerOpen] = useState(false);
  const selectEntryType = (nextType: 0 | 1) => {
    setEntryType?.(nextType);
  };

  if (entryType === undefined || amount === undefined) {
    return null;
  }

  const productPrice = Number(amount[0]) || 0;
  const amountPaid = Number(amount[1]) || 0;
  const amountOwed = Math.max(productPrice - amountPaid, 0);

  return (
    <section className="mt-4" aria-labelledby="entry-amount-heading">
      <div className="flex rounded-2xl bg-[#e1e8dd] p-1">
        <button
          type="button"
          onClick={() => selectEntryType(0)}
          aria-pressed={entryType === 0}
          className={`flex min-h-10 flex-1 items-center justify-center rounded-xl px-2 py-2 text-[15px] font-bold ${
            entryType === 0
              ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm shadow-[var(--forest)]/20"
              : "text-[#57705f]"
          }`}
        >
          Purchase
        </button>
        <button
          type="button"
          onClick={() => selectEntryType(1)}
          aria-pressed={entryType === 1}
          className={`flex min-h-10 flex-1 items-center justify-center rounded-xl px-2 py-2 text-[15px] font-bold ${
            entryType === 1
              ? "bg-[var(--forest)] text-[var(--surface)] shadow-sm shadow-[var(--forest)]/20"
              : "text-[#57705f]"
          }`}
        >
          Debt repayment
        </button>
      </div>

      {entryType === 0 ? (
        <>
          <div className="mt-4 overflow-hidden rounded-[1.25rem] border border-[#e5e9df] bg-[var(--surface)] shadow-sm shadow-[var(--forest)]/5">
            <div className="border-b border-[#e9ede5] bg-[#f3f7ed] px-4 py-3">
              <p className="text-sm font-extrabold text-[var(--forest)]">
                New purchase
              </p>
              <p className="mt-0.5 text-xs font-medium text-[#607568]">
                Record what was sold and what was paid today.
              </p>
            </div>
            <div className="px-4 py-3">
              <label
                className="flex items-center justify-between gap-4 border-b border-[#e9ede5] pb-3"
                htmlFor="entry-product-price"
              >
                <span className="text-base font-bold text-[#53705f]">
                  Product price
                </span>
                <input
                  id="entry-product-price"
                  type="number"
                  value={amount[0]}
                  onFocus={(event) => event.currentTarget.select()}
                  onChange={(event) =>
                    setAmount?.((current) => [event.target.value, current[1]])
                  }
                  className="w-40 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-right text-[28px] font-extrabold leading-none tracking-tight text-[var(--forest)] outline-none placeholder:text-[#9aab9e]"
                />
              </label>

              <label
                className="flex items-center justify-between gap-4 pt-3"
                htmlFor="entry-amount-paid"
              >
                <span className="text-base font-bold text-[#53705f]">
                  Amount paid
                </span>
                <input
                  id="entry-amount-paid"
                  type="number"
                  value={amount[1]}
                  onFocus={(event) => event.currentTarget.select()}
                  onChange={(event) =>
                    setAmount?.((current) => [current[0], event.target.value])
                  }
                  className="w-40 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent text-right text-[28px] font-extrabold leading-none tracking-tight text-[var(--forest)] outline-none placeholder:text-[#9aab9e]"
                />
              </label>
            </div>
          </div>

          <p
            id="entry-amount-heading"
            className="mt-3 rounded-xl bg-[#f7e4d3] px-4 py-2 text-center text-[14px] font-bold text-[#81502f]"
          >
            {"\u20A6"} {amountOwed.toLocaleString("en-NG")} will be added to{" "}
            {customer?.name ?? "this customer"}&apos;s debt
          </p>
        </>
      ) : (
        <RepaymentFields
          amount={amount}
          customerId={customer?.id}
          customerName={customer?.name}
          selectedPurchase={selectedPurchase}
          setAmount={setAmount}
          onSelectPurchase={(purchase) => setSelectedPurchase(purchase)}
          open={purchasePickerOpen}
          setOpen={setPurchasePickerOpen}
        />
      )}
    </section>
  );
}

type RepaymentFieldsProps = {
  amount: [string, string];
  customerId?: string;
  customerName?: string;
  selectedPurchase?: SaleTransaction;
  setAmount?: EntryProps["setAmount"];
  onSelectPurchase: (purchase: SaleTransaction) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

function RepaymentFields({
  amount,
  customerId,
  customerName,
  selectedPurchase,
  setAmount,
  onSelectPurchase,
  open,
  setOpen,
}: RepaymentFieldsProps) {
  const purchases = mockSaleTransactions.filter(
    (purchase) =>
      purchase.customerId === customerId &&
      purchase.amountPaid < purchase.productPrice,
  );
  const originalOwed = selectedPurchase
    ? (selectedPurchase.productPrice - selectedPurchase.amountPaid) / 100
    : 0;
  const amountOwed = Math.max(originalOwed - (Number(amount[1]) || 0), 0);

  return (
    <div className="mt-6">
      <div className="overflow-hidden rounded-[1.25rem] border border-[#e5e9df] bg-[var(--surface)] shadow-sm shadow-[var(--forest)]/5">
        {/* <div className="border-b border-[#e9ede5] bg-[#f3f7ed] px-4 py-3">
          <p className="text-sm font-extrabold text-[var(--forest)]">
            Debt repayment
          </p>
          <p className="mt-0.5 text-xs font-medium text-[#607568]">
            Enter the amount received from this customer.
          </p>
        </div> */}
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
              value={amount[1]}
              onFocus={(event) => event.currentTarget.select()}
              onChange={(event) =>
                setAmount?.((current) => [current[0], event.target.value])
              }
              className="w-40 appearance-none bg-transparent text-right text-[28px] font-extrabold leading-none tracking-tight text-[var(--forest)] outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          </label>
        </div>
      </div>

      <div className="grid gap-3 mt-6">
        <p className="px-1 text-sm font-extrabold text-[var(--ink)]">
          Which purchase is being repaid?
        </p>

        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={!customerId}
          className="flex w-full items-center justify-between gap-4 rounded-xl border border-[#e4e9df] bg-[var(--surface)] px-5 py-4 text-left shadow-sm shadow-[var(--forest)]/5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {selectedPurchase ? (
            <PurchasePreview purchase={selectedPurchase} isShowInfo={false} />
          ) : (
            <span className="font-bold text-[#758477]">
              {customerId ? "Select a purchase" : "Select a customer first"}
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
        {customerName ?? "This customer"} will still owe {"\u20A6"}
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
                <h2 className="text-xl font-extrabold">Select purchase</h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-[#eef3e8] px-3 py-1 text-sm font-bold text-[var(--forest)]"
                >
                  Close
                </button>
              </div>
              <div className="grid gap-3">
                {purchases.length ? (
                  purchases.map((purchase) => (
                    <button
                      key={purchase.id}
                      type="button"
                      onClick={() => {
                        onSelectPurchase(purchase);
                        setOpen(false);
                      }}
                      className="rounded-2xl border border-[#e1e7dc] bg-[#fffef9] p-4 text-left active:bg-[#e8eddd]"
                    >
                      <PurchasePreview purchase={purchase} isShowInfo={true} />
                    </button>
                  ))
                ) : (
                  <p className="rounded-2xl bg-[#f4f7f0] px-4 py-5 text-center text-sm text-[var(--muted)]">
                    No outstanding purchases for this customer.
                  </p>
                )}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function PurchasePreview({ purchase, isShowInfo }: { purchase: SaleTransaction; isShowInfo: boolean }) {
  const price = purchase.productPrice / 100;
  const paid = purchase.amountPaid / 100;
  const owed = Math.max(price - paid, 0);
  const date = new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
  }).format(new Date(purchase.createdAt));
  return (
    <div className="flex flex-col gap-1">
      <span className="block truncate font-extrabold text-[var(--ink)]">
        {purchase.description}
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
