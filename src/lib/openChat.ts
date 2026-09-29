export const OPEN_CHAT_EVENT = "open-chat";

export interface OpenChatDetail {
  message?: string;
}

/** Opens the AI assistant widget, optionally sending a first message. */
export function openChat(message?: string): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<OpenChatDetail>(OPEN_CHAT_EVENT, { detail: { message } }),
  );
}
