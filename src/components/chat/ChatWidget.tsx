"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { BOT_CONFIG } from "@/content/bot/bot";
import { useChatBot } from "./useChatBot";
import { BookingCard } from "./BookingCard";

function BotIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9" cy="13" r="1.3" fill="currentColor" />
      <circle cx="15" cy="13" r="1.3" fill="currentColor" />
    </svg>
  );
}

function Typing() {
  return (
    <div className="flex justify-start" aria-label="Typing">
      <span className="inline-flex items-center gap-1 rounded-2xl rounded-bl-md bg-black_900 px-4 py-3 ring-1 ring-grey_500">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-accentGreen animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </span>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const { items, isStreaming, error, limitReached, send, reset } = useChatBot();

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [items, isStreaming]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Lock the page behind the sheet on mobile.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    if (window.matchMedia("(max-width: 639px)").matches) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = draft;
    setDraft("");
    void send(value);
  };

  const showQuickReplies = items.length === 1 && !isStreaming;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close the assistant" : "Open the assistant"}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-[70] h-14 w-14 items-center justify-center rounded-full
                   bg-accentGreen text-black shadow-lg transition-transform hover:scale-105
                   focus:outline-none focus:ring-2 focus:ring-accentGreen focus:ring-offset-2
                   focus:ring-offset-black ${open ? "hidden sm:flex" : "flex"}`}
        style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <BotIcon className="h-7 w-7" />
        )}
      </button>

      {open && (
        <>
          {/* Scrim — mobile only, so the sheet reads as a layer above the page. */}
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/60 sm:hidden"
          />

          <div
            role="dialog"
            aria-label={`${BOT_CONFIG.name} — AI assistant`}
            className="fixed inset-x-0 bottom-0 z-[65] flex flex-col overflow-hidden
                       rounded-t-3xl border border-grey_500 bg-bgProject font-space_grotesk
                       text-textLight shadow-2xl animate-page-in
                       sm:inset-x-auto sm:bottom-24 sm:right-5 sm:h-[600px] sm:max-h-[calc(100dvh-8rem)]
                       sm:w-[400px] sm:rounded-2xl"
          >
            <header className="flex items-center gap-3 border-b border-grey_500 px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accentGreen text-black">
                <BotIcon className="h-6 w-6" />
              </span>

              <div className="min-w-0 w-full flex-1">
                <div className="truncate font-advancedPixel pt-2 pb-1 text-base leading-tight tracking-normal text-textLight">
                  {BOT_CONFIG.name}
                </div>
                <div className="truncate text-[12px] leading-tight text-grey_300 mt-1.5">
                  AI assistant · answers about Serhii&apos;s work
                </div>
              </div>

              <button
                type="button"
                onClick={reset}
                className="flex h-9 items-center rounded-full px-3 text-[13px] text-grey_300
                           transition-colors hover:bg-black_900 hover:text-accentGreen"
              >
                Reset
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close the assistant"
                className="flex h-9 w-9 items-center justify-center rounded-full text-grey_300
                           transition-colors hover:bg-black_900 hover:text-accentGreen sm:hidden"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </header>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {items.map((item) => {
                if (item.kind === "message") {
                  const mine = item.role === "user";
                  return (
                    <div
                      key={item.id}
                      className={`flex ${mine ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5
                                    text-[15px] leading-[1.5] sm:max-w-[85%] sm:text-sm ${
                                      mine
                                        ? "rounded-br-md bg-accentGreen text-black"
                                        : "rounded-bl-md bg-black_900 text-grey_300 ring-1 ring-grey_500"
                                    }`}
                      >
                        {item.content}
                      </div>
                    </div>
                  );
                }

                if (item.kind === "project") {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl border border-accentGreen/50 bg-black_900 px-4 py-3
                                 transition-colors hover:border-accentGreen"
                    >
                      <div className="text-[11px] font-medium uppercase leading-tight tracking-[0.08em] text-accentGreen">
                        Opened case study
                      </div>
                      <div className="mt-1 text-[15px] font-bold leading-snug text-textLight sm:text-sm">
                        {item.title}
                      </div>
                      {item.reason && (
                        <div className="mt-0.5 text-[13px] leading-snug text-grey_300">
                          {item.reason}
                        </div>
                      )}
                    </Link>
                  );
                }

                if (item.kind === "lead") {
                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl bg-black_900 px-4 py-2.5 text-[13px] leading-[1.5] text-grey_300 ring-1 ring-grey_500"
                    >
                      {item.ok
                        ? "✔ Sent to Serhii. He usually replies within a day."
                        : "⚠ I couldn't deliver that right now — email works: serhiy.kushnir.dev@gmail.com"}
                    </div>
                  );
                }

                return <BookingCard key={item.id} item={item} />;
              })}

              {isStreaming && <Typing />}

              {showQuickReplies && (
                <div className="flex flex-col gap-2 pt-2">
                  {BOT_CONFIG.quickReplies.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => void send(q)}
                      className="flex min-h-[44px] w-full items-center justify-between gap-3 rounded-2xl
                                 border border-grey_500 px-4 py-2.5 text-left text-[14px] leading-snug
                                 text-grey_300 transition-colors hover:border-accentGreen hover:text-accentGreen"
                    >
                      <span className="text-inherit">{q}</span>
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      >
                        <path
                          d="M5 12h14M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              )}

              {error && (
                <div className="rounded-2xl bg-black_900 px-4 py-2.5 text-[13px] leading-[1.5] text-red-400 ring-1 ring-red-900">
                  {error}
                </div>
              )}
            </div>

            <form
              onSubmit={submit}
              className="flex shrink-0 items-end gap-2 border-t border-grey_500 px-3 py-3"
              style={{
                paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
              }}
            >
              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                maxLength={1000}
                disabled={limitReached}
                placeholder={
                  limitReached
                    ? "Session limit reached"
                    : "Ask about a project…"
                }
                aria-label="Message"
                className="h-11 min-w-0 flex-1 rounded-full bg-black px-4 font-space_grotesk text-[16px]
                           text-textLight placeholder:text-textGrey focus:outline-none
                           focus:ring-1 focus:ring-accentGreen disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isStreaming || limitReached || !draft.trim()}
                aria-label="Send"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accentGreen
                           text-black transition-opacity disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                  <path d="M4 12l16-8-6 8 6 8-16-8z" fill="currentColor" />
                </svg>
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
}
