import { BOOKING_CONFIG, getMeetingType, type BookingConfig } from "@/content/bot/booking";

/** A busy period, as UTC instants. */
export interface Interval {
  start: Date;
  end: Date;
}

export interface DaySlots {
  /** Owner-local calendar date, "YYYY-MM-DD". */
  date: string;
  /** Available start times, ISO UTC strings. */
  slots: string[];
}

interface ZonedParts {
  year: number;
  month: number; // 1-12
  day: number;
  hour: number;
  minute: number;
  /** 0 = Sunday … 6 = Saturday, matching Date#getDay. */
  weekday: number;
}

const PARTS_FORMATTER_CACHE = new Map<string, Intl.DateTimeFormat>();

function partsFormatter(timeZone: string): Intl.DateTimeFormat {
  let fmt = PARTS_FORMATTER_CACHE.get(timeZone);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    PARTS_FORMATTER_CACHE.set(timeZone, fmt);
  }
  return fmt;
}

/** Reads the wall-clock date/time a UTC instant renders as in `timeZone`. */
function getZonedParts(utc: Date, timeZone: string): ZonedParts {
  const map: Record<string, string> = {};
  for (const p of partsFormatter(timeZone).formatToParts(utc)) {
    if (p.type !== "literal") map[p.type] = p.value;
  }
  const year = Number(map.year);
  const month = Number(map.month);
  const day = Number(map.day);
  const hour = Number(map.hour === "24" ? "0" : map.hour);
  const minute = Number(map.minute);

  // Day-of-week is timezone-independent once we have the local y/m/d, so
  // building it as if it were UTC gives the correct local weekday.
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay();

  return { year, month, day, hour, minute, weekday };
}

/**
 * Offset (ms) such that `local-time-read-as-UTC = utc + offset`.
 * Used by zonedWallTimeToUtc below — see the DST note there.
 */
function tzOffsetMs(timeZone: string, utcMs: number): number {
  const p = getZonedParts(new Date(utcMs), timeZone);
  const asUtc = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute);
  return asUtc - utcMs;
}

/**
 * Converts a wall-clock time in `timeZone` to the UTC instant it represents.
 * No timezone database ships with Node by default, so this leans on
 * Intl.DateTimeFormat with a two-pass guess-and-correct — the standard trick
 * for handling the DST transition without an extra dependency.
 */
function zonedWallTimeToUtc(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  timeZone: string
): Date {
  const guess = Date.UTC(year, month - 1, day, hour, minute);
  const offset = tzOffsetMs(timeZone, guess);
  const utc = guess - offset;

  // Re-check near a DST boundary: the offset at `utc` can differ from the
  // offset at `guess` by up to an hour.
  const offset2 = tzOffsetMs(timeZone, utc);
  return offset2 === offset ? new Date(utc) : new Date(guess - offset2);
}

function toDateKey(p: Pick<ZonedParts, "year" | "month" | "day">): string {
  return `${p.year}-${String(p.month).padStart(2, "0")}-${String(p.day).padStart(2, "0")}`;
}

function parseHHmm(value: string): { hour: number; minute: number } {
  const [hour, minute] = value.split(":").map(Number);
  return { hour, minute };
}

function overlaps(aStart: Date, aEnd: Date, bStart: Date, bEnd: Date): boolean {
  return aStart < bEnd && bStart < aEnd;
}

/** Bot bookings already on the calendar for a given owner-local date, keyed like `toDateKey`. */
export type BotBookingCounts = Record<string, number>;

interface SlotContext {
  config: BookingConfig;
  busy: Interval[];
  botBookingCounts: BotBookingCounts;
  now: Date;
}

/**
 * Re-runs every booking rule for a single candidate start time. Used both by
 * the slot generator below and, critically, by the API right before it
 * writes to the calendar — the LLM and the client are never trusted with
 * timing decisions.
 */
