import { mockCategories, mockCustomers, mockPaymentTransactions, mockTransactions } from "@/shared/data/domain-mock-data";
import { formatNaira } from "@/shared/utils/format-naira";



export function getTransactionActivity(businessId: string) {
  const Transactions = mockTransactions
    .filter((transaction) => transaction.businessId === businessId)
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
    );
  const correctedTxns = Transactions.map((transaction) => {
    const customer = mockCustomers.find(
      (item) => item.id === transaction.customerId,
    );

    if (transaction.type === "payment") {
      return {
        ...transaction,
        customer,
        category: "Payment",
        description: transaction.note ?? "Payment received",
        amount: transaction.receivedKobo,
        status: "Paid",
        statusColor: "bg-[#e9f1df] text-[#568044]",
      };
    }

    const category = mockCategories.find(
      (item) => item.id === transaction.categoryId,
    );
    const allocatedKobo = mockPaymentTransactions
      .flatMap((payment) => payment.allocations)
      .filter((allocation) => allocation.saleTransactionId === transaction.id)
      .reduce((total, allocation) => total + allocation.amountKobo, 0);
    const owedKobo = transaction.totalKobo - transaction.initialPaidKobo - allocatedKobo;
    const isPaid = owedKobo <= 0;

    return {
      ...transaction,
      customer,
      category: category?.name ?? "Uncategorised",
      description: transaction.description,
      amount: transaction.totalKobo,
      status: isPaid ? "Paid" : `Owes ${formatNaira(owedKobo)}`,
      statusColor: isPaid
        ? "bg-[#e9f1df] text-[#568044]"
        : "bg-[#f8ead5] text-[#855126]",
    };
  });
  
  const transactionsByDay = correctedTxns.reduce<Record<string, typeof correctedTxns>>(
    (groups, transaction) => {
      const day = getDayLabel(transaction.createdAt);
      groups[day] ??= [];
      groups[day].push(transaction);
      return groups;
    },
    {},
  );

  return transactionsByDay;
}