"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { BOT_CONFIG } from "@/content/bot/bot";
import type { ChatItem, ChatMessageItem, StreamEvent } from "./types";

let counter = 0;
const nextId = () => `c${Date.now().toString(36)}${counter++}`;

const GREETING: ChatMessageItem = {
  id: "greeting",
  kind: "message",
  role: "assistant",
  content: BOT_CONFIG.greeting,
};

export function useChatBot() {
  const router = useRouter();
  const [items, setItems] = useState<ChatItem[]>([GREETING]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const userMessageCount = items.filter(
    (i) => i.kind === "message" && i.role === "user"
  ).length;
  const limitReached = userMessageCount >= BOT_CONFIG.maxMessagesPerSession;

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isStreaming || limitReached) return;

      setError(null);

      const userItem: ChatMessageItem = {
        id: nextId(),
        kind: "message",
        role: "user",
        content: trimmed,
      };
      const replyId = nextId();

      // History sent to the API: messages only, greeting excluded.
      const history = [...items, userItem]
        .filter(
          (i): i is ChatMessageItem => i.kind === "message" && i.id !== "greeting"
        )
        .map((i) => ({ role: i.role, content: i.content }));

      setItems((prev) => [
        ...prev,
        userItem,
        { id: replyId, kind: "message", role: "assistant", content: "" },
      ]);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      // Booking cards render below the bot's reply, so hold them back
      // until the whole response has finished streaming in.
      let pendingBooking: ChatItem | null = null;
      const flushPendingBooking = () => {
        if (!pendingBooking) return;
        const booking = pendingBooking;
        pendingBooking = null;
        setItems((prev) => [...prev, booking]);
      };

      // Chunks can arrive many times per second; batch them into at most
      // one state update per animation frame instead of one per chunk.
      let pendingText = "";
      let flushHandle: number | null = null;
      const flushPendingText = () => {
        flushHandle = null;
        if (!pendingText) return;
        const chunk = pendingText;
        pendingText = "";
        setItems((prev) =>
          prev.map((i) =>
            i.id === replyId && i.kind === "message"
              ? { ...i, content: i.content + chunk }
              : i
          )
        );
      };
      const appendText = (value: string) => {
        pendingText += value;
        if (flushHandle == null) {
          flushHandle = requestAnimationFrame(flushPendingText);
        }
      };

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error ?? "The assistant is unavailable.");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        const handle = (event: StreamEvent) => {
          if (event.type === "text") {
            appendText(event.value);
          } else if (event.type === "error") {
            setError(event.value);
          } else if (event.type === "action" && event.action === "open_project") {
            setItems((prev) => [
              ...prev,
              {
                id: nextId(),
                kind: "project",
                href: event.href,
                title: event.title,
                reason: event.reason,
              },
            ]);
            router.push(event.href);
          } else if (event.type === "action" && event.action === "lead_saved") {
            setItems((prev) => [
              ...prev,
              { id: nextId(), kind: "lead", ok: event.ok },
            ]);
          } else if (event.type === "action" && event.action === "booking_slots") {
            pendingBooking = {
              id: nextId(),
              kind: "booking",
              meetingType: event.meetingType,
              durationMinutes: event.durationMinutes,
              timezone: event.timezone,
              days: event.days,
              prefill: event.prefill,
            };
          } else if (event.type === "done") {
            flushPendingBooking();
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.trim()) continue;
            try {
              handle(JSON.parse(line) as StreamEvent);
            } catch {
              // ignore malformed line
            }
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError((err as Error).message || "Network error.");
        }
      } finally {
        // Flush any text batched for the next animation frame so nothing
        // arriving right as the stream ends gets dropped by the check below.
        if (flushHandle != null) cancelAnimationFrame(flushHandle);
        flushPendingText();
        // In case the stream ended (error/abort) before a "done" event.
        flushPendingBooking();
        // Drop the placeholder if nothing ever arrived.
        setItems((prev) =>
          prev.filter(
            (i) => !(i.id === replyId && i.kind === "message" && !i.content)
          )
        );
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [items, isStreaming, limitReached, router]
  );

  const stop = useCallback(() => abortRef.current?.abort(), []);

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setItems([GREETING]);
    setError(null);
  }, []);

  return { items, isStreaming, error, limitReached, send, stop, reset };
}
