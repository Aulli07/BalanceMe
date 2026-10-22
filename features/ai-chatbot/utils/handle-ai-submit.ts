import { Dispatch, SetStateAction } from "react";
import { ChatMessage } from "../types/ai-chat-type";



export function sendMessage(
  message: string, 
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>,
  setDraft: Dispatch<SetStateAction<string>>
) {
  const content = message.trim();
  if (!content) return;

  setMessages((currentMessages) => [
    ...currentMessages,
    { id: Date.now(), role: "user", content },
    { id: Date.now() + 1, role: "assistant", content: getDemoReply(content) },
  ]);
  setDraft("");
};

const getDemoReply = (message: string) =>
  `I can help you explore “${message}”. Your live business records are not connected yet, so this is a demo response for now.`;