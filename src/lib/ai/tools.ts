import type { FunctionDeclaration } from "./openai";
import { BOOKING_CONFIG } from "@/content/bot/booking";

export const TOOLS: FunctionDeclaration[] = [
  {
    name: "open_project",
    description:
      "Open the case-study page for one of Serhii's projects in the visitor's browser. Call this whenever a specific project is the answer, instead of describing it at length.",
    parameters: {
      type: "object",
      properties: {
        slug: {
          type: "string",
          description: "The project slug exactly as it appears in the knowledge base.",
        },
        reason: {
          type: "string",
          description: "One short sentence telling the visitor why this case is relevant.",
        },
      },
      required: ["slug", "reason"],
    },
  },
  {
    name: "save_lead",
    description:
      "Send the visitor's contact details to Serhii. Only call this once the visitor has actually given a contact.",
    parameters: {
      type: "object",
      properties: {
        name: { type: "string", description: "Visitor's name." },
        contact: {
          type: "string",
          description: "Email, Telegram handle, phone or LinkedIn given by the visitor.",
        },
        message: {
          type: "string",
          description: "What the visitor needs, in one or two sentences.",
        },
      },
      required: ["name", "contact"],
    },
  },
  {
    name: "show_booking_slots",
    description:
      "Show the visitor real, bookable time slots on Serhii's calendar as an interactive card. Call this when the visitor wants to talk, meet, call or schedule time with Serhii — never invent or state times yourself, only this tool knows the real calendar.",
    parameters: {
      type: "object",
      properties: {
        type: {
          type: "string",
          description: "Which meeting type to show slots for.",
          enum: BOOKING_CONFIG.meetingTypes.map((m) => m.id),
        },
        reason: {
          type: "string",
          description: "One short sentence telling the visitor why a call makes sense now.",
        },
        name: {
          type: "string",
          description: "Visitor's name, if they already gave it, to prefill the booking form.",
        },
        email: {
          type: "string",
          description: "Visitor's email, if they already gave it, to prefill the booking form.",
        },
        topic: {
          type: "string",
          description: "What the visitor wants to discuss, if known, to prefill the booking form.",
        },
      },
      required: ["type", "reason"],
    },
  },
];
