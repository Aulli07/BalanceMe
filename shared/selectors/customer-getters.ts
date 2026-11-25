import { mockCustomers, mockTransactions } from "../data/domain-mock-data"


export function getCustomers(businessId: string) {
  return mockCustomers.filter(customer => customer.businessId === businessId)
}

export function getCustomer(customerId: string) {
  return mockCustomers.find(customer => customer.id === customerId)
}

export function getCustomerTransactions(businessId: string,customerId: string) {
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
