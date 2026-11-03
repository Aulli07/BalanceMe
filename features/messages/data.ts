import { LuMail, LuMessageSquare, LuSmartphone } from "react-icons/lu";
import { OwingCustomer, ReminderChannel } from "./types";



type optionDataType = {
  id: ReminderChannel;
  label: string;
  icon: typeof LuMessageSquare;
  available: boolean;
  hint: string
}


export function getOptionData(customer: OwingCustomer): optionDataType[] {
  return (
    [
      {
        id: "whatsapp",
        label: "WhatsApp",
        icon: LuMessageSquare,
        available: Boolean(customer.phone),
        hint: "Add phone number",
      },
      {
        id: "sms",
        label: "SMS",
        icon: LuSmartphone,
        available: Boolean(customer.phone),
        hint: "Add phone number",
      },
      {
        id: "email",
        label: "Email",
        icon: LuMail,
        available: Boolean(customer.email),
        hint: "Add email",
      },
    ]
  )
}


// export const options: {
//     id: ReminderChannel;
//     label: string;
//     icon: typeof LuMessageSquare;
//     available: boolean;
//     hint: string;
//   }[] = [
//     {
//       id: "whatsapp",
//       label: "WhatsApp",
//       icon: LuMessageSquare,
//       available: Boolean(customer.phone),
//       hint: "Add phone number",
//     },
//     {
//       id: "sms",
//       label: "SMS",
//       icon: LuSmartphone,
//       available: Boolean(customer.phone),
//       hint: "Add phone number",
//     },
//     {
//       id: "email",
//       label: "Email",
//       icon: LuMail,
//       available: Boolean(customer.email),
//       hint: "Add email",
//     },
//   ];