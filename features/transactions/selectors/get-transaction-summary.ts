import {
  mockPaymentTransactions,
  mockSaleTransactions,
} from "@/shared/data/domain-mock-data";
import type { NairaKobo } from "@/shared/types/domain";

export type TransactionSummary = {
  paidKobo: NairaKobo;
  owedKobo: NairaKobo;
};

export function getTransactionSummary(
  businessId: string,
  month: string,
): TransactionSummary {
  const [monthName, year] = month.split(" ");
  const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth();
  const monthYear = Number(year);
  const isInSelectedMonth = (createdAt: string) => {
    const date = new Date(createdAt);

    return (
      date.getUTCFullYear() === monthYear &&
      date.getUTCMonth() === monthIndex
    );
  };

  const sales = mockSaleTransactions.filter(
    (transaction) =>
      transaction.businessId === businessId &&
      isInSelectedMonth(transaction.createdAt),
  );

  const paidFromSalesKobo = sales.reduce(
    (total, transaction) => total + transaction.initialPaidKobo,
    0,
  );
  const paidFromPaymentsKobo = mockPaymentTransactions
    .filter(
      (transaction) =>
        transaction.businessId === businessId &&
        isInSelectedMonth(transaction.createdAt),
    )
    .reduce((total, transaction) => total + transaction.receivedKobo, 0);

  const owedKobo = sales.reduce((total, sale) => {
    const allocatedKobo = mockPaymentTransactions
      .flatMap((payment) => payment.allocations)
      .filter((allocation) => allocation.saleTransactionId === sale.id)
      .reduce((allocated, allocation) => allocated + allocation.amountKobo, 0);

    return (
      total +
      Math.max(0, sale.totalKobo - sale.initialPaidKobo - allocatedKobo)
    );
  }, 0);

  return {
    paidKobo: paidFromSalesKobo + paidFromPaymentsKobo,
    owedKobo,
  };
}
