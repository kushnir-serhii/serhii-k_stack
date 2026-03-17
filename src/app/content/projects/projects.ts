export const PROJECTS = [
  {
    title: "CloudBitPay: Cryptocurrency Payment Gateway",
    role: "Full Stack Engineer",
    url: null,
    techStack:
      "Next.js 16, React 19, TypeScript, Tailwind CSS v4, SWR, Axios, Strapi 5, PostgreSQL, Cloudinary, React Hook Form, Zod, Embla Carousel, Recharts, Radix UI",
    imgSrcArr: [
      "/images/cloud_bit_pay.webp",
      "/images/cloud_bit_pay_phone.webp",
    ],
    description: [
      `CloudBitPay is a production-grade cryptocurrency payment gateway landing page serving clients across fintech verticals — forex & CFD brokers, iGaming, e-commerce, and wealth management. Built as a headless CMS-driven site, it features 15 pages of fully dynamic content managed through Strapi 5, with server-side rendering and incremental static regeneration via Next.js 16 App Router.`,
      `As a Full Stack Engineer, I architected and built the entire monorepo from scratch — designing 40+ Strapi content types, implementing a type-safe data layer with custom transform functions (raw Strapi → typed React props), and building all section components with mobile-first responsive layouts. On the frontend I integrated Embla Carousel, Recharts fee visualizations, react-archer diagrams, and form validation with React Hook Form + Zod. The backend is deployed on Railway (PostgreSQL) and the frontend on Vercel, with Cloudinary handling media delivery.`,
    ],
  },
  {
    title: "Beans: Multi-Chain Token Trading Platform",
    role: "Front End Developer",
    url: null,
    techStack: "React, Vite, TS, Tailwind CSS, Zustand, Lightweight Charts",
    imgSrcArr: [
      "/images/beans.webp",
      "/images/beans_2_phones.webp",
      "/images/beans_phone.webp",
    ],
    description: [
      `Beans is a decentralized multi-chain token trading platform that lets users swap tokens across Ethereum, BSC, Base, and Solana networks in real time. The platform combines DEX functionality with gamification — featuring a competitive leaderboard with weekly and all-time rankings, a referral program with fee sharing, and wallet-native authentication via Privy supporting 15+ wallet providers including MetaMask, Phantom, Coinbase, and WalletConnect.`,
      `As a Front End Developer, I built the entire frontend from scratch — architecting the Zustand store layer (user, swap settings, balances, token universe, and trending tokens), integrating Lightweight Charts for real-time OHLCV candlestick visualizations across 6 timeframes, and implementing the full swap flow with token search, quote fetching via Jupiter integration, slippage and priority fee controls, and live transaction status tracking. I also developed the leaderboard and referral dashboards, a multi-step account creation flow, and a fully responsive mobile-first UI with Tailwind CSS. Throughout the project I focused on performance — optimising bundle size and achieving fast load times — polishing the UI with smooth interactions, and implementing robust error handling across all async flows and wallet interactions.`,
    ],
  },
  {
    title: "Betski: Solana Staking & Trading Dashboard",
    role: "Front End Developer",
    url: null,
    techStack:
      "React, TS, Next.js, Tailwind CSS",
    imgSrcArr: ["/images/betski.webp", "/images/betski_phone.webp"],
    description: [
      `Betski is a decentralized staking and trading dashboard built on Solana, centred around the BETSKI token. Users can stake tokens to become "casino owners" and earn passive income through a 15% revenue-share model, trade BETSKI with real-time candlestick charts across multiple timeframes, calculate projected yield with configurable lockup periods and auto-compounding, and receive profit distributions via Membership Card and Wolfpack NFT collections.`,
      `As a Front End Developer, I built the dashboard from scratch using Next.js 15 and Tailwind CSS — implementing Lightweight Charts for real-time OHLCV candlestick and area price visualizations with a custom ResizeObserver hook for responsive sizing, a full staking flow with tiered withdrawal fees and compound frequency controls, and wallet authentication via Privy (Phantom, Solflare). I optimised performance through dynamic imports for heavy components, debounced API calls, and client-side caching, while implementing thorough error handling across all async flows, wallet interactions, and transaction signing. UI work included a polished dark-theme design, scroll-locked portal modals, a real-time price ticker with colour-coded indicators, and a blurred revenue chart gated behind token ownership.`,
    ],
  },
  {
    title: "Apeing AI: Solana Trading & Copy Trade Platform",
    role: "Front End Developer",
    url: "https://www.apeing.ai/",
    techStack: "React, Next.js, TS, SCSS, Redux Toolkit, ApexCharts, Chart.js",
    imgSrcArr: [
      "/images/apeing.webp",
      "/images/apeing_phone.webp",
      "/images/apeing_2_phones.webp",
    ],
    description: [
      `Apeing AI is a professional Solana trading and analytics platform that enables users to discover tokens in real time, copy smart money wallets, track on-chain activity, and collaborate in community trading rooms. The platform spans 8 feature-rich pages — token discovery, ApeZone meme tracking, copy trade with wallet ranking, portfolio management, PnL analytics, smart wallet tracking, a follower/watchlist system, and community ApeingRooms — with full multi-language support across English, Chinese, Japanese, French, and Arabic.`,
      `As a Front End Developer, I built the frontend from scratch using Next.js 15 with Turbopack, SCSS modules, and Redux Toolkit for global popup and notification state. I implemented complex data tables with TanStack React Table, integrated ApexCharts and Chart.js for PnL and portfolio visualisations, embedded real-time token charts via the gmgn.cc API, and developed a drag-and-drop room interface with @neodrag/react. The work included thorough error handling on all async flows, optimised rendering through code splitting and conditional loading, and a fully responsive mobile-first layout with dedicated mobile components across all pages.`,
    ],
  },
  // ===================================== OLDER PROJECTS =====================================
  {
    title: "Movie Matching Web Application ",
    role: "Full Stack Developer",
    url: "https://www.reel-reveal.club/",
    techStack:
      "React, TS, Next.js, Tailwind CSS, useSWR, React-Hook-Form, MongoDB, Openai API, TMDB API",
    imgSrcArr: ["/images/reel_reveal.webp", "/images/reel_reveal_mob.webp"],
    description: [
      `As a full-stack developer on this project, I took ownership of both the frontend
         and backend development, ensuring a seamless and intuitive user experience.`,
      `I built the frontend from scratch using modern technologies, frameworks and tools like React, Next.js, TypeScript, and Tailwind CSS,
 adhering to industry best practices for structure and scalability.`,
      `On the backend, I implemented a secure and efficient system using MongoDB for data management and Google Authentication
 for user login. Additionally, I integrated the Open AI API to deliver personalized, AI-driven movie recommendations.`,
    ],
  },
  {
    title: "Investors and Startups Matching Web Application",
    role: "Full Stack Developer",
    url: null,
    techStack:
      "Next.js, TypeScript, Axios, useSWR, Material UI, Tailwind CSS, Strapi, Node.js, PostgreSQL",
    imgSrcArr: ["/images/invest.webp", "/images/invest_register.webp"],
    description: [
      `As a full-stack developer , I was responsible for designing and implementing a scalable and user-centric architecture. On the frontend, I developed the project architecture in line with design requirements, implemented localization to support multilingual components, and built the functionality for user registration and login.`,
      `On the backend, I configured dynamic multilingual components to handle content in multiple languages and integrated the OpenAI API to meet the project’s core functional requirements.`,
    ],
  },
  {
    title: "Teens Ukraine Educational Initiative Game",
    role: "Front End Developer",
    url: "https://teens-ukraine.games",
    techStack: "React, TS, Next.js, Tailwind CSS",
    imgSrcArr: ["/images/teen.webp", "/images/teen_table.webp"],
    description: [
      `As a front-end developer on this project, I contributed to building an interactive and efficient admin panel and game interface. I designed and implemented the admin panel to calculate participant responses in a real-time super game involving all players. I developed core logic for the game, including displaying intermediate and final tables, and integrated mechanics for smooth gameplay.`,
      `I also created reusable solutions like the useMusic hook for managing music across components and a useLoader implementation for centralized loader state management. Additionally, I developed new components, such as a disclaimer with a timer before the game starts and reusable modals, loaders, and pop-ups to streamline functionality.`,
    ],
  },
  {
    title: "TeraTeam Startups Colaboration Web Platform",
    role: "Front End Developer",
    url: "", //https://terateam.net
    techStack:
      "React, TS, Next.js, Tailwind CSS, useSWR, Redux, Axios, React-Hook-Form, Yup",
    imgSrcArr: ["/images/marketplace.webp", "/images/form.webp"],
    description: [
      `As a front-end developer, I contributed to enhancing the functionality and usability of the project. I developed a new project creation form using useSWR, React Hook Form, Yup, React-Datepicker, and Quill, providing a seamless and intuitive interface for data entry.`,
      `To optimize performance, I implemented SVG sprites, reducing page load times by 25% and improving the user experience. I also refactored the responsive design of the homepage, header, and footer, ensuring a consistent, modern look across devices.`,
      `Additionally, I created a universal modal and loader, streamlining user interactions and improving the overall usability of the application. These contributions highlight my commitment to delivering efficient, user-centric, and performance-driven solutions.`,
    ],
  },
  {
    title: "Book MY Event: Event Aggregator",
    role: "Front End Developer",
    url: null,
    techStack:
      "React, TS, Vite, Tailwind CSS, Redux Thunk, Slic Slider, React-Hook-Form",
    imgSrcArr: ["/images/evently.webp", "/images/evently_register.webp"],
    description: [
      `Book My Event is a web app that enables users to create, manage, and purchase event tickets seamlessly.`,
      `As a Frontend Developer on the Book My Event project, I developed secure and user-friendly authentication features using React Hook Form and React Thunk. Built with React, Vite, TypeScript, and Tailwind CSS, I ensured a smooth registration and login experience. Additionally, I implemented an interactive Slick Slider, enhancing the platform’s dynamic content presentation.`,
    ],
  },
];
