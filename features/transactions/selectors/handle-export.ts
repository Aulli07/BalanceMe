import type { TransactionActivityProps } from "../types/transaction-props";
import { formatNaira } from "@/shared/utils/format-naira";

export function handleTransactionExport(transactions: TransactionActivityProps) {
  const rows = [
    ["Date", "Customer", "Type", "Category", "Description", "Amount", "Status"],
    ...transactions.map((transaction) => [
      new Date(transaction.createdAt).toLocaleDateString("en-NG"),
      transaction.customer?.name ?? "Unknown customer",
      transaction.type === "payment" ? "Payment" : "Sale",
      transaction.category,
      transaction.description,
      formatNaira(transaction.amount),
      transaction.status,
    ]),
  ];
  const csv = rows
    .map((row) => row.map((cell) => `"${cell}"`).join(","))
    .join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = "balanceme-transactions.csv";
  link.click();
  URL.revokeObjectURL(url);
}