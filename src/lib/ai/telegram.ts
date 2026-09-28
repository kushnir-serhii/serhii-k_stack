export interface Lead {
  name: string;
  contact: string;
  message?: string;
}

export interface Booking {
  meetingType: string;
  start: Date;
  end: Date;
  name: string;
  email: string;
  topic?: string;
  meetLink?: string;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Posts a message to the private Telegram chat.
 * Returns false instead of throwing — a failed notification must never break
 * the conversation for the visitor. Shared by every notification below.
 */
async function sendTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[telegram] not configured, message dropped:", text);
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      console.error("[telegram] responded with", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[telegram] request failed", error);
    return false;
  }
}

/** Sends a lead to a private Telegram chat. */
export async function sendLeadToTelegram(lead: Lead): Promise<boolean> {
  const text = [
    "\u{1F525} <b>New lead from the portfolio bot</b>",
    "",
    `<b>Name:</b> ${escapeHtml(lead.name)}`,
    `<b>Contact:</b> ${escapeHtml(lead.contact)}`,
    lead.message ? `<b>Task:</b> ${escapeHtml(lead.message)}` : null,
    "",
    `<i>${new Date().toISOString()}</i>`,
  ]
    .filter(Boolean)
    .join("\n");

  return sendTelegram(text);
}

/** Sends a booking confirmation to the private Telegram chat. */
export async function sendBookingToTelegram(booking: Booking): Promise<boolean> {
  const text = [
    "\u{1F4C5} <b>New booking from the portfolio bot</b>",
    "",
    `<b>Type:</b> ${escapeHtml(booking.meetingType)}`,
    `<b>When:</b> ${escapeHtml(booking.start.toISOString())} → ${escapeHtml(booking.end.toISOString())}`,
    `<b>Name:</b> ${escapeHtml(booking.name)}`,
    `<b>Email:</b> ${escapeHtml(booking.email)}`,
    booking.topic ? `<b>Topic:</b> ${escapeHtml(booking.topic)}` : null,
    booking.meetLink ? `<b>Meet:</b> ${escapeHtml(booking.meetLink)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return sendTelegram(text);
}
