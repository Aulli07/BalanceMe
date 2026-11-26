import {
  ACTIVE_BUSINESS_ID,
  mockReceipts,
  mockRepaymentTransactions,
  mockSaleRepaymentTransactions,
  mockSaleTransactions,
  mockTransactions,
} from "@/shared/data/domain-mock-data";
import type {
  BaseTransaction,
  Receipt,
  RepaymentTransaction,
  SaleRepaymentTransaction,
  SaleTransaction,
  Transaction,
} from "@/shared/types/domain";
import type { FormType } from "../types/entry-type";



export function addEntry(form: FormType): Transaction {
  const now = new Date().toISOString();
  const customerId = form.customer?.id;
  if (!customerId) {
    throw new Error("Cannot add an entry without a customer.");
  }

  const transactionId = getTransactionId(form.entryType);
  const receiptEntry = createReceiptEntry(
    form.receipt,
    transactionId,
    now,
  );

  const baseEntry: BaseTransaction = {
    id: transactionId,
    businessId: ACTIVE_BUSINESS_ID,
    customerId,
    ...(receiptEntry ? { receiptId: receiptEntry.id } : {}),
    createdAt: now,
  };

  const transaction = createEntryForMode(form, baseEntry);
  if (receiptEntry) mockReceipts.push(receiptEntry);
  storeTransaction(transaction);

  return transaction;
}


function getTransactionId(entryType: FormType["entryType"]): string {
  const prefix =
    entryType === 0
      ? "sale"
      : entryType === 1
        ? "repayment"
        : "sale-repayment";

  return `${prefix}-${crypto.randomUUID().slice(0, 10)}`;
}

function createReceiptEntry(
  file: File | undefined,
  transactionId: string,
  createdAt: string,
): Receipt | undefined {
  if (!file) return undefined;

  const id = `receipt-${crypto.randomUUID().slice(0, 10)}`;
  return {
    id,
    businessId: ACTIVE_BUSINESS_ID,
    transactionId,
    fileName: file.name,
    mimeType: file.type,
    sizeBytes: file.size,
    storageKey: `receipts/${ACTIVE_BUSINESS_ID}/${id}`,
    createdAt,
  };
}

function createEntryForMode(
  form: FormType,
  baseEntry: BaseTransaction,
): Transaction {
  if (form.entryType === 0) return createSaleEntry(form, baseEntry);
  if (form.entryType === 1) return createRepaymentEntry(form, baseEntry);
  return createSaleRepaymentEntry(form, baseEntry);
}

function createSaleEntry(
  form: FormType,
  baseEntry: BaseTransaction,
): SaleTransaction {
  return {
    ...baseEntry,
    type: "sale",
    sale: {
      description: form.description,
      productPrice: Number(form.productPrice),
      amountPaid: Number(form.amountPaid),
    },
  };
}

function createRepaymentEntry(
  form: FormType,
  baseEntry: BaseTransaction,
): RepaymentTransaction {
  const selectedPurchase = form.selectedPurchase;
  if (!selectedPurchase) {
    throw new Error("Cannot add a repayment without a selected purchase.");
  }

  const amountRepaid = Number(form.amountRepaid);
  return {
    ...baseEntry,
    type: "repayment",
    amountReceived: amountRepaid,
    allocations: [
      {
        saleTransactionId: selectedPurchase.id,
        debtAmountPaid: amountRepaid,
      },
    ],
  };
}

function createSaleRepaymentEntry(
  form: FormType,
  baseEntry: BaseTransaction,
): SaleRepaymentTransaction {
  const selectedPurchase = form.selectedPurchase;
  if (!selectedPurchase) {
    throw new Error("Cannot add a sale-repayment without a selected purchase.");
  }

  const amountPaid = Number(form.amountPaid);
  const amountRepaid = Number(form.amountRepaid);
  return {
    ...baseEntry,
    type: "sale_repayment",
    amountReceived: amountPaid + amountRepaid,
    sale: {
      description: form.description,
      productPrice: Number(form.productPrice),
      amountPaid,
    },
    allocations: [
      {
        saleTransactionId: selectedPurchase.id,
        debtAmountPaid: amountRepaid,
      },
    ],
  };
}

function storeTransaction(transaction: Transaction) {
  mockTransactions.push(transaction);

  if (transaction.type === "sale") {
    mockSaleTransactions.push(transaction);
  } else if (transaction.type === "repayment") {
    mockRepaymentTransactions.push(transaction);
  } else {
    mockSaleRepaymentTransactions.push(transaction);
  }
}