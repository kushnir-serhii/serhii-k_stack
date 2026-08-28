export interface ProjectOutcome {
  val: string;
  label: string;
}

export interface ProjectBuild {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  year: string;
  status: "live" | "wip" | "private";
  url: string | null;
  client?: string;
  duration?: string;
  team?: string;
  techStack: string;
  imgSrcArr: string[];
  summary: string;
  description?: string[];
  problem?: string;
  approach?: string;
  outcome?: ProjectOutcome[];
  build?: ProjectBuild[];
}

export const PROJECTS: Project[] = [
  // CloudBitPay
  {
    slug: "cloudbitpay",
    title: "CloudBitPay: Cryptocurrency Payment Gateway",
    subtitle: "Cryptocurrency Payment Gateway",
    role: "Full Stack Engineer",
    year: "2026",
    status: "live",
    url: null,
    client: "Fintech / iGaming",
    duration: "1 month",
    team: "Solo engineer",
    techStack:
      "Next.js, React, TypeScript, Tailwind CSS, SWR, Axios, CMS Strapi, PostgreSQL, Cloudinary, React Hook Form, Zod, Recharts, Radix UI",
    imgSrcArr: [
      "/images/cloud_bit_pay.webp",
      "/images/cloud_bit_pay_phone.webp",
    ],
    summary:
      "A production-grade crypto payment gateway with 15 dynamic pages, a 40+ type Strapi CMS, and an SSR/ISR frontend serving fintech, iGaming, and e-commerce clients.",
    problem:
      "Multi-vertical fintech client needed a single marketing surface that could handle constantly-shifting copy, fee tables, and network diagrams across forex, iGaming, e-commerce, and wealth verticals — without a developer in the loop for every change.",
    approach:
      "Architected the entire monorepo from scratch. Designed 40+ Strapi content types, built a type-safe data layer transforming raw CMS payloads into typed React props, and shipped 15 pages of dynamic, mobile-first sections.",
    outcome: [
      { val: "40+", label: "Strapi content types" },
      { val: "15", label: "Pages" },
      { val: "93", label: "Lighthouse Performance score" },
    ],
    build: [
      {
        title: "Type-safe CMS data layer",
        body: "Custom transform functions map raw Strapi responses to typed React props. Changes in the CMS schema surface as TS errors at build time.",
      },
      {
        title: "Section component library",
        body: "Every page is composed from reusable, mobile-first sections — hero, fee tables, Embla carousels, react-archer flow diagrams, Recharts visualisations.",
      },
      {
        title: "Form + validation layer",
        body: "React Hook Form + Zod for client/server-validated contact, demo-request, and onboarding forms, integrated with the Strapi submissions API.",
      },
      {
        title: "Deployment & media",
        body: "Backend on Railway (PostgreSQL), frontend on Vercel with ISR, Cloudinary for media delivery with responsive srcsets.",
      },
    ],
    description: [
      `CloudBitPay is a production-grade cryptocurrency payment gateway landing page serving clients across fintech verticals — forex & CFD brokers, iGaming, e-commerce, and wealth management. Built as a headless CMS-driven site, it features 15 pages of fully dynamic content managed through Strapi 5, with server-side rendering and incremental static regeneration via Next.js 16 App Router.`,
      `As a Full Stack Engineer, I architected and built the entire monorepo from scratch — designing 40+ Strapi content types, implementing a type-safe data layer with custom transform functions (raw Strapi → typed React props), and building all section components with mobile-first responsive layouts. On the frontend I integrated Embla Carousel, Recharts fee visualizations, react-archer diagrams, and form validation with React Hook Form + Zod. The backend is deployed on Railway (PostgreSQL) and the frontend on Vercel, with Cloudinary handling media delivery.`,
    ],
  },
  // Beans
  {
    slug: "beans",
    title: "Beans: Multi-Chain Token Trading Platform",
    subtitle: "Multi-Chain Token Trading Platform",
    role: "Front End Developer",
    year: "2025",
    status: "private",
    url: null,
    duration: "4 months",
    team: "Solo engineer",
    techStack:
      "React, Vite, TS, Tailwind CSS, Zustand, Lightweight Charts, Privy React Auth",
    imgSrcArr: [
      "/images/beans.webp",
      "/images/beans_2_phones.webp",
      "/images/beans_phone.webp",
    ],
    summary:
      "Decentralized multi-chain swap with real-time OHLCV charts, wallet-native auth, leaderboard, and referrals.",
    problem:
      "Users needed a seamless cross-chain token swap experience with real-time market data, competitive leaderboards, and a referral system — all within a single cohesive interface supporting 15+ wallet providers.",
    approach:
      "Architected the Zustand store layer from scratch, integrated Lightweight Charts for real-time OHLCV candlesticks, and built the full swap flow with Jupiter integration, slippage controls, and live transaction tracking.",
    outcome: [
      { val: "4", label: "Supported chains" },
      { val: "15+", label: "Wallet providers" },
      { val: "6", label: "Chart timeframes" },
    ],
    build: [
      {
        title: "State architecture",
        body: "Zustand store split into user, swap settings, balances, token universe, and trending tokens slices — each independently subscribed.",
      },
      {
        title: "Real-time charts",
        body: "Lightweight Charts integration for OHLCV candlestick visualizations across 6 timeframes with auto-updating data feeds.",
      },
      {
        title: "Swap flow",
        body: "Full swap UI with token search, quote fetching via Jupiter, slippage and priority fee controls, and live transaction status tracking.",
      },
    ],
    description: [
      `Beans is a decentralized multi-chain token trading platform that lets users swap tokens across Ethereum, BSC, Base, and Solana networks in real time. The platform combines DEX functionality with gamification — featuring a competitive leaderboard with weekly and all-time rankings, a referral program with fee sharing, and wallet-native authentication via Privy supporting 15+ wallet providers including MetaMask, Phantom, Coinbase, and WalletConnect.`,
      `As a Front End Developer, I built the entire frontend from scratch — architecting the Zustand store layer (user, swap settings, balances, token universe, and trending tokens), integrating Lightweight Charts for real-time OHLCV candlestick visualizations across 6 timeframes, and implementing the full swap flow with token search, quote fetching via Jupiter integration, slippage and priority fee controls, and live transaction status tracking. I also developed the leaderboard and referral dashboards, a multi-step account creation flow, and a fully responsive mobile-first UI with Tailwind CSS.`,
    ],
  },
  // Nuance
  {
    slug: "nuance",
    title: "Workplace English: AI Communication Coach",
    subtitle: "AI-powered workplace communication training",
    role: "Full Stack Engineer",
    year: "2026",
    status: "live",
    url: "https://julia-builds.github.io/nuance/",
    client: "EdTech / AI",
    duration: "1 month",
    team: "Designer & engineer",
    techStack: "React, Vite, TS, Lovable, Claude Code, openAI API, Supabase",
    imgSrcArr: ["/images/nuance.webp", "/images/nuance_mobile.webp"],
    summary:
      "An AI-powered workplace communication platform helping non-native English speakers master the social nuance of communication in global tech companies through realistic scenarios and instant AI feedback.",
    problem:
      "International professionals often know the grammar but struggle with the unwritten rules of workplace communication — how to disagree, push back, give feedback, manage up, and navigate cross-cultural situations without appearing difficult.",
    approach:
      "Started as a Lovable-generated prototype and was then taken over, refactored, extended, and productionized. Implemented the core learning experience around realistic workplace scenarios, AI-powered response evaluation, progress tracking, phrase comparison, and iterative practice.",
    outcome: [
      { val: "8", label: "Learning modules" },
      { val: "3", label: "Attempts per scenario" },
      { val: "AI", label: "Real-time communication feedback" },
    ],
    build: [
      {
        title: "AI conversation evaluation",
        body: "Built the scenario-based evaluation flow where AI analyzes user responses for social appropriateness, strategic effectiveness, and cultural awareness, providing actionable feedback and an improvement score.",
      },
      {
        title: "Scenario-based learning",
        body: "Implemented realistic workplace communication scenarios covering feedback, managing up, conflict, disagreement, and other situations common in international tech teams.",
      },
      {
        title: "Communication phrase library",
        body: "Built a searchable phrase library with side-by-side comparisons of ineffective and effective workplace communication, helping users understand the reasoning behind better phrasing.",
      },
      {
        title: "Progress & engagement",
        body: "Implemented progress tracking, daily missions, coaching insights, retry mechanics, and voice input to create an ongoing communication practice experience.",
      },
    ],
    description: [
      `Workplace English is an AI-powered learning platform designed to help non-native English speakers and international professionals navigate communication in global tech companies. Rather than focusing only on grammatical correctness, the platform teaches the social and strategic nuances behind effective workplace communication.`,
      `The project initially started in Lovable as a rapid prototype. I then took over the application and completed the development using Claude Code, refactoring and extending the generated codebase into a functional product. I implemented the core scenario-based learning experience, AI response evaluation, scoring and retry system, phrase library, progress tracking, daily missions, coaching insights, and voice input support.`,
    ],
  },
  // Calmisu
  {
    slug: "calmisu",
    title: "Calmisu: Anxiety & Wellness App with a Calligraphy Twist",
    subtitle: "Mobile Wellness App + Full SEO/ASO Growth Pipeline",
    role: "Solo Full-Stack Developer",
    year: "2026",
    status: "live",
    url: "https://calmisu.com",
    duration: "Ongoing (launched 2026)",
    team: "Solo engineer",
    techStack:
      "React Native (Expo), TypeScript, Supabase (Postgres, Auth), RevenueCat, Firebase Analytics, Astro",
    imgSrcArr: [
      "/images/calmisu_app.webp",
      "/images/calmisu_app_2.webp",
      "/images/calmisu_breath.webp",
      "/images/calmisu_kanji.webp",
    ], // TODO: swap in real screenshots
    summary:
      "Anxiety and wellness app built around a calligraphy-tracing differentiator, shipped with a full technical SEO and ASO layer to grow organically on a zero-dollar marketing budget.",
    problem:
      "Most anxiety apps compete on the same handful of breathing/meditation exercises with no visual hook and no organic growth engine — meaning even a well-built app stays invisible without paid acquisition, which a solo, zero-budget launch can't afford.",
    approach:
      "Built a React Native (Expo) app on Supabase (Postgres + Auth) with RevenueCat handling subscription monetization and Firebase Analytics tracking funnel events, centered on calligraphy tracing as a visual, tactile alternative to generic breathing timers. Paired it with an Astro landing site and blog engineered for search from the ground up — structured data (Organization/WebSite/MobileApplication/FAQPage JSON-LD), sitemap submission and indexing requests, Core Web Vitals fixes (image compression, font loading, LCP priority), and a content strategy targeting long-tail anxiety-relief search terms. Growth is driven by organic channels only: SEO-optimized blog content and a Reddit warm-up/posting strategy, with in-app review prompts tied to a mood-check survey to build Play Store social proof over time.",
    outcome: [
      {
        val: "4",
        label:
          "Core techniques: breathing, calligraphy tracing, soundscapes, reflective AI chat",
      },
      {
        val: "6",
        label: "SEO-optimized blog articles shipped, with more planned",
      },
      {
        val: "4",
        label: "Locales supported on the landing site (EN/PL/UA/ES)",
      },
    ],
    build: [
      {
        title: "Calming Flow with mood-aware review loop",
        body: "Core relaxation flow (breathing, calligraphy tracing, nature soundscapes, reflective AI chat) ends in a mood survey; a 'smile' rating on a non-first launch triggers a native Google Play in-app review prompt via expo-store-review, gated by a SecureStore flag so it only asks once per install.",
      },
      {
        title: "Technical SEO & content engine",
        body: "Astro landing site with JSON-LD structured data, trailing-slash normalization, redirect handling for retired article slugs, Android App Links via assetlinks.json, and a blog whose frontmatter title is the single source of truth for H1, card, and page title — built to rank on long-tail anxiety and grounding search terms without ad spend.",
      },
      {
        title: "Compliant monetization & analytics",
        body: "RevenueCat subscriptions with a Google Play Data Safety declaration correctly scoped to third-party purchase-history sharing per RevenueCat's own requirements, plus Firebase event tracking (cta_click, waitlist_submit, meditation_preview_play) segmented by platform and placement to measure what's actually converting.",
      },
    ],
    description: [
      `Calmisu (published on Google Play as "Calm Is You") is an anxiety and wellness app that leads with a genuine differentiator — calligraphy tracing as a meditative, tactile alternative to yet another breathing timer — alongside guided breathing, nature soundscapes, and a reflective AI chat space with deliberate safety guardrails. It's free to install, with subscription monetization handled through RevenueCat.`,
      `As the solo engineer, I own the full stack end to end: the Expo/Supabase app itself, the Astro marketing site and blog, and the growth layer that gets both of them found — technical SEO (structured data, indexing, Core Web Vitals), a zero-budget organic content and Reddit strategy, and Play Store compliance work like correctly scoping the Data Safety declaration for RevenueCat's data flows. The project is in active launch and growth phase: the app and site are live, and the current focus is content depth, social proof, and ASO refinement to convert early technical groundwork into real search visibility.`,
    ],
  },
  // Catoshi
  {
    slug: "catoshi",
    title: "Catoshi: Crypto Analytics & AI Forecasting Platform",
    subtitle: "AI-Driven Crypto Market Analytics Dashboard",
    role: "Full-Stack Developer",
    year: "2026",
    status: "live",
    url: null,
    duration: "1 month (ongoing)",
    team: "Solo engineer",
    techStack:
      "React, Next.js, TypeScript, Tailwind CSS, PostgreSQL (Neon, pgvector), Claude API",
    imgSrcArr: [
      "/images/catoshi.webp",
      "/images/catoshi_mobile_chart.webp",
      "/images/catoshi_mobile_landing.webp",
    ], // TODO: swap in real screenshots
    summary:
      "Crypto analytics dashboard that turns free market data into structured, probability-weighted AI forecasts — with a built-in loop that scores and calibrates its own accuracy over time.",
    problem:
      "Manual crypto forecasting is slow, inconsistent, and prone to the same mistakes repeating — chart-only calls that ignore positioning, funding, ETF flows, and macro triggers, and binary predictions instead of calibrated probabilities.",
    approach:
      "Built a Next.js dashboard backed by a data pipeline that pulls OHLCV, funding rate, open interest, long/short ratios, liquidations, ETF flows, and news sentiment from free sources (Binance, CoinGecko, Farside, RSS), compresses them into a compact market snapshot, and hands that snapshot to Claude with a forced JSON schema so every forecast comes back as labeled scenarios with probabilities — never a directional guess. Designed a Postgres/Neon schema with pgvector to store every snapshot and forecast, search for historical analog market states, and automatically score forecast accuracy via Brier score.",
    outcome: [
      { val: "4+", label: "Free data sources integrated" },
      { val: "16-dim", label: "Market-state vector for analog search" },
      { val: "~$4/mo", label: "Projected AI inference cost" },
    ],
    build: [
      {
        title: "Market snapshot pipeline",
        body: "Indicators (RSI, MA, ATR, volume z-score, derivatives deltas) computed locally across four timeframes from free Binance/CoinGecko/Farside data, compressed into one compact JSON snapshot instead of feeding raw candles to the model.",
      },
      {
        title: "Structured AI forecasting",
        body: "Claude generates probability-weighted price scenarios against a forced JSON schema, encoding a rule learned from a documented forecasting miss: never give a directional call from technicals alone when volatility, positioning, and a macro trigger line up.",
      },
      {
        title: "Calibration loop",
        body: "PostgreSQL/Neon schema with pgvector for k-NN search over historical market states, plus automatic Brier-score scoring of every forecast so the system's accuracy is measurable and improvable, not just anecdotal.",
      },
    ],
    description: [
      `Catoshi is a crypto analytics platform that replaces manual, chart-only market calls with a disciplined, data-backed forecasting process. It pulls live price, derivatives, ETF flow, and sentiment data from free public sources, distills it into a compact market snapshot, and hands that to an AI model with a forced output schema — so every forecast comes back as labeled scenarios with real probabilities and clear invalidation levels, never a binary "yes/no" prediction.`,
      `As the solo engineer, I designed the full pipeline: the data collectors, the local indicator layer that keeps token cost down by ~90% versus feeding raw candles, the PostgreSQL/Neon schema with pgvector for finding historical "analog" market states, and the forecast-accuracy loop that scores every prediction with a Brier score and feeds the results back into prompt calibration. The project is still in progress — the dashboard and data pipeline are live, while the automated forecasting and calibration loop are built and being wired into a scheduled pipeline.`,
    ],
  },
  // Meme-academy
  {
    slug: "meme-academy",
    title: "Meme Academy: Real-Time Multiplayer Meme Party Game",
    subtitle: "Cards-Against-Humanity-Style Browser Game with Live Rooms",
    role: "Full-Stack Developer",
    year: "2026",
    status: "live",
    url: "https://meme-academy.vercel.app",
    duration: "7 months, part-time (Jan-Aug 2026, ongoing)",
    team: "Solo engineer",
    techStack:
      "React, Next.js (App Router), TypeScript, Tailwind CSS v4, Zustand, Socket.io, Node.js, Express, next-intl",
    imgSrcArr: [
      "/images/meme_game.webp",
      // "/images/meme-academy_mobile_lobby.webp",
      // "/images/meme-academy_mobile_judging.webp",
    ], // TODO: swap in real screenshots
    summary:
      "Real-time multiplayer party game where players match meme cards to funny prompts — a browser-based, no-download take on the Cards Against Humanity formula, with live rooms, a rotating judge, and full multi-language support.",
    problem:
      "Party games like this usually mean physical cards or a native app install — nothing lightweight that a group can jump into from a shared link, on any device, with state staying in sync for everyone in real time and surviving a dropped connection mid-round.",
    approach:
      "Split the game into two services: a Next.js client that renders a server-driven state machine (lobby → phrase_selection → picking → judging → result), and a standalone Socket.io/Express server that owns all game logic — room lifecycle, hand dealing, phase transitions, and validation of every action (is this player the judge? is it the right phase?). The client never trusts local state: a Zustand store is fully re-synced from the server's room_state broadcast after every change, with derived-state selectors (selectIsJudge, selectIsWinner) driving the UI. Reconnection is handled via a playerId + roomCode pair persisted in sessionStorage, so a dropped player can rejoin mid-game without losing their hand or score.",
    outcome: [
      { val: "3", label: "Languages shipped (EN / UK / PL)" },
      { val: "10", label: "Players per room" },
    ],
    build: [
      {
        title: "Server-authoritative game engine",
        body: "A GameRoomManager class on the Node/Socket.io server owns every room's state, validates each incoming event against the current phase and caller (host/judge/winner-only actions), deals and replenishes hands, and is the single source of truth the client always re-syncs to.",
      },
      {
        title: "Stable judging under a shared shuffle",
        body: "Submitted memes are shown to the judge in randomized order, but the order is locked once per round into shuffledSubmissionOrder rather than re-shuffled on every state broadcast — fixing a class of bug where the judge's pick could resolve to a different player than the one they saw on screen.",
      },
      {
        title: "Reconnect-safe sessions",
        body: "Players rejoin an in-progress game via a playerId + roomCode pair kept in sessionStorage; the server marks them disconnected but keeps their seat and hand during an active round, only freeing the slot after a grace period in the lobby.",
      },
      {
        title: "Full multi-language support",
        body: "next-intl drives the client UI while the server maintains locale-aware phrase pools and translated error codes for English, Ukrainian, and Polish — each player carries their own locale, phrase options are generated in the judge's language, and locale can change mid-game.",
      },
    ],
    description: [
      `Meme Academy is a real-time, browser-based party game in the spirit of Cards Against Humanity: players join a room by code, get dealt a hand of meme cards, and take turns as judge picking the funniest meme submitted against a prompt phrase. No installs, no physical cards — just a shared room link and a live Socket.io connection keeping every player's screen in sync.`,
      `As the sole engineer across both repositories, I built the Next.js/TypeScript client and the Node/Express/Socket.io server as separate services: the server owns all game logic and state as the single source of truth, while the client's Zustand store re-syncs from the server's broadcasts rather than trusting local state. Notable engineering details include a server-locked shuffle order that keeps judging fair across state re-broadcasts, sessionStorage-based reconnection so dropped players don't lose their seat, and a full English/Ukrainian/Polish localization layer spanning UI copy, server-side error messages, and per-locale phrase pools. The game is deployed and live at meme-academy.vercel.app.`,
    ],
  },
  // Betski
  {
    slug: "betski",
    title: "Betski: Solana Staking & Trading Dashboard",
    subtitle: "Solana Staking & Trading Dashboard",
    role: "Front End Developer",
    year: "2025",
    status: "private",
    url: null,
    duration: "1 month",
    team: "Solo engineer",
    techStack: "React, TS, Next.js, Tailwind CSS",
    imgSrcArr: ["/images/betski.webp", "/images/betski_phone.webp"],
    summary:
      "Staking dashboard for BETSKI token with tiered withdrawal fees, real-time candlesticks, and NFT-gated revenue share.",
    problem:
      "BETSKI holders needed a unified dashboard to stake tokens, track yields, and receive NFT-gated revenue distributions — with real-time market data and wallet-native auth on Solana.",
    approach:
      "Built on Next.js 15 with Tailwind CSS — implementing Lightweight Charts for real-time OHLCV data, a full staking flow with tiered withdrawal fees, compound frequency controls, and wallet authentication via Privy.",
    outcome: [
      { val: "15%", label: "Revenue share model" },
      { val: "2", label: "NFT collections" },
      { val: "93+", label: "Lighthouse Performance score" },
    ],
    build: [
      {
        title: "Real-time charts",
        body: "Lightweight Charts for OHLCV candlestick and area price visualizations with a custom ResizeObserver hook for responsive sizing.",
      },
      {
        title: "Staking flow",
        body: "Full staking UI with tiered withdrawal fees, configurable lockup periods, auto-compounding controls, and yield projection calculator.",
      },
      {
        title: "Performance & UX",
        body: "Dynamic imports for heavy components, debounced API calls, client-side caching, scroll-locked portal modals, and real-time price ticker.",
      },
    ],
    description: [
      `Betski is a decentralized staking and trading dashboard built on Solana, centred around the BETSKI token. Users can stake tokens to become "casino owners" and earn passive income through a 15% revenue-share model, trade BETSKI with real-time candlestick charts across multiple timeframes, calculate projected yield with configurable lockup periods and auto-compounding, and receive profit distributions via Membership Card and Wolfpack NFT collections.`,
      `As a Front End Developer, I built the dashboard from scratch using Next.js 15 and Tailwind CSS — implementing Lightweight Charts for real-time OHLCV candlestick and area price visualizations with a custom ResizeObserver hook for responsive sizing, a full staking flow with tiered withdrawal fees and compound frequency controls, and wallet authentication via Privy (Phantom, Solflare). I optimised performance through dynamic imports for heavy components, debounced API calls, and client-side caching.`,
    ],
  },
  // Apeing AI
  {
    slug: "apeing-ai",
    title: "Apeing AI: Solana Trading & Copy Trade Platform",
    subtitle: "Solana Trading & Copy Trade Platform",
    role: "Front End Developer",
    year: "2024",
    status: "private",
    url: null,
    duration: "3 months",
    team: "2 engineers",
    techStack: "React, Next.js, TS, SCSS, Redux Toolkit, ApexCharts, Chart.js",
    imgSrcArr: [
      "/images/apeing.webp",
      "/images/apeing_phone.webp",
      "/images/apeing_2_phones.webp",
    ],
    summary:
      "8 pages of Solana analytics: token discovery, copy trading, wallet ranking, PnL, ApeingRooms — 5 languages.",
    problem:
      "Solana traders needed a single platform combining token discovery, copy trading, smart wallet tracking, and community rooms — with professional-grade analytics and multi-language support across 5 locales.",
    approach:
      "Built the frontend from scratch with Next.js 15 and Turbopack, implemented complex data tables via TanStack, integrated ApexCharts and Chart.js for portfolio visualizations, and embedded real-time charts via the gmgn.cc API.",
    outcome: [
      { val: "8", label: "Feature pages" },
      { val: "5", label: "Languages" },
      { val: "15+", label: "Chart types" },
    ],
    build: [
      {
        title: "Data tables",
        body: "Complex sortable/filterable tables with TanStack React Table across token discovery, leaderboard, and portfolio pages.",
      },
      {
        title: "Charts & analytics",
        body: "ApexCharts and Chart.js for PnL and portfolio visualisations, plus gmgn.cc API for real-time embedded token charts.",
      },
      {
        title: "Community rooms",
        body: "Drag-and-drop ApeingRooms interface built with @neodrag/react for collaborative trading sessions.",
      },
    ],
    description: [
      `Apeing AI is a professional Solana trading and analytics platform that enables users to discover tokens in real time, copy smart money wallets, track on-chain activity, and collaborate in community trading rooms. The platform spans 8 feature-rich pages — token discovery, ApeZone meme tracking, copy trade with wallet ranking, portfolio management, PnL analytics, smart wallet tracking, a follower/watchlist system, and community ApeingRooms — with full multi-language support across English, Chinese, Japanese, French, and Arabic.`,
      `As a Front End Developer, I built the frontend from scratch using Next.js 15 with Turbopack, SCSS modules, and Redux Toolkit for global popup and notification state. I implemented complex data tables with TanStack React Table, integrated ApexCharts and Chart.js for PnL and portfolio visualisations, embedded real-time token charts via the gmgn.cc API, and developed a drag-and-drop room interface with @neodrag/react.`,
    ],
  },
  // Reel Reveal
  {
    slug: "reel-reveal",
    title: "Movie Matching Web Application",
    subtitle: "AI-Driven Movie Matching App",
    role: "Full Stack Developer",
    year: "2024",
    status: "live",
    url: "https://www.reel-reveal.club/",
    duration: "4 months",
    team: "Solo engineer",
    techStack:
      "React, TS, Next.js, Tailwind CSS, useSWR, React-Hook-Form, MongoDB, Openai API, TMDB API, Stripe",
    imgSrcArr: ["/images/reel_reveal.webp", "/images/reel_reveal_mob.webp"],
    summary:
      "AI-driven movie recommendations with Google auth and personalized matching using OpenAI and TMDB APIs.",
    problem:
      "Users struggle to find movies they'll actually enjoy. Existing platforms rely on basic genre filtering — there was no AI-driven matching that understands nuanced user preferences.",
    approach:
      "Built the full stack from scratch — Next.js with Google Authentication, MongoDB for user data, OpenAI API for personalized recommendations, and TMDB API for movie metadata.",
    outcome: [
      { val: "AI", label: "Powered matching" },
      { val: "Stripe", label: "Payment integration" },
      { val: "Quiz", label: "Driven AI matching" },
    ],
    build: [
      {
        title: "AI recommendations",
        body: "OpenAI API integration for personalized movie recommendations based on user history and stated preferences.",
      },
      {
        title: "Authentication",
        body: "Secure Google Authentication with session management and user profile persistence in MongoDB.",
      },
      {
        title: "Movie data layer",
        body: "TMDB API integration for rich movie metadata — posters, ratings, cast, and streaming availability.",
      },
    ],
    description: [
      `As a full-stack developer on this project, I took ownership of both the frontend and backend development, ensuring a seamless and intuitive user experience.`,
      `I built the frontend from scratch using modern technologies, frameworks and tools like React, Next.js, TypeScript, and Tailwind CSS, adhering to industry best practices for structure and scalability. On the backend, I implemented a secure and efficient system using MongoDB for data management and Google Authentication for user login. Additionally, I integrated the Open AI API to deliver personalized, AI-driven movie recommendations.`,
    ],
  },
  // Invest
  {
    slug: "invest",
    title: "Investors and Startups Matching Web Application",
    subtitle: "Investors & Startups Matching Platform",
    role: "Full Stack Developer",
    year: "2024",
    status: "private",
    url: null,
    duration: "3 months",
    team: "2 engineers",
    techStack:
      "Next.js, TypeScript, Axios, useSWR, Material UI, Tailwind CSS, Strapi, Node.js, PostgreSQL",
    imgSrcArr: ["/images/invest.webp", "/images/invest_register.webp"],
    summary:
      "Multilingual investor/startup matching platform with OpenAI-assisted discovery and full registration flows.",
    problem:
      "Startups and investors needed a dedicated platform for discovery and matching — with multilingual support, structured registration flows, and AI-assisted recommendation to reduce cold outreach.",
    approach:
      "Designed and implemented the full-stack architecture — multilingual frontend with Next.js, Strapi backend with PostgreSQL, and OpenAI integration for intelligent matching between investors and startups.",
    outcome: [
      { val: "Multi", label: "Language support" },
      { val: "OpenAI", label: "Matching engine" },
      { val: "Strapi", label: "CMS backend" },
    ],
    build: [
      {
        title: "Multilingual frontend",
        body: "Localization system supporting multiple languages with dynamic content switching and locale-aware routing.",
      },
      {
        title: "Registration flows",
        body: "Structured user registration and login for both investor and startup profiles with role-based content access.",
      },
      {
        title: "AI matching",
        body: "OpenAI API integration for intelligent matching suggestions based on startup stage, industry, and investor criteria.",
      },
    ],
    description: [
      `As a full-stack developer, I was responsible for designing and implementing a scalable and user-centric architecture. On the frontend, I developed the project architecture in line with design requirements, implemented localization to support multilingual components, and built the functionality for user registration and login.`,
      `On the backend, I configured dynamic multilingual components to handle content in multiple languages and integrated the OpenAI API to meet the project's core functional requirements.`,
    ],
  },
  // Teens Ukraine
  {
    slug: "teens-ukraine",
    title: "Teens Ukraine Educational Initiative Game",
    subtitle: "Educational Initiative Super-Game",
    role: "Front End Developer",
    year: "2023",
    status: "live",
    url: "https://teens-ukraine.games",
    duration: "2 months",
    team: "3 engineers",
    techStack: "React, TS, Next.js, Tailwind CSS",
    imgSrcArr: ["/images/teen.webp", "/images/teen_table.webp"],
    summary:
      "Real-time admin panel and game interface for an educational initiative super-game with live participant tracking.",
    problem:
      "An educational initiative needed a real-time game platform capable of managing hundreds of participants simultaneously, displaying live intermediate scores, and providing an admin panel for game orchestration.",
    approach:
      "Built the admin panel and game interface with Next.js and Tailwind CSS — implementing real-time response calculation, intermediate/final scoring tables, and reusable hooks for music and loader state management.",
    outcome: [
      { val: "Real", label: "Time scoring" },
      { val: "Live", label: "Participant tracking" },
      { val: "Multi", label: "Stage game flow" },
    ],
    build: [
      {
        title: "Admin panel",
        body: "Real-time admin interface to orchestrate the game, calculate participant responses, and advance game stages.",
      },
      {
        title: "Scoring tables",
        body: "Dynamic intermediate and final score tables with live updates across all participant sessions.",
      },
      {
        title: "Reusable hooks",
        body: "useMusic for cross-component audio management and useLoader for centralized loading state — reducing repetition across game stages.",
      },
    ],
    description: [
      `As a front-end developer on this project, I contributed to building an interactive and efficient admin panel and game interface. I designed and implemented the admin panel to calculate participant responses in a real-time super game involving all players. I developed core logic for the game, including displaying intermediate and final tables, and integrated mechanics for smooth gameplay.`,
      `I also created reusable solutions like the useMusic hook for managing music across components and a useLoader implementation for centralized loader state management. Additionally, I developed new components, such as a disclaimer with a timer before the game starts and reusable modals, loaders, and pop-ups to streamline functionality.`,
    ],
  },
  // TeraTeam
  {
    slug: "terateam",
    title: "TeraTeam Startups Colaboration Web Platform",
    subtitle: "Startups Collaboration Platform",
    role: "Front End Developer",
    year: "2023",
    status: "private",
    url: null,
    duration: "3 months",
    team: "4 engineers",
    techStack:
      "React, TS, Next.js, Tailwind CSS, useSWR, Redux, Axios, React-Hook-Form, Yup",
    imgSrcArr: ["/images/marketplace.webp", "/images/form.webp"],
    summary:
      "Project creation flows, SVG sprite optimization (−25% load time), and universal modals for a startup marketplace.",
    problem:
      "The platform needed a polished project creation flow, consistent modal system, and performance improvements — the existing page load was slow and the UI lacked cohesion across devices.",
    approach:
      "Implemented SVG sprites reducing load time by 25%, built a project creation form with React Hook Form + Yup, refactored the responsive design for header/footer, and created universal modal and loader components.",
    outcome: [
      { val: "−25%", label: "Page load time" },
      { val: "SVG", label: "Sprite system" },
      { val: "Universal", label: "Modal system" },
    ],
    build: [
      {
        title: "Project creation form",
        body: "Multi-field form with useSWR, React Hook Form, Yup validation, React-Datepicker, and Quill rich text editor.",
      },
      {
        title: "SVG sprite optimization",
        body: "Implemented SVG sprites across the platform, reducing page load times by 25% by eliminating redundant icon requests.",
      },
      {
        title: "Universal components",
        body: "Reusable modal and loader components that standardized UX patterns across all pages and user flows.",
      },
    ],
    description: [
      `As a front-end developer, I contributed to enhancing the functionality and usability of the project. I developed a new project creation form using useSWR, React Hook Form, Yup, React-Datepicker, and Quill, providing a seamless and intuitive interface for data entry.`,
      `To optimize performance, I implemented SVG sprites, reducing page load times by 25% and improving the user experience. I also refactored the responsive design of the homepage, header, and footer, ensuring a consistent, modern look across devices. Additionally, I created a universal modal and loader, streamlining user interactions and improving the overall usability of the application.`,
    ],
  },
  // {
  //   slug: "book-my-event",
  //   title: "Book MY Event: Event Aggregator",
  //   subtitle: "Event Aggregator & Ticketing",
  //   role: "Front End Developer",
  //   year: "2022",
  //   status: "private",
  //   url: null,
  //   duration: "4 months",
  //   team: "5 engineers and 2 designers",
  //   techStack:
  //     "React, TS, Vite, Tailwind CSS, Redux Thunk, Slick Slider, React-Hook-Form",
  //   imgSrcArr: ["/images/evently.webp", "/images/evently_register.webp"],
  //   summary:
  //     "Ticket creation, management, and purchase with interactive sliders and secure authentication flows.",
  //   problem:
  //     "Event organizers needed a simple platform to create and sell tickets, while attendees needed a clean browsing and purchase experience — without the complexity of large event platforms.",
  //   approach:
  //     "Built with React, Vite, TypeScript, and Tailwind CSS — implementing secure auth with React Hook Form, Redux Thunk for async ticket operations, and Slick Slider for dynamic content presentation.",
  //   outcome: [
  //     { val: "Full", label: "Ticket lifecycle" },
  //     { val: "Auth", label: "Secure flows" },
  //     { val: "Vite", label: "Fast builds" },
  //   ],
  //   build: [
  //     {
  //       title: "Authentication",
  //       body: "Secure registration and login using React Hook Form with validation and Redux Thunk for async auth operations.",
  //     },
  //     {
  //       title: "Ticket management",
  //       body: "Full CRUD flows for event creation, ticket management, and purchase with real-time inventory updates.",
  //     },
  //     {
  //       title: "Interactive UI",
  //       body: "Slick Slider for event browsing, responsive Tailwind layouts, and smooth transitions throughout the purchase flow.",
  //     },
  //   ],
  //   description: [
  //     `Book My Event is a web app that enables users to create, manage, and purchase event tickets seamlessly.`,
  //     `As a Frontend Developer on the Book My Event project, I developed secure and user-friendly authentication features using React Hook Form. Built with React, Vite, TypeScript, and Tailwind CSS, I ensured a smooth registration and login experience. Additionally, I implemented an interactive Slick Slider, enhancing the platform's dynamic content presentation.`,
  //   ],
  // },
];
