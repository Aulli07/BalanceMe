import { mockBusinesses, mockNotifications, mockReceipts, mockUsers } from "../data/domain-mock-data"


export function getNotifications(businessId: string) {
  return mockNotifications.filter(notif => notif.businessId === businessId); 
}

export function getUser(businessId: string) {
  return mockUsers.find(user => user.businessIds.includes(businessId))
}


export function getBusiness(businessId: string) {
  return mockBusinesses.find(business => business.id === businessId)
}

export function getReceipt(receiptId: string) {
  return mockReceipts.find((receipt) => receipt.id === receiptId);
}
