"use client";

import { useState } from "react";
import { AiChatIntro } from "./ai-chatbot-intro";
import { AiChatMessage } from "./ai-chat-message";
import { AiChatInput } from "./ai-chat-input";
import { sendMessage } from "../utils/handle-ai-submit";
import { ChatMessage } from "../types/ai-chat-type";


export function AiChatbot() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(draft, setMessages, setDraft);
  };

  return (
    <main className="min-h-screen bg-[var(--paper)] pb-44 text-[var(--ink)]">
      {messages.length === 0 ? (
        <AiChatIntro setMessages={setMessages} setDraft={setDraft} />
      ) : (
        <AiChatMessage messages={messages} />
      )}

      <AiChatInput 
        setDraft={setDraft} 
        handleSubmit={handleSubmit} 
        draft={draft}
      />
    </main>
  );
}
