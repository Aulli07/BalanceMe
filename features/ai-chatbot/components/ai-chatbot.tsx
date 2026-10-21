"use client";

import { FormEvent, useState } from "react";
import { LuArrowUp, LuPlus } from "react-icons/lu";
import { AiChatbotHeader } from "./ai-chatbot-header";
import { AiChatbotIntro } from "./ai-chatbot-intro";

type ChatMessage = {
  id: number;
  role: "assistant" | "user";
  content: string;
};

const getDemoReply = (message: string) =>
  `I can help you explore “${message}”. Your live business records are not connected yet, so this is a demo response for now.`;

export function AiChatbot() {
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = (message: string) => {
    const content = message.trim();

    if (!content) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      { id: Date.now(), role: "user", content },
      { id: Date.now() + 1, role: "assistant", content: getDemoReply(content) },
    ]);
    setDraft("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(draft);
  };

  return (
    <main className="min-h-screen bg-[var(--paper)] pb-44 text-[var(--ink)]">
      <AiChatbotHeader />

      {messages.length === 0 ? (
        <AiChatbotIntro onSuggestionSelect={sendMessage} />
      ) : (
        <section className="mx-auto flex w-full max-w-lg flex-col gap-4 px-5 py-7" aria-live="polite">
          {messages.map((message) => (
            <article
              key={message.id}
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm font-medium leading-relaxed shadow-sm ${
                message.role === "user"
                  ? "ml-auto rounded-br-md bg-[var(--forest)] text-[var(--surface)]"
                  : "rounded-bl-md border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]"
              }`}
            >
              {message.content}
            </article>
          ))}
        </section>
      )}

      <form
        onSubmit={handleSubmit}
        className="fixed bottom-16 left-0 z-10 w-full px-4"
      >
        <div className="mx-auto flex max-w-lg items-center gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-1.5 shadow-lg shadow-[var(--forest)]/10">
          <button
            type="button"
            aria-label="Add attachment"
            className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--paper)] text-[var(--forest-soft)] transition-transform active:scale-95"
          >
            <LuPlus className="size-5" aria-hidden="true" />
          </button>
          <label className="sr-only" htmlFor="ai-chat-message">
            Ask BallyAI anything
          </label>
          <input
            id="ai-chat-message"
            type="text"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask BallyAI anything..."
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--ink)] outline-none placeholder:text-[var(--muted)]"
          />
          <button
            type="submit"
            aria-label="Send message"
            disabled={!draft.trim()}
            className="grid size-10 shrink-0 place-items-center rounded-xl bg-[var(--forest)] text-[var(--lime)] transition-transform enabled:hover:-translate-y-0.5 enabled:active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-35"
          >
            <LuArrowUp className="size-5" strokeWidth={2.5} aria-hidden="true" />
          </button>
        </div>
      </form>
    </main>
  );
}
