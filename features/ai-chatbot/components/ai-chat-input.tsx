import { LuArrowUp, LuPlus } from "react-icons/lu";
import { ChatInputProps } from "../types/ai-chat-type";




export function AiChatInput({
  handleSubmit, 
  setDraft,
  draft
}: ChatInputProps) {

  return (
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
  )
}