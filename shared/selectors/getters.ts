import { mockBusinesses, mockCategories, mockCustomers, mockNotifications, mockPaymentTransactions, mockSaleTransactions, mockTransactions, mockUsers } from "../data/domain-mock-data"




export function getTransactions(businessId: string) {
  return mockTransactions.filter(txn => txn.businessId === businessId)
}


export function getSaleTransactions(businessId: string) {
  return mockSaleTransactions.filter(txn => txn.businessId === businessId);
}


export function getPaymentTransactions(businessId: string) {
  return mockPaymentTransactions.filter(txn => txn.businessId === businessId);
}


export function getCustomers(businessId: string) {
  return mockCustomers.filter(customer => customer.businessId === businessId)
}


export function getNotifications(businessId: string) {
  return mockNotifications.filter(notif => notif.businessId === businessId); 
}


export function getCategories(businessId: string) {
  return mockCategories.filter(category => category.businessId === businessId);
}


export function getUser(businessId: string) {
  return mockUsers.find(user => user.businessIds.includes(businessId))
}


export function getBusiness(businessId: string) {
  return mockBusinesses.find(business => business.id === businessId)
}