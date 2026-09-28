import { BOOKING_CONFIG } from "@/content/bot/booking";
import type { Interval } from "./slots";

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const CALENDAR_API = "https://www.googleapis.com/calendar/v3";

/** Marks every event the bot creates, so we can count them without a title match. */
const BOT_SOURCE = "portfolio-bot";

export interface NewEvent {
  summary: string;
  description?: string;
  start: Date;
  end: Date;
  attendeeEmail: string;
}

export interface CreatedEvent {
  htmlLink?: string;
  meetLink?: string;
}

function primaryCalendarId(): string {
  return process.env.GOOGLE_CALENDAR_ID || "primary";
}

/**
 * The calendar owner's email, listed as an accepted attendee so the visitor
 * sees the organizer confirmed. The OAuth scopes can't read it from Google,
 * so it comes from env (or GOOGLE_CALENDAR_ID when that is an address).
 */
function ownerEmail(): string | undefined {
  if (process.env.BOOKING_OWNER_EMAIL) return process.env.BOOKING_OWNER_EMAIL;
  const calendarId = primaryCalendarId();
  return calendarId.includes("@") ? calendarId : undefined;
}

/** Extra calendars (comma-separated) to also treat as busy, on top of the booking calendar. */
function busyCalendarIds(): string[] {
  const primary = primaryCalendarId();
  const extra = (process.env.GOOGLE_BUSY_CALENDAR_IDS ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);
  return [primary, ...extra.filter((id) => id !== primary)];
}

export function isCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REFRESH_TOKEN
  );
}

// Cached in module memory so a warm serverless instance reuses the access
// token instead of round-tripping to Google on every request.
let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt - 30_000 > Date.now()) {
    return cachedToken.value;
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN ?? "",
      grant_type: "refresh_token",
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    console.error("[calendar] token refresh failed with", res.status);
    throw new Error("Could not authenticate with Google Calendar.");
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = { value: data.access_token, expiresAt: Date.now() + data.expires_in * 1000 };
  return cachedToken.value;
}

/** Thin wrapper around fetch that attaches auth and never leaks Google's raw error body. */
async function calendarFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const token = await getAccessToken();
  const res = await fetch(`${CALENDAR_API}${path}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[calendar] request failed", path, res.status, detail.slice(0, 500));
    throw new Error("Google Calendar request failed.");
  }

  return res;
}

/** Busy periods across the booking calendar plus any extra calendars configured as busy sources. */
export async function getBusyIntervals(from: Date, to: Date): Promise<Interval[]> {
  const calendarIds = busyCalendarIds();

  const res = await calendarFetch("/freeBusy", {
    method: "POST",
    body: JSON.stringify({
      timeMin: from.toISOString(),
      timeMax: to.toISOString(),
      items: calendarIds.map((id) => ({ id })),
    }),
  });

  const data = (await res.json()) as {
    calendars?: Record<string, { busy?: Array<{ start: string; end: string }> }>;
  };

  const intervals: Interval[] = [];
  for (const cal of Object.values(data.calendars ?? {})) {
    for (const period of cal.busy ?? []) {
      intervals.push({ start: new Date(period.start), end: new Date(period.end) });
    }
  }
  return intervals;
}

/** Counts bot-created bookings per owner-local date (YYYY-MM-DD), for the daily cap. */
export async function countBotEventsOnDay(from: Date, to: Date): Promise<Record<string, number>> {
  const params = new URLSearchParams({
    timeMin: from.toISOString(),
    timeMax: to.toISOString(),
    privateExtendedProperty: `source=${BOT_SOURCE}`,
    singleEvents: "true",
    maxResults: "250",
  });

  const res = await calendarFetch(
    `/calendars/${encodeURIComponent(primaryCalendarId())}/events?${params.toString()}`
  );
  const data = (await res.json()) as {
    items?: Array<{ start?: { dateTime?: string; date?: string } }>;
  };

  const counts: Record<string, number> = {};
  const fmt = new Intl.DateTimeFormat("en-CA", { timeZone: BOOKING_CONFIG.timezone }); // en-CA -> YYYY-MM-DD

  for (const item of data.items ?? []) {
    const when = item.start?.dateTime ?? item.start?.date;
    if (!when) continue;
    const key = fmt.format(new Date(when));
    counts[key] = (counts[key] ?? 0) + 1;
  }
  return counts;
}

export async function createEvent(event: NewEvent): Promise<CreatedEvent> {
  const owner = ownerEmail();
  const attendees = [
    ...(owner ? [{ email: owner, responseStatus: "accepted" }] : []),
    { email: event.attendeeEmail },
  ];

  const body: Record<string, unknown> = {
    summary: event.summary,
    description: event.description,
    start: { dateTime: event.start.toISOString(), timeZone: BOOKING_CONFIG.timezone },
    end: { dateTime: event.end.toISOString(), timeZone: BOOKING_CONFIG.timezone },
    attendees,
    extendedProperties: { private: { source: BOT_SOURCE } },
  };

  if (BOOKING_CONFIG.createMeetLink) {
    body.conferenceData = {
      createRequest: {
        requestId: `booking-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        conferenceSolutionKey: { type: "hangoutsMeet" },
      },
    };
  }

  const params = new URLSearchParams({ sendUpdates: "all" });
  if (BOOKING_CONFIG.createMeetLink) params.set("conferenceDataVersion", "1");

  const res = await calendarFetch(
    `/calendars/${encodeURIComponent(primaryCalendarId())}/events?${params.toString()}`,
    { method: "POST", body: JSON.stringify(body) }
  );

  const data = (await res.json()) as {
    htmlLink?: string;
    hangoutLink?: string;
    conferenceData?: { entryPoints?: Array<{ entryPointType?: string; uri?: string }> };
  };

  const meetLink =
    data.hangoutLink ??
    data.conferenceData?.entryPoints?.find((e) => e.entryPointType === "video")?.uri;

  return { htmlLink: data.htmlLink, meetLink };
}
