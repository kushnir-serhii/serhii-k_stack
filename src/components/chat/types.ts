import type { DaySlots } from "@/lib/calendar/slots";

export interface ChatMessageItem {
  id: string;
  kind: "message";
  role: "user" | "assistant";
  content: string;
}

export interface ProjectActionItem {
  id: string;
  kind: "project";
  href: string;
  title: string;
  reason: string;
}

export interface LeadActionItem {
  id: string;
  kind: "lead";
  ok: boolean;
}

export interface BookingPrefill {
  name?: string;
  email?: string;
  topic?: string;
}

export interface BookingActionItem {
  id: string;
  kind: "booking";
  meetingType: string;
  durationMinutes: number;
  timezone: string;
  days: DaySlots[];
  prefill: BookingPrefill;
}

export type ChatItem = ChatMessageItem | ProjectActionItem | LeadActionItem | BookingActionItem;

export type StreamEvent =
  | { type: "text"; value: string }
  | { type: "action"; action: "open_project"; href: string; title: string; slug: string; reason: string }
  | { type: "action"; action: "lead_saved"; ok: boolean }
  | {
      type: "action";
      action: "booking_slots";
      meetingType: string;
      durationMinutes: number;
      timezone: string;
      days: DaySlots[];
      prefill: BookingPrefill;
    }
  | { type: "done" }
  | { type: "error"; value: string };
