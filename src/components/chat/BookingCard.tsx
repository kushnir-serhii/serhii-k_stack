"use client";

import { useId, useMemo, useState, type FormEvent } from "react";
import { FormField } from "./FormField";
import type { BookingActionItem } from "./types";

interface DayGroup {
  date: string; // visitor-local date key, YYYY-MM-DD
  label: string; // e.g. "Tue, Sep 30"
  slots: string[]; // ISO UTC strings, chronological
}

type Status = "picking" | "submitting" | "success" | "conflict" | "error";

interface SuccessInfo {
  start: string;
  meetLink?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FieldErrors {
  name?: string;
  email?: string;
}

function visitorTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

/** Regroups the owner-local day buckets by the VISITOR's local calendar date. */
function groupByVisitorDate(days: BookingActionItem["days"], timezone: string): DayGroup[] {
  const dayFmt = new Intl.DateTimeFormat("en-CA", { timeZone: timezone }); // en-CA -> YYYY-MM-DD
  const labelFmt = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const groups = new Map<string, DayGroup>();
  for (const day of days) {
    for (const iso of day.slots) {
      const date = new Date(iso);
      const key = dayFmt.format(date);
      let group = groups.get(key);
      if (!group) {
        group = { date: key, label: labelFmt.format(date), slots: [] };
        groups.set(key, group);
      }
      group.slots.push(iso);
    }
  }
  return [...groups.values()];
}

export function BookingCard({ item }: { item: BookingActionItem }) {
  const idPrefix = useId();
  const timezone = useMemo(visitorTimezone, []);
  const [days, setDays] = useState(() => groupByVisitorDate(item.days, timezone));
  const [dayIndex, setDayIndex] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("picking");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState<SuccessInfo | null>(null);

  const [name, setName] = useState(item.prefill.name ?? "");
  const [email, setEmail] = useState(item.prefill.email ?? "");
  const [topic, setTopic] = useState(item.prefill.topic ?? "");
  const [website, setWebsite] = useState(""); // honeypot
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const timeFmt = useMemo(
    () => new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", timeZone: timezone }),
    [timezone]
  );
  const dateTimeFmt = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        timeZone: timezone,
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    [timezone]
  );

  const activeDay = days[dayIndex] as DayGroup | undefined;

