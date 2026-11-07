import { mockCustomers, mockPaymentTransactions, mockTransactions } from "@/shared/data/domain-mock-data";



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
        description: transaction.note ?? "Payment received",
        amount: transaction.amountReceived,
        status: "Received",
        statusColor: "bg-[var(--forest)]/10 text-[var(--forest)]",
      };
    }

    const allocatedAmount = mockPaymentTransactions
      .flatMap((payment) => payment.allocations)
      .filter((allocation) => allocation.saleTransactionId === transaction.id)
      .reduce((total, allocation) => total + allocation.debtAmountPaid, 0);
    const owedAmount = transaction.productPrice - transaction.amountPaid - allocatedAmount;
    const isPaid = owedAmount <= 0;

    return {
      ...transaction,
      customer,
      description: transaction.description,
      amount: transaction.amountPaid,
      status: isPaid ? "Settled" : "Partially paid",
      statusColor: isPaid
        ? "bg-[var(--forest)]/10 text-[var(--forest)]"
        : "bg-[#f8ead5] text-[#855126]",
    };
  });

  return correctedTxns;
}
