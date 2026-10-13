import { LiaMicrophoneSolid } from "react-icons/lia";
import { LuArrowRight, LuImagePlus, LuPencilLine, LuX } from "react-icons/lu";
import { EntryOption } from "../types/entry-option-type";

export const entryOptions: EntryOption[] = [
  {
    icon: LuPencilLine,
    title: "Written",
    description: "Type purchases or customer credit",
    arrowIcon: LuArrowRight,
    iconContainerClassName: "bg-[#edf3df] text-[var(--forest)]",
    to: "/add-entry",
  },
  {
    icon: LiaMicrophoneSolid,
    title: "Voice",
    description: "Speak a note, then review and send",
    arrowIcon: LuArrowRight,
    iconContainerClassName: "bg-[#f0f5df] text-[var(--forest)]",
    to: "/voice-entry",
  },
  {
    icon: LuImagePlus,
    title: "Screenshot",
    description: "Upload a transfer receipt or invoice",
    arrowIcon: LuArrowRight,
    iconContainerClassName: "bg-[#e8f2e8] text-[#52765c]",
    to: "/screenshot-entry",
  },
];