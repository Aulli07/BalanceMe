import { mockCustomers, mockPaymentTransactions, mockSaleTransactions } from "@/shared/data/domain-mock-data";
import { SaleTransaction } from "@/shared/types/domain";

export function getTotalCustomersOwing(businessId: string) {
  const customers = mockCustomers.filter(cust => cust.businessId === businessId);
  let count = 0;
  let customersOwing = [];

  for (const customer of customers) {
    const owes = mockSaleTransactions
      .filter(txn => txn.customerId === customer.id)
      .some(txn => {
        const remnant = getTransactionRemnant(txn);
        return remnant > 0;
      })
    if (owes) {
      count++;
      customersOwing.push(customer);
    };
  }

  return { count, customersOwing };
}

function getTransactionRemnant(txn: SaleTransaction) {
  const allocated = getAllocatedPayments(txn.id);
  const paid = allocated.reduce((acc, curr) => acc + curr, 0);
  return txn.totalKobo - txn.initialPaidKobo - paid;
}

function getAllocatedPayments(id: string) {
  return mockPaymentTransactions
    .flatMap(txn => txn.allocations)
    .filter(allocation => allocation.saleTransactionId === id)
    .map(allocation => allocation.amountKobo);
}

export function getTotalAmountOwed(businessId: string) {
  const customers = mockCustomers.filter(cust => cust.businessId === businessId);

  const totalAmounts = customers.map(cust => getTotalAmountOwedForCustomer(businessId, cust.id));
  const totalOwedAmount = totalAmounts.reduce((acc, curr) => acc + curr, 0);
  return totalOwedAmount;
}


export function getTotalAmountOwedForCustomer(businessId: string, customerId: string) {
  const customer = mockCustomers.find(cust => cust.businessId === businessId && cust.id === customerId);
  if (!customer) return 0;

  const owedAmounts = mockSaleTransactions
    .filter(txn => txn.customerId === customerId)
    .map(txn => getTransactionRemnant(txn));
  const totalOwedByCustomer = owedAmounts.reduce((acc, owe) => acc + owe, 0);
  return totalOwedByCustomer;
}

export function getLargestCustomerOwe(businessId: string) {
  const customers = mockCustomers.filter(cust => cust.businessId === businessId);

  const totalAmounts = customers.map(cust => getTotalAmountOwedForCustomer(businessId, cust.id));
  return totalAmounts.sort((a, b) => b - a)[0]
}