import { NextResponse } from "next/server";
import { streamOpenAI, type ChatMessage, type ToolCall } from "@/lib/ai/openai";
import { TOOLS } from "@/lib/ai/tools";
import { buildSystemPrompt } from "@/lib/ai/systemPrompt";
import { PROJECT_INDEX } from "@/lib/ai/knowledge";
import { sendLeadToTelegram } from "@/lib/ai/telegram";
import { checkRateLimit, getClientKey } from "@/lib/ai/rateLimit";
import { BOOKING_CONFIG, getMeetingType } from "@/content/bot/booking";
import { computeAvailableSlots } from "@/lib/calendar/slots";
import { countBotEventsOnDay, getBusyIntervals, isCalendarConfigured } from "@/lib/calendar/google";

export const runtime = "nodejs";
export const maxDuration = 30;

const MAX_MESSAGES = 30;
const MAX_CHARS = 1000;
const MAX_TOOL_ROUNDS = 3;

interface ClientMessage {
  role: "user" | "assistant";
  content: string;
}

function isValidPayload(value: unknown): value is { messages: ClientMessage[] } {
  if (!value || typeof value !== "object") return false;
  const messages = (value as { messages?: unknown }).messages;
  if (!Array.isArray(messages) || messages.length === 0) return false;
  if (messages.length > MAX_MESSAGES) return false;

  return messages.every(
    (m) =>
      m &&
      typeof m === "object" &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.length > 0 &&
      m.content.length <= MAX_CHARS
  );
}

/** Runs a tool the model asked for and returns what to send back to it. */
async function runTool(
  name: string,
  args: Record<string, unknown>
): Promise<{ response: Record<string, unknown>; clientEvent?: object }> {
  if (name === "open_project") {
    const slug = String(args.slug ?? "");
    const project = PROJECT_INDEX.get(slug);
    if (!project) {
      return { response: { ok: false, error: "Unknown project slug." } };
    }
    return {
      response: { ok: true, href: project.href, title: project.title },
      clientEvent: {
        type: "action",
        action: "open_project",
        href: project.href,
        title: project.title,
        slug,
        reason: typeof args.reason === "string" ? args.reason : "",
      },
    };
  }

  if (name === "save_lead") {
    const name_ = String(args.name ?? "").trim();
    const contact = String(args.contact ?? "").trim();
    if (!name_ || !contact) {
      return { response: { ok: false, error: "Name and contact are required." } };
    }

    const delivered = await sendLeadToTelegram({
      name: name_.slice(0, 120),
      contact: contact.slice(0, 200),
      message: String(args.message ?? "").slice(0, 800) || undefined,
    });

    return {
      response: delivered
        ? { ok: true, note: "Lead delivered to Serhii." }
        : { ok: false, error: "Could not deliver right now." },
      clientEvent: { type: "action", action: "lead_saved", ok: delivered },
    };
  }

  if (name === "show_booking_slots") {
    const typeId = String(args.type ?? "");
    const type = getMeetingType(typeId);
    if (!type) {
      return { response: { ok: false, error: "Unknown meeting type." } };
    }

    if (!isCalendarConfigured()) {
      return {
        response: {
          ok: false,
          note: "Booking is not set up right now — collect a contact with save_lead instead.",
        },
      };
    }

    try {
      const now = new Date();
      // A day back so bookings made earlier today still count toward the daily cap.
      const from = new Date(now.getTime() - 24 * 60 * 60_000);
      const to = new Date(from.getTime() + (BOOKING_CONFIG.horizonDays + 1) * 24 * 60 * 60_000);
      const [busy, botBookingCounts] = await Promise.all([
        getBusyIntervals(from, to),
        countBotEventsOnDay(from, to),
      ]);

      const days = computeAvailableSlots(typeId, {
        config: BOOKING_CONFIG,
        busy,
        botBookingCounts,
        now,
      });
      const totalSlots = days.reduce((sum, d) => sum + d.slots.length, 0);

      return {
        response: {
          ok: totalSlots > 0,
          note: totalSlots
            ? `${totalSlots} slots shown to the visitor in a booking card. First options: ${days
                .slice(0, 2)
                .map((d) => `${d.date} (${d.slots.length})`)
                .join(", ")}.`
            : "No open slots in the booking window — tell the visitor and offer save_lead instead.",
        },
        clientEvent: {
          type: "action",
          action: "booking_slots",
          meetingType: typeId,
          durationMinutes: type.durationMinutes,
          timezone: BOOKING_CONFIG.timezone,
          days,
          prefill: {
            name: typeof args.name === "string" ? args.name : undefined,
            email: typeof args.email === "string" ? args.email : undefined,
            topic: typeof args.topic === "string" ? args.topic : undefined,
          },
        },
      };
    } catch (error) {
      console.error("[chat] show_booking_slots failed", error);
      return {
        response: {
          ok: false,
          note: "Could not load the calendar — fall back to save_lead instead.",
        },
      };
    }
  }

  return { response: { ok: false, error: "Unknown tool." } };
}

export async function POST(req: Request) {
  const limit = checkRateLimit(getClientKey(req));
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many messages. Give it a minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!isValidPayload(payload)) {
    return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "The assistant is not configured yet." },
      { status: 503 }
    );
  }

  const messages: ChatMessage[] = [
    { role: "system", content: buildSystemPrompt() },
    ...payload.messages.map((m) => ({ role: m.role, content: m.content })),
  ];

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: object) =>
        controller.enqueue(encoder.encode(JSON.stringify(event) + "\n"));

      try {
        for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
          let text = "";
          let calls: ToolCall[] = [];

          for await (const event of streamOpenAI({ messages, tools: TOOLS })) {
            if (event.type === "text") {
              text += event.value;
              send(event);
            } else {
              calls = event.calls;
            }
          }

          if (!calls.length) break;

          messages.push({
            role: "assistant",
            content: text || null,
            tool_calls: calls.map((c) => ({
              id: c.id,
              type: "function",
              function: { name: c.name, arguments: JSON.stringify(c.args) },
            })),
          });

          for (const call of calls) {
            const result = await runTool(call.name, call.args);
            if (result.clientEvent) send(result.clientEvent);
            messages.push({
              role: "tool",
              tool_call_id: call.id,
              content: JSON.stringify(result.response),
            });
          }
        }

        send({ type: "done" });
      } catch (error) {
        console.error("[chat] stream failed", error);
        send({
          type: "error",
          value: "Something went wrong on my side. Try again in a moment.",
        });
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
