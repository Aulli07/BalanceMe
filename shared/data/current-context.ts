import { mockBusinesses, mockUsers } from "./domain-mock-data";

export const CURRENT_USER = mockUsers[0];
export const ACTIVE_BUSINESS_ID = CURRENT_USER.businessIds[0];
export const CURRENT_BUSINESS = mockBusinesses.find(
  (business) => business.id === ACTIVE_BUSINESS_ID,
);