  const refreshSlots = async () => {
    setStatus("picking");
    setErrorMessage(null);
    setSelectedSlot(null);
    try {
      const res = await fetch(`/api/booking?type=${encodeURIComponent(item.meetingType)}`, {
        cache: "no-store",
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Could not refresh availability.");
      const regrouped = groupByVisitorDate(body.days ?? [], timezone);
      setDays(regrouped);
      setDayIndex(0);
    } catch (err) {
      setStatus("error");
      setErrorMessage((err as Error).message || "Could not refresh availability.");
    }
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedSlot || status === "submitting") return;

    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = "Please enter your name.";
    if (!email.trim()) errors.email = "Please enter your email.";
    else if (!EMAIL_RE.test(email.trim())) errors.email = "Enter a valid email address.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: item.meetingType,
          start: selectedSlot,
          name,
          email,
          topic: topic || undefined,
          website: website || undefined,
        }),
      });
      const body = await res.json();

      if (res.status === 409) {
        setStatus("conflict");
        setErrorMessage(body.error ?? "That time just got taken.");
        return;
      }
      if (!res.ok) throw new Error(body.error ?? "Could not book that slot.");

      setSuccess({ start: body.start, meetLink: body.meetLink });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage((err as Error).message || "Something went wrong. Try again.");
    }
  };

  if (status === "success" && success) {
    return (
      <div role="status" className="rounded-2xl border border-green_500/50 bg-black_900 px-4 py-3">
        <div className="text-label font-medium uppercase text-green_500">
          Booked
        </div>
        <div className="mt-1 text-base font-bold leading-snug text-white sm:text-sm">
          {dateTimeFmt.format(new Date(success.start))}
        </div>
        {success.meetLink && (
          <a
            href={success.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm leading-snug text-green_500 underline underline-offset-2 rounded-sm focus-ring-dark"
          >
            Join with Google Meet
          </a>
        )}
        <div className="mt-1 text-sm leading-snug text-grey_300">
          Invite sent to your email.
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-grey_500 bg-black_900 px-4 py-3">
      <div className="text-label font-medium uppercase text-green_500">
        Pick a time — {item.durationMinutes} min
      </div>

      {days.length === 0 ? (
        <div className="mt-2 text-sm leading-snug text-grey_300">
          No open times right now — leave your contact instead and Serhii will reach out.
        </div>
      ) : (
        <>
          {/* Day strip */}
          <div role="group" className="mt-2 flex gap-2 overflow-x-auto pb-3 pt-1" aria-label="Choose a day">
            {days.map((day, i) => (
              <button
                key={day.date}
                type="button"
                aria-pressed={i === dayIndex}
                onClick={() => {
                  setDayIndex(i);
                  setSelectedSlot(null);
                }}
                className={`flex min-h-11 shrink-0 items-center rounded-xl px-3 py-2 text-sm leading-tight transition-colors focus-ring-dark ${
                  i === dayIndex
                    ? "bg-green_500 text-black"
                    : "bg-black text-grey_300 ring-1 ring-grey_500 hover:text-green_500"
                }`}
              >
                {day.label}
              </button>
            ))}
          </div>

          {/* Time chips for the selected day */}
          {activeDay && (
            <div className="mt-2 flex flex-wrap gap-2">
              {activeDay.slots.map((iso) => (
                <button
                  key={iso}
                  type="button"
                  aria-pressed={selectedSlot === iso}
                  aria-label={`${activeDay.label}, ${timeFmt.format(new Date(iso))}`}
                  onClick={() => setSelectedSlot(selectedSlot === iso ? null : iso)}
                  className={`flex min-h-11 items-center rounded-lg px-3 py-1.5 text-sm leading-tight transition-colors focus-ring-dark ${
                    selectedSlot === iso
                      ? "bg-green_500 text-black"
                      : "bg-black text-grey_300 ring-1 ring-grey_500 hover:text-green_500"
                  }`}
                >
                  {timeFmt.format(new Date(iso))}
                </button>
              ))}
            </div>
          )}

          <div className="mt-2 text-xs leading-snug text-grey_300">
            Times in your timezone ({timezone}). Serhii is in Europe/Warsaw.
          </div>
        </>
      )}

      {status === "conflict" && (
        <div role="alert" className="mt-3 rounded-xl bg-black px-3 py-2 text-sm leading-snug text-error_400 ring-1 ring-error_900">
          {errorMessage}
          <button
            type="button"
            onClick={refreshSlots}
            className="ml-2 rounded-sm underline underline-offset-2 hover:text-error_300 focus-ring-dark"
          >
            Refresh available times
          </button>
        </div>
      )}

      {status === "error" && errorMessage && (
        <div role="alert" className="mt-3 rounded-xl bg-black px-3 py-2 text-sm leading-snug text-error_400 ring-1 ring-error_900">
          {errorMessage}
        </div>
      )}

      {selectedSlot && status !== "conflict" && (
        <form onSubmit={submit} noValidate className="mt-3 flex flex-col gap-2 border-t border-grey_500 pt-3">
          <FormField
            id={`${idPrefix}-booking-name`}
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: undefined }));
            }}
            error={fieldErrors.name}
            maxLength={120}
          />

          <FormField
            id={`${idPrefix}-booking-email`}
            label="Email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            error={fieldErrors.email}
            maxLength={120}
          />

          <FormField
            id={`${idPrefix}-booking-topic`}
            label="Topic (optional)"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            maxLength={500}
          />

          {/* Honeypot — hidden from real visitors, only bots fill it in. */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor={`${idPrefix}-booking-website`}>Leave this field empty</label>
            <input
              id={`${idPrefix}-booking-website`}
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-1 h-11 rounded-xl bg-green_500 text-sm font-medium text-black
                       transition-opacity disabled:opacity-50 focus-ring-dark"
          >
            {status === "submitting" ? "Booking…" : "Book"}
          </button>
        </form>
      )}
    </div>
  );
}
