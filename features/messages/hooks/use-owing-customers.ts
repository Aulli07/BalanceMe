"use client";

import { useState } from "react";
import { mockBusinesses } from "@/shared/data/domain-mock-data";
import { getOwingCustomers } from "../selectors/get-owing-customers";
import type {
  CustomerMessageState,
  OwingCustomer,
  OwingSort,
  ReminderChannel,
} from "../types";
import { formatNaira } from "@/shared/utils/format-naira";

const defaultChannel = (customer: OwingCustomer): ReminderChannel =>
  customer.phone ? "whatsapp" : customer.email ? "email" : "sms";

export function getReminderTemplate(
  customer: OwingCustomer,
  businessName: string,
) {
  return `Hi ${customer.name}, a friendly reminder that you have an outstanding balance of ${formatNaira(customer.owedAmount)} with ${businessName}. Kindly settle when you can. Thank you!`;
}




export function useOwingCustomers() {
  const businessName = mockBusinesses[0]?.name ?? "your business";
  const [customers, setCustomers] = useState(getOwingCustomers);
  const [messages, setMessages] = useState<CustomerMessageState>(() =>
    Object.fromEntries(
      getOwingCustomers().map((customer) => [
        customer.id,
        {
          channel: defaultChannel(customer),
          message: getReminderTemplate(customer, businessName),
        },
      ]),
    ),
  );

  const totalOwedAmount = customers.reduce(
    (total, customer) => total + customer.owedAmount,
    0,
  );

  const updateMessage = (customerId: string, message: string) =>
    setMessages((current) => ({
      ...current,
      [customerId]: { ...current[customerId], message },
    }));

  const setChannel = (customerId: string, channel: ReminderChannel) =>
    setMessages((current) => ({
      ...current,
      [customerId]: { ...current[customerId], channel },
    }));

  const resetMessage = (customer: OwingCustomer) =>
    updateMessage(customer.id, getReminderTemplate(customer, businessName));

  const saveReminder = (
    customerId: string,
    reminder: OwingCustomer["reminder"],
  ) =>
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === customerId ? { ...customer, reminder } : customer,
      ),
    );

  const recordReminder = (customerId: string, channel: ReminderChannel) =>
    setCustomers((current) =>
      current.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              lastReminded: { channel, at: new Date().toISOString() },
            }
          : customer,
      ),
    );

  const getSortedCustomers = (sort: OwingSort, query: string) => {
    const normalizedQuery = query.trim().toLowerCase();
    return customers
      .filter((customer) =>
        customer.name.toLowerCase().includes(normalizedQuery),
      )
      .sort((a, b) => {
        if (sort === "name") return a.name.localeCompare(b.name);
        if (sort === "oldest")
          return +new Date(a.owingSince) - +new Date(b.owingSince);
        return b.owedAmount - a.owedAmount;
      });
  };

  return {
    businessName,
    customers,
    messages,
    totalOwedAmount,
    getSortedCustomers,
    updateMessage,
    setChannel,
    resetMessage,
    saveReminder,
    recordReminder,
  };
}
