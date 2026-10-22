import { ChatMessage } from "../types/ai-chat-type"



export function AiChatMessage({messages}: {messages: ChatMessage[]}) {
  return (
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
  )
}