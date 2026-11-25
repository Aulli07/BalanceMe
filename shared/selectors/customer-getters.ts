import { CustomerTransactionItem } from "@/features/customers/types/customer-detail";
import { ACTIVE_BUSINESS_ID, mockCustomers, mockTransactions } from "../data/domain-mock-data"
import { getOwedAmount } from "@/features/analytics/selectors/get-analytics-data";


export function getCustomers(businessId: string) {
  return mockCustomers.filter(customer => customer.businessId === businessId)
}

export function getCustomer(customerId: string) {
  return mockCustomers.find(customer => customer.id === customerId)
}

export function getCustomerTransactions(businessId: string, customerId: string) {
  return mockTransactions.filter(transaction => transaction.businessId === businessId && transaction.customerId === customerId)
}

export function getNewestCustomer(businessId: string) {
  return [...mockCustomers]
    .filter((customer) => customer.businessId === businessId)
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
    )[0] ?? null;
}

export function getCustomerRecentTransactions(
  customerId: string,
  businessId: string,
  limit?: number,
): CustomerTransactionItem[] {
  return getCustomerTransactions(businessId, customerId)
    .map((transaction): CustomerTransactionItem => {
      if (transaction.type === "repayment") {
        return {
          id: transaction.id,
          type: "repayment",
          title: "Repayment received",
          description: transaction.note ?? "Repayment received",
          amount: transaction.amountReceived,
          createdAt: transaction.createdAt,
          paymentStatus: "Received",
        };
      }

      const owedAmount = getOwedAmount(transaction);
      return {
        id: transaction.id,
        type: transaction.type,
        title: transaction.type === "sale" ? "Sale" : "Sale and repayment",
        description: transaction.sale.description,
        amount: transaction.type === "sale" ? transaction.sale.productPrice : transaction.amountReceived,
        createdAt: transaction.createdAt,
        paymentStatus: owedAmount === 0 ? "Settled" : "Partially paid",
      };
    })
    .sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export function getCustomerSaleTransactionCount(customerId: string, businessId: string) {
  return getCustomerTransactions(businessId, customerId).filter(
    (transaction) => transaction.type !== "repayment",
  ).length;
}

export function getCustomerLastActivity(businessId: string, customerId: string): string {
  const customerTxns = getCustomerTransactions(businessId, customerId).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (customerTxns.length === 0) return "No activity yet";

  const lastDate = new Date(customerTxns[0].createdAt);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (lastDate >= today) return "Last activity today";
  if (lastDate >= yesterday) return "Last activity yesterday";

  const day = lastDate.getDate();
  const month = lastDate.toLocaleDateString("en-GB", { month: "short" });
  return `Last activity ${day} ${month}`;
}