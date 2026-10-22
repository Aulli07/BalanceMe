import { AiChatbotIntroProps } from "../types/ai-chat-type";
import { sendMessage } from "../utils/handle-ai-submit";
import { SUGGESTIONS } from "../data/suggestions";



export function AiChatIntro({ setMessages, setDraft }: AiChatbotIntroProps) {
  return (
    <section
      className="flex min-h-[calc(100vh-4.25rem)] items-center justify-center px-5 pb-24"
      aria-labelledby="ai-chat-intro-title"
    >
      <div className="w-full max-w-sm text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-[1.7rem] border border-[#e5eadc] bg-[var(--surface)] shadow-[0_0_0_9px_rgba(255,254,249,0.65),0_0_0_10px_rgba(229,234,220,0.7)] transition-transform duration-300 ease-out hover:-translate-y-1 active:translate-y-0">
          <span className="grid size-13 place-items-center rounded-2xl bg-[var(--forest)] text-2xl font-black tracking-tight text-[var(--lime)] shadow-sm shadow-[var(--forest)]/20">
            b.
          </span>
        </div>

        <h2
          id="ai-chat-intro-title"
          className="mt-7 text-[26px] font-extrabold leading-[1.08] tracking-tight text-[var(--forest-dark)]"
        >
          Let&apos;s talk about your business
        </h2>
        <p className="mx-auto mt-2 max-w-70 text-xs font-medium leading-relaxed text-[var(--muted)]">
          Big question or small business puzzle, I&apos;m here to help you think it through.
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Suggested questions">
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => sendMessage(suggestion, setMessages, setDraft)}
              className={`rounded-full border px-3.5 py-2.5 text-[11px] font-bold leading-none shadow-sm transition duration-200 ease-out hover:-translate-y-1 hover:shadow-md active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                index === 0
                  ? "border-[#d9e8c6] bg-[#eaf4df] text-[var(--forest)]"
                  : index === 3
                    ? "border-[#e1ebc9] bg-[#f0f6df] text-[var(--forest)]"
                    : index === 5
                      ? "border-[#f0ddd4] bg-[#fff3ed] text-[#795d52]"
                      : "border-[var(--line)] bg-[var(--surface)] text-[var(--forest-soft)]"
              }`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
