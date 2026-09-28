/**
 * Editable booking configuration.
 * Every rule the slot engine and API enforce lives here — nothing about
 * working hours, buffers or meeting lengths is hard-coded elsewhere.
 */

export interface MeetingType {
  /** Key used in the API and the chat tool. */
  id: string;
  /** Shown to the visitor. */
  label: string;
  durationMinutes: number;
}

export interface BookingConfig {
  /** IANA timezone Serhii's working hours are defined in. */
  timezone: string;
  /** 0 = Sunday … 6 = Saturday. Days outside this set are never offered. */
  workingDays: number[];
  /** Local time the working window opens, "HH:mm". */
  windowStart: string;
  /** Local time the working window closes, "HH:mm". A meeting must END by this time. */
  windowEnd: string;
  /** Meeting types the visitor can pick from. */
  meetingTypes: MeetingType[];
  /** Candidate slots are generated on this step, in minutes. */
  slotStepMinutes: number;
  /** Minutes of free time required before and after an existing event. */
  bufferMinutes: number;
  /** A slot must start at least this many hours from now. */
  minNoticeHours: number;
  /** No slots are offered beyond this many days from now. */
  horizonDays: number;
  /** Max bot-created bookings allowed on a single calendar day. */
  maxBookingsPerDay: number;
  /** Owner name shown in event titles, e.g. "Intro call: Serhii Kushnir × Julia". */
  ownerName: string;
  /** Attach a Google Meet link to created events. */
  createMeetLink: boolean;
}

export const BOOKING_CONFIG: BookingConfig = {
  timezone: "Europe/Warsaw",
  workingDays: [1, 2, 3, 4, 5],
  windowStart: "10:00",
  windowEnd: "18:00",
  meetingTypes: [
    { id: "intro", label: "Intro call", durationMinutes: 30 },
    { id: "project", label: "Project discussion", durationMinutes: 60 },
  ],
  slotStepMinutes: 30,
  bufferMinutes: 15,
  minNoticeHours: 12,
  horizonDays: 14,
  maxBookingsPerDay: 3,
  ownerName: "Serhii Kushnir",
  createMeetLink: true,
};

export function getMeetingType(id: string): MeetingType | undefined {
  return BOOKING_CONFIG.meetingTypes.find((m) => m.id === id);
}
