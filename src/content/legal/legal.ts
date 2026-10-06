/**
 * Privacy policy and terms of service copy.
 * Kept in sync with what the site actually does — if a data flow changes
 * (new provider, analytics, cookies), update the matching section here.
 */

export interface LegalSection {
  id: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
}

export interface LegalDocument {
  title: string;
  description: string;
  /** Human-readable effective date. */
  updated: string;
  intro: string;
  sections: LegalSection[];
}

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  description:
    "What personal data this site collects through the chat assistant and call booking, why, and who processes it.",
  updated: "October 6, 2026",
  intro:
    "This site is the portfolio of Serhii Kushnir, a freelance developer, who is also the person responsible for your data. It collects as little as possible: only what you choose to share in the chat or when booking a call.",
  sections: [
    {
      id: "what-we-collect",
      title: "What is collected",
      items: [
        "Chat messages you send to the AI assistant (Sonia).",
        "Your name, contact details (email, Telegram, phone or LinkedIn) and a short description of your task, if you choose to leave them in the chat.",
        "Your name, email, chosen time and meeting topic when you book a call.",
        "Your IP address, held briefly in server memory to rate-limit requests and prevent abuse. It is not stored or linked to you.",
      ],
      paragraphs: [
        "The site does not use cookies, analytics, advertising trackers or browser storage. Chat history lives only in the open browser tab and is gone when you close it.",
      ],
    },
    {
      id: "how-it-is-used",
      title: "How it is used",
      items: [
        "To answer your questions in the chat.",
        "To reply to you about a project you described.",
        "To schedule, confirm and hold the call you booked.",
      ],
      paragraphs: [
        "Your data is never sold, used for advertising or added to mailing lists. The legal basis is your consent and the steps you ask to take before a possible contract.",
      ],
    },
    {
      id: "processors",
      title: "Services that process your data",
      items: [
        "OpenAI: chat messages are sent to the OpenAI API to generate the assistant's replies. Under OpenAI's API terms, this data is not used to train its models.",
        "Telegram: contact requests and booking notifications are delivered to Serhii's private Telegram chat.",
        "Google Calendar and Google Meet: a booked call becomes an event in Serhii's calendar, and Google emails you the invitation with a Meet link.",
        "Vercel: hosts the site and may keep standard server request logs.",
      ],
    },
    {
      id: "google-data",
      title: "Google user data",
      paragraphs: [
        "The site connects only to Serhii's own Google Calendar, to check free time and create the events you book. It never asks for access to your Google account and does not read your calendar, email or other Google data.",
        "The site's use of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements.",
      ],
    },
    {
      id: "retention",
      title: "How long it is kept",
      paragraphs: [
        "Chat messages are not stored by this site after a reply is generated. Contact requests and calendar events are kept for as long as needed to discuss and deliver your project, and are deleted on request.",
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      paragraphs: [
        "You can ask to see, correct or delete the data you shared, or withdraw your consent at any time. If you are in the EU or EEA, you also have the right to lodge a complaint with your local data protection authority.",
      ],
    },
    {
      id: "changes",
      title: "Changes",
      paragraphs: [
        "If this policy changes, the new version will be posted here with an updated date.",
      ],
    },
  ],
};

export const termsOfService: LegalDocument = {
  title: "Terms of Service",
  description:
    "The terms for using this portfolio site, its AI chat assistant and call booking.",
  updated: "October 6, 2026",
  intro:
    "These terms apply when you use this site, including the AI chat assistant and the call booking. By using the site, you agree to them.",
  sections: [
    {
      id: "the-site",
      title: "About the site",
      paragraphs: [
        "This site presents the work and services of Serhii Kushnir, a freelance developer. It is provided for information and to help you get in touch.",
      ],
    },
    {
      id: "assistant",
      title: "The AI assistant",
      paragraphs: [
        "Sonia is an AI assistant. Its answers are generated automatically and may be incomplete or wrong. Estimates, prices or timelines it mentions are not an offer. Only a written agreement with Serhii is binding.",
      ],
    },
    {
      id: "booking",
      title: "Booking a call",
      paragraphs: [
        "Booked calls are free and carry no obligation. You can reschedule or cancel through the calendar invitation or by writing to Serhii. Serhii may also need to reschedule, and will let you know as early as possible.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable use",
      items: [
        "Don't submit someone else's contact details or false information.",
        "Don't try to get around rate limits, overload the service or misuse the assistant.",
        "Don't use automated tools to scrape the site or send messages.",
      ],
    },
    {
      id: "content",
      title: "Content and case studies",
      paragraphs: [
        "Text, design and code samples on this site belong to Serhii Kushnir unless stated otherwise. Client names, products and trademarks shown in case studies belong to their owners.",
      ],
    },
    {
      id: "liability",
      title: "No warranty",
      paragraphs: [
        "The site is provided as is, without guarantees that it will always be available or error-free. To the extent the law allows, Serhii is not liable for losses arising from use of the site or the assistant's answers. Links to third-party sites are provided for convenience only.",
      ],
    },
    {
      id: "changes",
      title: "Changes",
      paragraphs: [
        "These terms may be updated. The current version is always posted here with its effective date.",
      ],
    },
  ],
};