export function validateSlot(
  start: Date,
  typeId: string,
  ctx: SlotContext
): { ok: true } | { ok: false; reason: string } {
  const type = getMeetingType(typeId);
  if (!type) return { ok: false, reason: "Unknown meeting type." };

  const { config, busy, botBookingCounts, now } = ctx;
  const end = new Date(start.getTime() + type.durationMinutes * 60_000);

  const minNoticeMs = config.minNoticeHours * 60 * 60_000;
  if (start.getTime() < now.getTime() + minNoticeMs) {
    return { ok: false, reason: "Too close to now." };
  }

  const horizonMs = config.horizonDays * 24 * 60 * 60_000;
  if (start.getTime() > now.getTime() + horizonMs) {
    return { ok: false, reason: "Beyond the booking horizon." };
  }

  const startParts = getZonedParts(start, config.timezone);
  const endParts = getZonedParts(end, config.timezone);

  if (!config.workingDays.includes(startParts.weekday)) {
    return { ok: false, reason: "Not a working day." };
  }

  const windowStart = parseHHmm(config.windowStart);
  const windowEnd = parseHHmm(config.windowEnd);
  const startMinutes = startParts.hour * 60 + startParts.minute;
  const endMinutes = endParts.hour * 60 + endParts.minute;
  const windowStartMinutes = windowStart.hour * 60 + windowStart.minute;
  const windowEndMinutes = windowEnd.hour * 60 + windowEnd.minute;

  // The end must land on the same local day as the start and inside the
  // window — this also rejects the rare slot pushed past midnight by DST.
  const sameDay = toDateKey(endParts) === toDateKey(startParts);
  if (!sameDay || startMinutes < windowStartMinutes || endMinutes > windowEndMinutes) {
    return { ok: false, reason: "Outside working hours." };
  }

  const bufferMs = config.bufferMinutes * 60_000;
  const paddedStart = new Date(start.getTime() - bufferMs);
  const paddedEnd = new Date(end.getTime() + bufferMs);
  const conflicts = busy.some((b) => overlaps(paddedStart, paddedEnd, b.start, b.end));
  if (conflicts) return { ok: false, reason: "Overlaps an existing event." };

  const dayKey = toDateKey(startParts);
  const bookedToday = botBookingCounts[dayKey] ?? 0;
  if (bookedToday >= config.maxBookingsPerDay) {
    return { ok: false, reason: "Daily booking limit reached." };
  }

  return { ok: true };
}

/**
 * Computes every open slot for a meeting type across the booking horizon,
 * grouped by owner-local date. Pure function — no I/O, no Date.now() calls
 * beyond what's passed in, so it's trivial to unit test.
 */
export function computeAvailableSlots(
  typeId: string,
  ctx: SlotContext
): DaySlots[] {
  const type = getMeetingType(typeId);
  if (!type) return [];

  const { config, now } = ctx;
  const windowStart = parseHHmm(config.windowStart);
  const windowEnd = parseHHmm(config.windowEnd);
  const windowEndMinutes = windowEnd.hour * 60 + windowEnd.minute;
  const lastStartMinutes = windowEndMinutes - type.durationMinutes;
  if (lastStartMinutes < windowStart.hour * 60 + windowStart.minute) return [];

  const days: DaySlots[] = [];
  const nowParts = getZonedParts(now, config.timezone);

  for (let offset = 0; offset <= config.horizonDays; offset++) {
    // Walk owner-local calendar dates, not UTC dates — a step of one local
    // day is not always 24h across a DST transition, so we add days via the
    // UTC-as-wall-clock representation and only convert back to real UTC
    // per candidate slot.
    const dayUtcAsWallClock = Date.UTC(nowParts.year, nowParts.month - 1, nowParts.day + offset);
    const d = new Date(dayUtcAsWallClock);
    const year = d.getUTCFullYear();
    const month = d.getUTCMonth() + 1;
    const day = d.getUTCDate();
    const weekday = d.getUTCDay();

    if (!config.workingDays.includes(weekday)) continue;

    const dateKey = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if ((ctx.botBookingCounts[dateKey] ?? 0) >= config.maxBookingsPerDay) continue;

    const slots: string[] = [];
    for (
      let minute = windowStart.hour * 60 + windowStart.minute;
      minute <= lastStartMinutes;
      minute += config.slotStepMinutes
    ) {
      const hour = Math.floor(minute / 60);
      const min = minute % 60;
      const start = zonedWallTimeToUtc(year, month, day, hour, min, config.timezone);
      const result = validateSlot(start, typeId, ctx);
      if (result.ok) slots.push(start.toISOString());
    }

    if (slots.length) days.push({ date: dateKey, slots });
  }

  return days;
}

/** Convenience wrapper binding the default config, for callers that don't need to override it. */
export function computeAvailableSlotsWithDefaults(
  typeId: string,
  busy: Interval[],
  botBookingCounts: BotBookingCounts,
  now: Date = new Date()
): DaySlots[] {
  return computeAvailableSlots(typeId, {
    config: BOOKING_CONFIG,
    busy,
    botBookingCounts,
    now,
  });
}
