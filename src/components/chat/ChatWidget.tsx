"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { BOT_CONFIG } from "@/content/bot/bot";
import { useChatBot } from "./useChatBot";
import { BookingCard } from "./BookingCard";
import { OPEN_CHAT_EVENT, type OpenChatDetail } from "@/lib/openChat";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

function BotIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M12 3v4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
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
            className="h-1.5 w-1.5 rounded-full bg-green_500 animate-typing-dot"
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
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, isStreaming, error, limitReached, send, reset } = useChatBot();
  const prefersReducedMotion = usePrefersReducedMotion();
  const hasDraft = draft.trim().length > 0;
  const hasConversation = items.length > 1;

  // Latest send/isStreaming for the window listener, so it never goes stale.
  const sendRef = useRef(send);
  const streamingRef = useRef(isStreaming);
  sendRef.current = send;
  streamingRef.current = isStreaming;

  useEffect(() => {
    const onOpen = (e: Event) => {
      const message = (e as CustomEvent<OpenChatDetail | undefined>).detail
        ?.message;
      setOpen(true);
      if (message && !streamingRef.current) void sendRef.current(message);
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, []);

  const scrollRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Don't yank the view down while the visitor is reading earlier
    // messages, and skip the smooth-scroll animation while streaming
    // (it would otherwise re-trigger on every batched text update).
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    if (distanceFromBottom > 120) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: isStreaming || prefersReducedMotion ? "auto" : "smooth",
    });
  }, [items, isStreaming, prefersReducedMotion]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      // Close the innermost layer first: suggestions menu, then the sheet.
      if (menuOpen) setMenuOpen(false);
      else setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, menuOpen]);

  useEffect(() => {
    if (!open) setMenuOpen(false);
  }, [open]);

  // Announce the assistant's reply to screen readers once it's finished
  // streaming, rather than on every token (which would spam the live region).
  const [announcement, setAnnouncement] = useState("");
  const wasStreamingRef = useRef(isStreaming);
  useEffect(() => {
    if (wasStreamingRef.current && !isStreaming) {
      const lastReply = [...items]
        .reverse()
        .find((i) => i.kind === "message" && i.role === "assistant");
      if (lastReply && lastReply.kind === "message") {
        setAnnouncement(lastReply.content);
      }
    }
    wasStreamingRef.current = isStreaming;
  }, [isStreaming, items]);

  // Keep Tab from leaving the dialog while it's open.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // Mobile: the sheet is modal (scrim + full width), so lock the page behind it.
  // Desktop: the panel floats, so the page stays scrollable.
  useEffect(() => {
    if (!open) return;
    const mobile = window.matchMedia("(max-width: 639px)");
    const previous = document.body.style.overflow;
    const apply = () => {
      document.body.style.overflow = mobile.matches ? "hidden" : previous;
    };
    apply();
    mobile.addEventListener("change", apply);
    return () => {
      mobile.removeEventListener("change", apply);
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Wheel over the panel never scrolls the page: only the message list scrolls,
  // and at its top/bottom edge (or when it's too short to scroll) the wheel stops there.
  // Edge state is cached from a rAF-throttled scroll listener so the wheel
  // handler itself never reads layout (scrollTop/clientHeight/scrollHeight).
  useEffect(() => {
    const panel = panelRef.current;
    const list = scrollRef.current;
    if (!open || !panel || !list) return;

    let atTop = true;
    let atBottom = true;
    let scrollTicking = false;
    const updateEdges = () => {
      scrollTicking = false;
      atTop = list.scrollTop <= 0;
      atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 1;
    };
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(updateEdges);
    };
    updateEdges();
    list.addEventListener("scroll", onScroll, { passive: true });

    const onWheel = (e: WheelEvent) => {
      if (!list.contains(e.target as Node)) {
        e.preventDefault();
        return;
      }
      if ((e.deltaY < 0 && atTop) || (e.deltaY > 0 && atBottom))
        e.preventDefault();
    };
    panel.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      list.removeEventListener("scroll", onScroll);
      panel.removeEventListener("wheel", onWheel);
    };
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const value = draft;
    setDraft("");
    setMenuOpen(false);
    void send(value);
  };

  const pickSuggestion = (q: string) => {
    setMenuOpen(false);
    void send(q);
    inputRef.current?.focus();
  };

  const handleReset = () => {
    setMenuOpen(false);
    setDraft("");
    reset();
    inputRef.current?.focus();
  };

  const showQuickReplies = !hasConversation && !isStreaming;
  // Once the chat has started, the suggestions live behind a composer button.
  const showMenuToggle = hasConversation && !limitReached;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close the assistant" : "Open the assistant"}
        aria-expanded={open}
        className={`fixed bottom-5 right-5 z-[70] h-14 w-14 items-center justify-center rounded-full
                   bg-green_500 text-black shadow-lg transition-transform hover:scale-105
                   focus-ring-black ${open ? "hidden sm:flex" : "flex"}`}
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
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${BOT_CONFIG.name} — AI assistant`}
            className="fixed inset-x-0 bottom-0 z-[65] flex flex-col overflow-hidden
                       rounded-t-3xl border border-grey_500 bg-black_900 font-space_grotesk
                       text-white shadow-2xl animate-page-in
                       sm:inset-x-auto sm:bottom-24 sm:right-5 sm:h-[600px] sm:max-h-[calc(100dvh-8rem)]
                       sm:w-[400px] sm:rounded-2xl"
          >
            <header className="flex items-center gap-3 border-b border-grey_500 px-4 py-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green_500 text-black">
                <BotIcon className="h-6 w-6" />
              </span>

              <div className="min-w-0 w-full flex-1">
                <div className="truncate font-advancedPixel pt-2 pb-1 text-base leading-tight tracking-normal text-white">
                  {BOT_CONFIG.name}
                </div>
                <div className="truncate text-xs leading-tight text-grey_300 mt-1.5">
                  AI assistant · answers about Serhii&apos;s work
                </div>
              </div>

              <button
                type="button"
                onClick={handleReset}
                disabled={!hasConversation || isStreaming}
                aria-label="Reset conversation"
                title="Start a new conversation"
                className="group flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-grey_500
                           bg-black_900 pl-2.5 pr-3.5 text-sm font-medium text-white
                           transition-colors hover:border-green_500 hover:text-green_500
                           focus-ring-dark
                           disabled:opacity-40 disabled:hover:border-grey_500 disabled:hover:text-white"
              >
                <svg
                  viewBox="0 0 24 24"
                  className={`h-4 w-4 transition-transform duration-300 ${
                    hasConversation && !isStreaming
                      ? "group-hover:-rotate-180"
                      : ""
                  }`}
                  aria-hidden="true"
                >
                  <path
                    d="M4 12a8 8 0 1 0 2.34-5.66M4 4v4.5h4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                Reset
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close the assistant"
                className="flex h-11 w-11 items-center justify-center rounded-full text-grey_300
                           transition-colors hover:bg-black_900 hover:text-green_500 sm:hidden focus-ring-dark"
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

            <div aria-live="polite" role="status" className="sr-only">
              {announcement}
            </div>

            <div
              ref={scrollRef}
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain px-4 py-4"
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
                                    text-base leading-[1.5] sm:max-w-[85%] sm:text-sm ${
                                      mine
                                        ? "rounded-br-md bg-green_500 text-black"
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
                      className="block rounded-2xl border border-green_500/50 bg-black_900 px-4 py-3
                                 transition-colors hover:border-green_500 focus-ring-dark"
                    >
                      <div className="text-label font-medium uppercase text-green_500">
                        Opened case study
                      </div>
                      <div className="mt-1 text-base font-bold leading-snug text-white sm:text-sm">
                        {item.title}
                      </div>
                      {item.reason && (
                        <div className="mt-0.5 text-sm leading-snug text-grey_300">
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
                      className="rounded-2xl bg-black_900 px-4 py-2.5 text-sm leading-[1.5] text-grey_300 ring-1 ring-grey_500"
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
                                 border border-grey_500 px-4 py-2.5 text-left text-sm leading-snug
                                 text-grey_300 transition-colors hover:border-green_500 hover:text-green_500 focus-ring-dark"
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
                <div className="rounded-2xl bg-black_900 px-4 py-2.5 text-sm leading-[1.5] text-error_400 ring-1 ring-error_900">
                  {error}
                </div>
              )}
            </div>

            <form
              onSubmit={submit}
              className="relative flex shrink-0 items-end gap-2 border-t border-grey_500 px-3 py-3"
              style={{
                paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
              }}
            >
              {showMenuToggle && (
                <>
                  {/* Click-away layer for the suggestions menu. */}
                  {menuOpen && (
                    <button
                      type="button"
                      tabIndex={-1}
                      aria-hidden="true"
                      onClick={() => setMenuOpen(false)}
                      className="fixed inset-0 z-0 cursor-default"
                    />
                  )}

                  <div
                    id="chat-suggestions"
                    role="menu"
                    aria-label="Suggested questions"
                    inert={!menuOpen}
                    className={`absolute inset-x-3 bottom-full z-10 mb-2 origin-bottom-left rounded-2xl
                                border border-grey_400/60 bg-black_900 p-1.5
                                shadow-[0_-12px_32px_rgba(0,0,0,0.55)] ring-1 ring-inset ring-white/5
                                transition-all duration-200 ease-out ${
                                  menuOpen
                                    ? "translate-y-0 scale-100 opacity-100"
                                    : "pointer-events-none translate-y-2 scale-95 opacity-0"
                                }`}
                  >
                    <div className="px-3 pb-1 pt-1.5 text-label font-medium uppercase text-green_500">
                      Suggested questions
                    </div>
                    {BOT_CONFIG.quickReplies.map((q) => (
                      <button
                        key={q}
                        type="button"
                        role="menuitem"
                        disabled={isStreaming}
                        onClick={() => pickSuggestion(q)}
                        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-xl
                                   px-3 py-2 text-left text-sm leading-snug text-white
                                   transition-colors hover:bg-white/[0.07] hover:text-green_500
                                   focus-visible:bg-white/[0.07] focus-visible:text-green_500 focus-ring-dark
                                   disabled:opacity-40"
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

                  <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    aria-label={
                      menuOpen
                        ? "Hide suggested questions"
                        : "Show suggested questions"
                    }
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    aria-controls="chat-suggestions"
                    className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                                border transition-colors focus-ring-dark ${
                                  menuOpen
                                    ? "border-green_500 bg-black_900 text-green_500"
                                    : "border-grey_500 text-grey_300 hover:border-green_500 hover:text-green_500"
                                }`}
                  >
                    {/* Question mark → close, cross-faded. */}
                    <span className="relative h-5 w-5">
                      <svg
                        viewBox="0 0 24 24"
                        className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                          menuOpen
                            ? "rotate-90 scale-50 opacity-0"
                            : "rotate-0 scale-100 opacity-100"
                        }`}
                        aria-hidden="true"
                      >
                        <path
                          d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.5-3 4.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                        />
                        <circle cx="12" cy="18.5" r="1.2" fill="currentColor" />
                      </svg>
                      <svg
                        viewBox="0 0 24 24"
                        className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                          menuOpen
                            ? "rotate-0 scale-100 opacity-100"
                            : "-rotate-90 scale-50 opacity-0"
                        }`}
                        aria-hidden="true"
                      >
                        <path
                          d="M6 6l12 12M18 6L6 18"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                </>
              )}

              <input
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onFocus={() => setMenuOpen(false)}
                maxLength={1000}
                disabled={limitReached}
                placeholder={
                  limitReached
                    ? "Session limit reached"
                    : "Ask about a project…"
                }
                aria-label="Message"
                className="relative z-10 h-11 min-w-0 flex-1 rounded-full bg-black px-4 font-space_grotesk text-[16px]
                           text-white placeholder:text-grey_300/70 focus:outline-none
                           focus:ring-1 focus:ring-green_500 disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={isStreaming || limitReached || !hasDraft}
                aria-label="Send"
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full
                           bg-green_500 text-black transition-[opacity,transform] duration-300
                           enabled:hover:scale-105 enabled:active:scale-95 disabled:opacity-40
                           focus-ring-dark"
              >
                {/* Points back at the input while empty; swings away once there's text to send. */}
                <svg
                  viewBox="0 0 24 24"
                  className={`h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]
                              motion-reduce:transition-none ${hasDraft ? "rotate-180" : "rotate-0"}`}
                  aria-hidden="true"
                >
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
