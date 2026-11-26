"use client";

import { useState } from "react";

import { EntryCustomer } from "./entry-customer";
import { EntryContinue } from "./entry-continue";

import { getCurrentPurchase } from "../selectors/get-current-purchase";
import { canContinueEntry } from "../selectors/can-continue-entry";

import { DebtEntry } from "./debt-entry";
import { RepaymentEntry } from "./repayment-entry";
import { DebtRepaymentEntry } from "./debt-repayment-entry";
import { FullPaymentError } from "../ui/full-payment-error";
import { FormType } from "../types/entry-type";
import { isFullPayment } from "../utils/check-payment-status";




export function AddEntryOne({ form }: { form: FormType }) {
  const [fullPaymentErrorOpen, setFullPaymentErrorOpen] = useState(false);
  const {
    customer,
    setCustomer,
    productPrice,
    amountPaid,
    amountRepaid,
    setStep,
    entryType,
    debtRepaymentMode,
    selectedPurchase,
  } = form;
  
  const currentPurchase = getCurrentPurchase(customer, selectedPurchase);
  const canContinue = canContinueEntry({
    customer,
    entryType,
    productPrice,
    amountPaid,
    amountRepaid,
    currentPurchase,
  });

  const isPurchase =
    entryType === 0 || (entryType === 2 && debtRepaymentMode === 0);
  // const showFullPaymentError =
  //   isPurchase && isFullPayment(productPrice, amountPaid);


  return (
    <main className="flex min-h-[calc(100vh-5rem)] flex-col px-5 pb-7 pt-5">
      <EntryCustomer setCustomer={setCustomer} customer={customer} />
      {entryType === 2 && <DebtRepaymentEntry form={form} />}
      {entryType === 1 && <RepaymentEntry form={form} />}
      {entryType === 0 && <DebtEntry form={form} />}
      
      <EntryContinue
        setStep={setStep}
        canContinue={canContinue}
        onBlockedContinue={() => setFullPaymentErrorOpen(true)}
      />
      <FullPaymentError
        open={fullPaymentErrorOpen}
        onClose={() => setFullPaymentErrorOpen(false)}
      />
    </main>
  );
}
