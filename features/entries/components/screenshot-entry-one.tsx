"use client";

import { useEffect, useState } from "react";
import { LuImagePlus } from "react-icons/lu";

export function ScreenshotEntryOne({
  onNext
}: {
  onNext: () => void;
}) {

  const [file, setFile] = useState<File>();
  const [preview, setPreview] = useState<string>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];
    if (!nextFile) return;

    setFile(nextFile);
    setPreview(URL.createObjectURL(nextFile));
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <main className="px-5 pt-5 flex flex-col min-h-[calc(100vh-6.9rem)]">
      <section aria-labelledby="screenshot-entry-heading" className="flex-1 ">
        <h1 id="screenshot-entry-heading" className="text-2xl font-extrabold tracking-tight">
          Upload a receipt
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Add a receipt or screenshot to record this entry.
        </p>

        <label
          htmlFor="receipt-upload"
          className="mt-6 block cursor-pointer h-80 w-65 overflow-hidden rounded-2xl border-2 border-dashed border-[#b9cda0] bg-[#f7faf2] transition-colors hover:bg-[#eef5e7] active:bg-[#e5efd9]"
        >
          <div className="relative grid w-full h-full place-items-center">
            {preview ? (
              <img
                src={preview}
                alt={`Preview of ${file?.name ?? "uploaded receipt"}`}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : (
              <span className="grid w-full h-full place-items-center rounded-2xl bg-[#d9e8c5] text-[var(--forest)]">
                <LuImagePlus className="size-10" aria-hidden="true" />
              </span>
            )}
          </div>
          <input
            id="receipt-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>

        {file && (
          <p className="mt-3 truncate text-left text-sm font-bold text-[var(--forest)]">
            {file.name}
          </p>
        )}
      </section>
      <button
        type="button"
        onClick={() => onNext()}
        disabled={!file}
        className="flex w-full items-center justify-center gap-4 rounded-xl bg-[#c7d9ae] py-2 text-md font-bold bg-[var(--forest)] text-[var(--paper)] shadow-lg shadow-[var(--forest)]/15"
      >
        Continue
      </button>
    </main>
  );
}
