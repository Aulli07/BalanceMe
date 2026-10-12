"use client";

import { LuArrowRight, LuCircleCheck, LuMic, LuSparkles } from "react-icons/lu";

type VoiceEntryOneProps = {
  setTranscript: React.Dispatch<React.SetStateAction<string>>;
  transcript: string;
  onStart: () => void;
  onStop: () => void;
  onNext: () => void;
};

export function VoiceEntryOne({
  onStart,
}: VoiceEntryOneProps) {
  return (
    <main className="flex min-h-[calc(100vh-4.5rem)] flex-col px-5 pb-10 text-[var(--ink)]">
      <section className="pt-6" aria-labelledby="voice-entry-title">
        <h1 id="voice-entry-title" className="max-w-sm text-2xl font-extrabold leading-tight tracking-tight">
          Speak naturally. We&apos;ll handle the details.
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted)]">
          Read the script below and replace each blank with the correct detail when you speak. Say it like this.
        </p>
      </section>


      {/* <div className="flex items-center justify-between mt-5 gap-3">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#829082]">
            Your script
          </p>
          <h2 id="voice-script-title" className="mt-1 text-lg font-extrabold">
            Say it like this
          </h2>
        </div>
        <span className="grid size-10 place-items-center rounded-2xl bg-[#d9e8c5] text-[var(--forest)]">
          <LuMic className="size-5" aria-hidden="true" />
        </span>
      </div> */}
      <p className="mt-5 rounded-2xl border border-[#e1e9da] bg-[var(--surface)] p-4 text-base font-semibold leading-9 text-[var(--ink)]">
        Mr/Mrs{" "}
        <span className="rounded-lg bg-[#dfead2] px-2 py-1 text-[var(--forest)]">
          [customer name]
        </span>{" "}
        purchased{" "}
        <span className="rounded-lg bg-[#dfead2] px-2 py-1 text-[var(--forest)]">
          [category]
        </span>{" "}
        for{" "}
        <span className="rounded-lg bg-[#dfead2] px-2 py-1 text-[var(--forest)]">
          [amount paid]
        </span>
        . He owes{" "}
        <span className="rounded-lg bg-[#f5e8d8] px-2 py-1 text-[#855126]">
          [amount owed or zero]
        </span>
        . In detail, he bought{" "}
        <span className="rounded-lg bg-[#dfead2] px-2 py-1 text-[var(--forest)]">
          [description]
        </span>
        .
      </p>
{/* 
      <section className="mt-6 rounded-3xl border border-[#dce7d2] bg-[#f7faf2] p-5 shadow-sm" aria-labelledby="voice-script-title">
        <div className="flex items-center justify-between gap-3">
          <div> */}
            {/* <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#829082]">
              Your script
            </p> */}
            {/* <h2 id="voice-script-title" className="mt-1 text-lg font-extrabold">
              Say it like this
            </h2>
          </div>
          <span className="grid size-10 place-items-center rounded-2xl bg-[#d9e8c5] text-[var(--forest)]">
            <LuMic className="size-5" aria-hidden="true" />
          </span>
        </div> */}

        {/* <p className="mt-5 rounded-2xl border border-[#e1e9da] bg-[var(--surface)] p-4 text-base font-semibold leading-8 text-[var(--ink)]">
          Mr/Mrs{" "}
          <span className="rounded-lg bg-[#dfead2] px-2 py-1 text-[var(--forest)]">
            [customer name]
          </span>{" "}
          purchased{" "}
          <span className="rounded-lg bg-[#dfead2] px-2 py-1 text-[var(--forest)]">
            [category]
          </span>{" "}
          for{" "}
          <span className="rounded-lg bg-[#dfead2] px-2 py-1 text-[var(--forest)]">
            [amount paid]
          </span>
          . He owes{" "}
          <span className="rounded-lg bg-[#f5e8d8] px-2 py-1 text-[#855126]">
            [amount owed or zero]
          </span>
          . In detail, he bought{" "}
          <span className="rounded-lg bg-[#dfead2] px-2 py-1 text-[var(--forest)]">
            [description]
          </span>
          .
        </p> */}
      {/* </section> */}
{/* 
      <section className="mt-3 rounded-3xl border border-[#e1e7dc] bg-[var(--surface)] p-5" aria-labelledby="voice-instructions-title">
        <h2 id="voice-instructions-title" className="text-sm font-extrabold">
          For a smooth entry
        </h2>
        <div className="mt-3 grid gap-3">
          <p className="flex items-start gap-2 text-sm leading-relaxed text-[var(--muted)]">
            <LuCircleCheck className="mt-0.5 size-4 shrink-0 text-[var(--forest)]" aria-hidden="true" />
            Use the right customer name, category, amount, and description.
          </p>
          <p className="flex items-start gap-2 text-sm leading-relaxed text-[var(--muted)]">
            <LuCircleCheck className="mt-0.5 size-4 shrink-0 text-[var(--forest)]" aria-hidden="true" />
            Stick to the script and speak clearly from beginning to end.
          </p>
          <p className="flex items-start gap-2 text-sm leading-relaxed text-[var(--muted)]">
            <LuCircleCheck className="mt-0.5 size-4 shrink-0 text-[var(--forest)]" aria-hidden="true" />
            Say zero when the customer does not owe anything.
          </p>
        </div>
      </section> */}

      <div className="mt-auto pt-12">
        <button
          type="button"
          onClick={onStart}
          className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[var(--forest)] py-3.5 text-base font-extrabold text-[var(--surface)] shadow-lg shadow-[var(--forest)]/15 transition-colors active:bg-[#36563f]"
        >
          <LuMic className="size-5" aria-hidden="true" />
          Start recording
          <LuArrowRight className="size-5" aria-hidden="true" />
        </button>
      </div>
    </main>
  );
}
