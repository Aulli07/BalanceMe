"use client";

import { EntryCustomer } from "./entry-customer";
import { EntryContinue } from "./entry-continue";

import { getCurrentPurchases } from "../selectors/get-current-purchase";
import { canContinueEntry } from "../selectors/can-continue-entry";

import { DebtEntry } from "./debt-entry";
import { RepaymentEntry } from "./repayment-entry";
import { DebtRepaymentEntry } from "./debt-repayment-entry";
import { FormType } from "../types/entry-type";

export function AddEntryOne({ form }: { form: FormType }) {
  const {
    customer,
    setCustomer,
    productPrice,
    amountPaid,
    amountRepaid,
    setStep,
    entryType,
    selectedPurchases,
  } = form;
  const currentPurchases = getCurrentPurchases(customer, selectedPurchases);
  const validationError = canContinueEntry({
    customer,
    entryType,
    productPrice,
    amountPaid,
    amountRepaid,
    selectedPurchases: currentPurchases,
  });

  return (
    <main className="flex min-h-[calc(100vh-5rem)] flex-col px-5 pb-7 pt-5">
      <EntryCustomer setCustomer={setCustomer} customer={customer} />
      {entryType === 2 && <DebtRepaymentEntry form={form} />}
      {entryType === 1 && <RepaymentEntry form={form} />}
      {entryType === 0 && <DebtEntry form={form} />}

      {validationError && (
        <p role="alert" className="mt-4 text-center text-sm font-semibold text-[#a43826]">
          {validationError}
        </p>
      )}
      <EntryContinue setStep={setStep} canContinue={!validationError} />
    </main>
  );
}
