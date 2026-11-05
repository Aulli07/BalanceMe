export type EntityId = string;
export type ISODateTime = string;
export type NairaKobo = number;

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
  reminder?: CustomerReminder;
  lastReminded?: CustomerLastReminded;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface CustomerReminder {
  date: ISODateTime;
  note?: string;
}

export interface CustomerLastReminded {
  channel: "whatsapp" | "sms" | "email";
  at: ISODateTime;
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
  transactionId?: EntityId;
  customerId?: EntityId;
}

export interface Receipt {
  id: EntityId;
  businessId: EntityId;
  transactionId: EntityId;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  storageKey: string;
  createdAt: ISODateTime;
}

interface TransactionBase {
  id: EntityId;
  businessId: EntityId;
  customerId: EntityId;
  createdAt: ISODateTime;
}

export interface SaleTransaction extends TransactionBase {
  type: "sale";
  description: string;
  productPrice: NairaKobo;
  amountPaid: NairaKobo;
  dueDate?: ISODateTime;
  receiptId?: EntityId;
}

export interface PaymentAllocation {
  saleTransactionId: EntityId;
  debtAmountPaid: NairaKobo;
}

export interface PaymentTransaction extends TransactionBase {
  type: "payment";
  amountReceived: NairaKobo;
  allocations: PaymentAllocation[];
  note?: string;
  receiptId?: EntityId;
}

export type Transaction = SaleTransaction | PaymentTransaction;
export type SaleSettlementStatus = "paid" | "partially_paid" | "unpaid";

export interface WrittenEntryDraft {
  id: EntityId;
  businessId: EntityId;
  customerId: EntityId;
  description: string;
  productPrice: NairaKobo;
  amountPaid: NairaKobo;
  amountOwed: NairaKobo;
  receiptFiles?: File[];
  createdAt: ISODateTime;
}
