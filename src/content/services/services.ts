export interface Service {
  /** Anchor id on /services, e.g. /services#mobile-apps */
  slug: string;
  iconId: string;
  /** Service name */
  service: string;
  /** Short text for the home page card and the AI assistant */
  description: string;
  /** Longer text for the services page */
  details: string;
  /** What the client gets */
  deliverables: string[];
  stack: string[];
  /** Project slugs from content/projects that show this service in action */
  relatedProjects?: string[];
}

export const services: Service[] = [
  {
    slug: "web-apps",
    iconId: "icon-layout",
    service: "Websites & Web Apps",
    description:
      "Fast, responsive websites and web apps — from a landing page to a full dashboard or client portal.",
    details:
      "You get a modern site or web app that looks good on every screen, loads fast and is easy to update. Landing pages, company sites, dashboards, client portals and admin panels.",
    deliverables: [
      "Responsive layout for mobile, tablet and desktop",
      "CMS so you can edit texts and images yourself",
      "Forms, payments and integrations with your tools",
      "Deployment, domain and hosting setup",
    ],
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Strapi", "Sanity"],
    relatedProjects: ["cloudbitpay", "catoshi", "beans"],
  },
  {
    slug: "mobile-apps",
    iconId: "icon-smartphone",
    service: "Mobile Apps",
    description:
      "iOS and Android apps from one codebase — from first prototype to release on App Store and Google Play.",
    details:
      "One app for both iPhone and Android, built with React Native. I take care of the whole path: prototype, development, store listings and publishing.",
    deliverables: [
      "One codebase for iOS and Android",
      "Push notifications, subscriptions, offline mode",
      "App Store and Google Play publishing",
      "Store listing and ASO basics",
    ],
    stack: ["React Native", "Expo", "TypeScript", "Supabase"],
    relatedProjects: ["calmisu", "reel-reveal"],
  },
  {
    slug: "backend-api",
    iconId: "icon-code",
    service: "Backend & Integrations",
    description:
      "Reliable server side, databases and connections to the services you already use — payments, CRM, calendars, APIs.",
    details:
      "The engine behind your product: user accounts, databases, admin logic and integrations with third-party services, so your data moves between tools without manual work.",
    deliverables: [
      "Database design and user authentication",
      "REST / real-time APIs",
      "Integrations: payments, CRM, Google, Telegram, crypto APIs",
      "Secure hosting and backups",
    ],
    stack: ["Node.js", "Express", "PostgreSQL", "Supabase", "Socket.io", "AWS"],
    relatedProjects: ["meme-academy", "apeing-ai", "betski"],
  },
  {
    slug: "ai-assistants",
    iconId: "icon-openai",
    service: "AI Assistants & Chatbots",
    description:
      "Smart chat assistants that answer customers, qualify leads and book meetings — trained on your own content.",
    details:
      "An AI assistant on your website or in Telegram that knows your products, answers questions 24/7, collects contacts and books calls into your calendar. Like the one in the corner of this page.",
    deliverables: [
      "Assistant trained on your texts, FAQ and offers",
      "Lead capture and notifications to you",
      "Meeting booking into Google Calendar",
      "Works in any language your clients speak",
    ],
    stack: ["OpenAI", "Claude", "Next.js", "Telegram Bot API"],
    relatedProjects: ["nuance", "reel-reveal"],
  },
  {
    slug: "ai-automation",
    iconId: "icon-zap",
    service: "AI Automation",
    description:
      "Automating repetitive work — lead handling, support, content and data processing — to save time and cut costs.",
    details:
      "If your team copies data between tools, answers the same emails or prepares the same reports every week, that work can run by itself. I find these tasks and automate them with AI.",
    deliverables: [
      "Audit of repetitive tasks in your process",
      "Automated workflows between your tools",
      "AI processing of emails, documents and data",
      "Reports and alerts delivered automatically",
    ],
    stack: ["OpenAI", "Claude", "Node.js", "n8n / Make", "Webhooks"],
    relatedProjects: ["catoshi"],
  },
  {
    slug: "seo",
    iconId: "icon-search",
    service: "SEO & Visibility",
    description:
      "Technical SEO, structured data and speed fixes so your site ranks higher and brings more visitors.",
    details:
      "Search engines and AI assistants must understand your site before they can recommend it. I fix the technical side so more of the right people find you.",
    deliverables: [
      "Technical SEO audit and fixes",
      "Meta tags, sitemaps, structured data",
      "Core Web Vitals improvements",
      "Multi-language pages",
    ],
    stack: ["Next.js", "Schema.org", "Search Console", "Lighthouse"],
    relatedProjects: ["calmisu", "cloudbitpay"],
  },
  {
    slug: "performance",
    iconId: "icon-sliders",
    service: "Speed & Code Improvement",
    description:
      "Making an existing product faster, more secure and easier to maintain — without rewriting from scratch.",
    details:
      "Your site is slow, breaks after every change, or the previous developer is gone? I review the code, fix the weak spots and leave it in a state any developer can continue.",
    deliverables: [
      "Code and performance review",
      "Faster loading and smoother UI",
      "Security and authentication fixes",
      "Clean-up and documentation",
    ],
    stack: ["React", "Next.js", "TypeScript", "Lighthouse"],
  },
  {
    slug: "no-code",
    iconId: "icon-mouse_pointer",
    service: "No-Code / Low-Code",
    description:
      "Quick launches on no-code and low-code platforms when speed and budget matter more than custom code.",
    details:
      "Need to test an idea this month? A no-code or low-code build gets you live quickly and cheaply, and can be moved to custom code later when it grows.",
    deliverables: [
      "MVP or landing page in days, not months",
      "Forms, databases and automations without code",
      "Custom code only where it's really needed",
      "Clear path to a custom build later",
    ],
    stack: ["Webflow", "Framer", "Supabase", "Make"],
  },
];

export const workProcess = [
  {
    step: "01",
    title: "Intro call",
    text: "We talk about your goal, users and deadline. Free, 30 minutes.",
  },
  {
    step: "02",
    title: "Plan & estimate",
    text: "You get a clear scope, timeline and fixed price or hourly estimate.",
  },
  {
    step: "03",
    title: "Design & build",
    text: "Weekly demos, so you see progress and can change direction early.",
  },
  {
    step: "04",
    title: "Launch & support",
    text: "Release, handover and help after launch — nothing is left half-done.",
  },
];

export const engagementModels = [
  {
    title: "Fixed-price project",
    text: "Clear scope, fixed price and deadline. Best for sites, MVPs and apps with a defined feature list.",
  },
  {
    title: "Hourly / contract",
    text: "Flexible hours for ongoing development, joining your team or work where scope changes often.",
  },
  {
    title: "Support & maintenance",
    text: "Monthly care: updates, fixes, small features and monitoring after launch.",
  },
];

export const servicesFaq = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope. After a short call you get a written estimate with a fixed price or hourly budget — no surprises later.",
  },
  {
    q: "Do you also do design?",
    a: "Yes. I work together with an experienced UI/UX designer, so projects that start from zero are covered too.",
  },
  {
    q: "How long does it take?",
    a: "A landing page usually takes 1–2 weeks, an MVP web or mobile app 4–10 weeks. You get a timeline before we start.",
  },
  {
    q: "Can you continue a project someone else started?",
    a: "Yes. I start with a code review, tell you honestly what state it's in, and then continue or fix it.",
  },
  {
    q: "Which languages do you speak?",
    a: "English, Ukrainian and Russian.",
  },
];
