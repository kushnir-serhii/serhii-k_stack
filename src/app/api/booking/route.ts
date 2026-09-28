import { NextResponse, after } from "next/server";
import { BOOKING_CONFIG, getMeetingType } from "@/content/bot/booking";
import { computeAvailableSlots, validateSlot } from "@/lib/calendar/slots";
import {
  countBotEventsOnDay,
  createEvent,
  getBusyIntervals,
  isCalendarConfigured,
} from "@/lib/calendar/google";
import { sendBookingToTelegram } from "@/lib/ai/telegram";
import { checkRateLimit, getClientKey } from "@/lib/ai/rateLimit";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 120;
const MAX_TOPIC = 500;
const MAX_WEBSITE = 200;

// Booking actually writes to the calendar, so it gets a tighter bucket than
// the read-only slot lookup.
const POST_MAX_PER_MINUTE = 5;

function horizonWindow(): { from: Date; to: Date } {
  // Start a day back so bookings made earlier today still count toward the daily cap.
  const from = new Date(Date.now() - 24 * 60 * 60_000);
  const to = new Date(from.getTime() + (BOOKING_CONFIG.horizonDays + 1) * 24 * 60 * 60_000);
  return { from, to };
}

export async function GET(req: Request) {
  const limit = checkRateLimit(`booking-get:${getClientKey(req)}`);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Give it a minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  if (!isCalendarConfigured()) {
    return NextResponse.json({ error: "Booking is not configured yet." }, { status: 503 });
  }

  const url = new URL(req.url);
  const typeId = url.searchParams.get("type") ?? "";
  const type = getMeetingType(typeId);
  if (!type) {
    return NextResponse.json({ error: "Unknown meeting type." }, { status: 400 });
  }

  try {
    const now = new Date();
    const { from, to } = horizonWindow();
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

    return NextResponse.json(
      {
        timezone: BOOKING_CONFIG.timezone,
        type: typeId,
        durationMinutes: type.durationMinutes,
        days,
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("[booking] failed to compute slots", error);
    return NextResponse.json({ error: "Could not load availability." }, { status: 502 });
  }
}

interface BookingPayload {
  type: string;
  start: string;
  name: string;
  email: string;
  topic?: string;
  website?: string; // honeypot
}

function isValidPayload(value: unknown): value is BookingPayload {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;

  if (typeof v.type !== "string" || typeof v.start !== "string") return false;
  if (typeof v.name !== "string" || !v.name.trim() || v.name.length > MAX_NAME) return false;
  if (typeof v.email !== "string" || !EMAIL_RE.test(v.email) || v.email.length > MAX_NAME) return false;
  if (v.topic !== undefined && (typeof v.topic !== "string" || v.topic.length > MAX_TOPIC)) return false;
  if (v.website !== undefined && (typeof v.website !== "string" || v.website.length > MAX_WEBSITE)) return false;

  return true;
}

export async function POST(req: Request) {
  const limit = checkRateLimit(`booking-post:${getClientKey(req)}`, POST_MAX_PER_MINUTE);
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Give it a minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  if (!isCalendarConfigured()) {
    return NextResponse.json({ error: "Booking is not configured yet." }, { status: 503 });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  if (!isValidPayload(payload)) {
    return NextResponse.json({ error: "Invalid booking details." }, { status: 400 });
  }

  // Honeypot: bots that fill hidden fields get a fake success, no calendar write.
  if (payload.website) {
    return NextResponse.json({ ok: true, start: payload.start, end: payload.start });
  }

  const type = getMeetingType(payload.type);
  if (!type) {
    return NextResponse.json({ error: "Unknown meeting type." }, { status: 400 });
  }

  const start = new Date(payload.start);
  if (Number.isNaN(start.getTime())) {
    return NextResponse.json({ error: "Invalid start time." }, { status: 400 });
  }

  try {
    const now = new Date();
    const { from, to } = horizonWindow();
    const [busy, botBookingCounts] = await Promise.all([
      getBusyIntervals(from, to),
      countBotEventsOnDay(from, to),
    ]);

    // Never trust the client or the LLM with timing — re-check every rule
    // right before writing to the calendar.
    const check = validateSlot(start, payload.type, {
      config: BOOKING_CONFIG,
      busy,
      botBookingCounts,
      now,
    });

    if (!check.ok) {
      return NextResponse.json(
        { error: "That time just got taken. Pick another one below." },
        { status: 409 }
      );
    }

    const end = new Date(start.getTime() + type.durationMinutes * 60_000);
    const name = payload.name.trim().slice(0, MAX_NAME);
    const email = payload.email.trim().slice(0, MAX_NAME);
    const topic = payload.topic?.trim().slice(0, MAX_TOPIC) || undefined;

    const created = await createEvent({
      summary: `${type.label} with ${name}`,
      description: topic,
      start,
      end,
      attendeeEmail: email,
    });

    // A failed notification must never fail the booking itself — the event
    // is already on the calendar and the visitor already has an invite.
    // `after` keeps the serverless function alive until the send finishes.
    after(() => sendBookingToTelegram({
      meetingType: type.label,
      start,
      end,
      name,
      email,
      topic,
      meetLink: created.meetLink,
    }));

    return NextResponse.json({
      ok: true,
      start: start.toISOString(),
      end: end.toISOString(),
      meetLink: created.meetLink,
      htmlLink: created.htmlLink,
    });
  } catch (error) {
    console.error("[booking] failed to create event", error);
    return NextResponse.json({ error: "Could not book that slot. Try again." }, { status: 502 });
  }
}
