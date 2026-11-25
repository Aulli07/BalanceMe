import { getCustomer } from "@/shared/selectors/customer-getters";
import { getOwedDetailsOfTransaction } from "@/shared/selectors/txn-owe-getters";
import { getSortedTransactions } from "@/shared/selectors/txn-getters";



export function getTransactionActivity(businessId: string) {
  const Transactions = getSortedTransactions(businessId);

  const correctedTxns = Transactions.map((transaction) => {
    const customer = getCustomer(transaction.customerId);

    if (transaction.type === "repayment") {
      return {
        ...transaction,
        customer,
        description: transaction.note ?? "Repayment received",
        amount: transaction.amountReceived,
        status: "Received",
        statusColor: "bg-[var(--forest)]/10 text-[var(--forest)]",
      };
    }

    if (transaction.type === "sale_repayment") {
      const { owedStatus } = getOwedDetailsOfTransaction(transaction);
      return {
        ...transaction,
        customer,
        description: transaction.sale.description,
        amount: transaction.amountReceived,
        status: owedStatus === false ? "Settled" : "Partially paid",
        statusColor: owedStatus === false
          ? "bg-[var(--forest)]/10 text-[var(--forest)]"
          : "bg-[#f8ead5] text-[#855126]",
      };
    }

    const { owedStatus } = getOwedDetailsOfTransaction(transaction);
    return {
      ...transaction,
      customer,
      description: transaction.sale.description,
      amount: transaction.sale.amountPaid,
      status: owedStatus === false ? "Settled" : "Partially paid",
      statusColor: owedStatus === false
        ? "bg-[var(--forest)]/10 text-[var(--forest)]"
        : "bg-[#f8ead5] text-[#855126]",
    };
  });

  return correctedTxns;
}

// function getOwedStatus(
//   transaction:
//     | (typeof mockSaleTransactions)[number]
//     | (typeof mockSaleRepaymentTransactions)[number],
// ) {
//   // const allocatedAmount = [
//   //   ...mockRepaymentTransactions,
//   //   ...mockSaleRepaymentTransactions,
//   // ]
//   //   .flatMap((repayment) => repayment.allocations)
//   //   .filter((allocation) => allocation.saleTransactionId === transaction.id)
//   //   .reduce((total, allocation) => total + allocation.debtAmountPaid, 0);
//   const owedAmount =
//     transaction.sale.productPrice -
//     transaction.sale.amountPaid -
//     allocatedAmount;
//   const isPaid = owedAmount === 0;
//   return isPaid;
// }
