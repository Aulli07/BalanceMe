import type {
  Business,
  Category,
  Customer,
  EntryDraft,
  EntrySource,
  PaymentTransaction,
  ReceiptAttachment,
  SaleSettlementStatus,
  SaleTransaction,
  ScreenshotEntryDraft,
  Transaction,
  User,
  VoiceEntryDraft,
  WrittenEntryDraft,
} from "@/shared/types/domain";

const createdAt = "2026-10-01T09:00:00.000Z";
const updatedAt = "2026-10-15T14:30:00.000Z";

export const mockUsers: User[] = [
  {
    id: "user-ade-001",
    fullName: "Adeola Balogun",
    email: "adeola@example.com",
    phone: "+2348012345678",
    avatarUrl: "https://i.pravatar.cc/160?img=47",
    businessIds: ["business-farm-001"],
    createdAt,
    updatedAt,
  },
];

export const mockBusinesses: Business[] = [
  {
    id: "business-farm-001",
    ownerId: "user-ade-001",
    name: "Adeola Farm Supplies",
    category: "Agriculture",
    phone: "+2348012345678",
    address: "12 Market Road, Ibadan, Oyo",
    currency: "NGN",
    createdAt,
    updatedAt,
  },
];

export const mockCustomers: Customer[] = [
  {
    id: "customer-chika-001",
    businessId: "business-farm-001",
    name: "Chika Okafor",
    pinned: true,
    phone: "+2348034567890",
    email: "chika@example.com",
    avatarUrl: "https://i.pravatar.cc/160?img=32",
    createdAt,
    updatedAt,
  },
  {
    id: "customer-tunde-001",
    businessId: "business-farm-001",
    name: "Tunde Adeyemi",
    pinned: true,
    phone: "+2348056789012",
    createdAt,
    updatedAt,
  },
];

export const mockCategories: Category[] = [
  {
    id: "category-feed-001",
    businessId: "business-farm-001",
    name: "Animal Feed",
    createdAt,
  },
  {
    id: "category-livestock-001",
    businessId: "business-farm-001",
    name: "Livestock Sale",
    createdAt,
  },
];

export const mockReceiptAttachments: ReceiptAttachment[] = [
  {
    id: "receipt-001",
    fileName: "chika-feed-invoice.pdf",
    mimeType: "application/pdf",
    sizeBytes: 182_400,
    storageKey: "receipts/business-farm-001/receipt-001.pdf",
    uploadedAt: "2026-10-10T10:15:00.000Z",
  },
];

export const mockSaleTransactions: SaleTransaction[] = [
  {
    id: "sale-001",
    businessId: "business-farm-001",
    customerId: "customer-chika-001",
    type: "sale",
    categoryId: "category-feed-001",
    description: "Ten bags of poultry feed",
    totalKobo: 825_000,
    initialPaidKobo: 300_000,
    receiptId: "receipt-001",
    createdAt: "2026-10-10T10:00:00.000Z",
  },
  {
    id: "sale-002",
    businessId: "business-farm-001",
    customerId: "customer-tunde-001",
    type: "sale",
    categoryId: "category-livestock-001",
    description: "Two crates of day-old chicks",
    totalKobo: 450_000,
    initialPaidKobo: 450_000,
    createdAt: "2026-10-11T08:30:00.000Z",
  },
  {
    id: "sale-003",
    businessId: "business-farm-001",
    customerId: "customer-chika-001",
    type: "sale",
    categoryId: "category-feed-001",
    description: "Poultry supplements",
    totalKobo: 150_000,
    initialPaidKobo: 0,
    createdAt: "2026-10-12T12:00:00.000Z",
  },
];

export const mockPaymentTransactions: PaymentTransaction[] = [
  {
    id: "payment-001",
    businessId: "business-farm-001",
    customerId: "customer-chika-001",
    type: "payment",
    receivedKobo: 500_000,
    allocations: [
      {
        saleTransactionId: "sale-001",
        amountKobo: 500_000,
      },
    ],
    note: "Bank transfer received from Chika.",
    createdAt: "2026-10-14T11:20:00.000Z",
  },
];

export const mockTransactions: Transaction[] = [
  ...mockSaleTransactions,
  ...mockPaymentTransactions,
];

export const mockSaleSettlementStatuses: Record<string, SaleSettlementStatus> = {
  "sale-001": "partially_paid",
  "sale-002": "paid",
  "sale-003": "unpaid",
};

export const mockEntrySources: EntrySource[] = [
  "written",
  "voice",
  "screenshot",
];

export const mockWrittenEntryDraft: WrittenEntryDraft = {
  id: "draft-written-001",
  businessId: "business-farm-001",
  customerId: "customer-tunde-001",
  categoryId: "category-feed-001",
  source: "written",
  description: "Five bags of starter feed",
  paidKobo: 200_000,
  owedKobo: 175_000,
  receiptFiles: [],
  createdAt: "2026-10-15T09:10:00.000Z",
};

export const mockVoiceEntryDraft: VoiceEntryDraft = {
  id: "draft-voice-001",
  businessId: "business-farm-001",
  customerId: "customer-chika-001",
  categoryId: "category-livestock-001",
  source: "voice",
  description: "Three trays of eggs",
  paidKobo: 0,
  owedKobo: 135_000,
  receiptFiles: [],
  transcript: "Chika collected three trays of eggs on credit for one thousand three hundred and fifty naira.",
  createdAt: "2026-10-15T10:25:00.000Z",
};

export function createMockScreenshotEntryDraft(): ScreenshotEntryDraft {
  const screenshotFile = new File(
    ["Mock transfer receipt"],
    "transfer-receipt.png",
    { type: "image/png" },
  );

  return {
    id: "draft-screenshot-001",
    businessId: "business-farm-001",
    customerId: "customer-chika-001",
    categoryId: "category-feed-001",
    source: "screenshot",
    description: "Transfer for poultry feed",
    paidKobo: 250_000,
    owedKobo: 0,
    receiptFiles: [screenshotFile],
    screenshotFile,
    createdAt: "2026-10-15T13:40:00.000Z",
  };
}

export function createMockEntryDrafts(): EntryDraft[] {
  return [
    mockWrittenEntryDraft,
    mockVoiceEntryDraft,
    createMockScreenshotEntryDraft(),
  ];
}
