import { Dispatch, SetStateAction } from "react";

export type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

export type ChatInputProps = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  setDraft: Dispatch<SetStateAction<string>>;
  draft: string;
}

export type AiChatbotIntroProps = {
  setMessages: Dispatch<SetStateAction<ChatMessage[]>>;
  setDraft: Dispatch<SetStateAction<string>>;
};