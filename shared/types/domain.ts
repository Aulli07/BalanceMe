export type EntityId = string;
export type ISODateTime = string;
export type NairaKobo = number;

export type EntrySource = "written" | "voice" | "screenshot";

export interface User {
  id: EntityId;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  businessIds: EntityId[];
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface Business {
  id: EntityId;
  ownerId: EntityId;
  name: string;
  category: string;
  phone?: string;
  address?: string;
  currency: "NGN";
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface Customer {
  id: EntityId;
  businessId: EntityId;
  name: string;
  pinned: boolean;
  phone?: string;
  email?: string;
  avatarUrl?: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface Category {
  id: EntityId;
  businessId: EntityId;
  name: string;
  createdAt: ISODateTime;
}

export type NotificationCategory = "Paid" | "Owed" | "Analytics";

export interface Notification {
  id: EntityId;
  businessId: EntityId;
  title: string;
  detail: string;
  category: NotificationCategory;
  unread: boolean;
  createdAt: ISODateTime;
}

export interface ReceiptAttachment {
  id: EntityId;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storageKey: string;
  uploadedAt: ISODateTime;
}

interface TransactionBase {
  id: EntityId;
  businessId: EntityId;
  customerId: EntityId;
  createdAt: ISODateTime;
}

export interface SaleTransaction extends TransactionBase {
  type: "sale";
  categoryId: EntityId;
  description: string;
  totalKobo: NairaKobo;
  initialPaidKobo: NairaKobo;
  receiptId?: EntityId;
}

export interface PaymentAllocation {
  saleTransactionId: EntityId;
  amountKobo: NairaKobo;
}

export interface PaymentTransaction extends TransactionBase {
  type: "payment";
  receivedKobo: NairaKobo;
  allocations: PaymentAllocation[];
  note?: string;
}

export type Transaction = SaleTransaction | PaymentTransaction;
export type SaleSettlementStatus = "paid" | "partially_paid" | "unpaid";

interface EntryDraftBase {
  id: EntityId;
  businessId: EntityId;
  customerId: EntityId;
  categoryId: EntityId;
  description: string;
  paidKobo: NairaKobo;
  owedKobo: NairaKobo;
  receiptFiles: File[];
  createdAt: ISODateTime;
}

export interface WrittenEntryDraft extends EntryDraftBase {
  source: "written";
}

export interface VoiceEntryDraft extends EntryDraftBase {
  source: "voice";
  transcript: string;
}

export interface ScreenshotEntryDraft extends EntryDraftBase {
  source: "screenshot";
  screenshotFile: File;
}

export type EntryDraft =
  | WrittenEntryDraft
  | VoiceEntryDraft
  | ScreenshotEntryDraft;
