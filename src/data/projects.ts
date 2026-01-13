export interface TableData {
  title: string
  headers: string[]
  rows: string[][]
}

export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  problem: string
  solution: string
  tech: string[]
  github?: string
  demo?: string
  architecture?: string // ASCII diagram
  tables?: TableData[]
}

export const projects: Project[] = [
  {
    slug: "price-tracker",
    title: "Price Tracker",
    description:
      "Full-stack SSENSE price tracker on Cloudflare's edge with circuit breaker patterns, Queues with DLQ, Redis distributed locking, and tRPC end-to-end types.",
    longDescription:
      "Tracks SSENSE prices and emails you when prices drop or your size comes back in stock. TanStack Start + tRPC for full-stack type safety, dual Postgres/D1 database setup, React 19 with the new compiler, and Recharts for price history graphs.",
    problem:
      "I got tired of manually checking SSENSE for sales. Needed something that would notify me when prices dropped.",
    solution:
      "The interesting part was making the scraper resilient. Built a circuit breaker that trips after 5 failures and retries after 60s. Categorized errors into network/anti-bot/page-changed/removed so each gets different retry logic. Playwright talks to a Browserless instance, pulls JSON-LD from product pages. Cloudflare Queues handles job scheduling with a DLQ for failures. Redis does distributed locking so we don't scrape the same item twice. Rate limiting is sliding window - 10 writes/min, 60 reads/min per user. Scraping doesn't scale economically though - residential proxies, Browserless, CF Workers, Neon, Redis adds up to $150-350/mo for 1000 items. Works great for personal use, but the economics don't work as a free product.",
    tech: [
      "TypeScript",
      "React 19",
      "TanStack Start",
      "tRPC",
      "Drizzle ORM",
      "Neon Postgres",
      "Cloudflare D1",
      "Cloudflare Workers",
      "Cloudflare Queues",
      "Upstash Redis",
      "Playwright",
      "Better Auth",
      "Vitest",
    ],
    github: "https://github.com/henrychu04/price-tracker",
    architecture: `
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   React +   │────▶│  CF Workers  │────▶│    Neon     │
│  TanStack   │     │   + tRPC     │     │  Postgres   │
└─────────────┘     └──────┬───────┘     └─────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │  CF Queues   │──────┐
                   │   (jobs)     │      │
                   └──────────────┘      │
                          │              │
                          ▼              ▼
                   ┌──────────────┐  ┌────────┐
                   │  Browserless │  │  DLQ   │
                   │  (Playwright)│  │(failed)│
                   └──────┬───────┘  └────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │ Upstash Redis│
                   │  (locking)   │
                   └──────────────┘
`,
    tables: [
      {
        title: "Monthly Infrastructure Costs (1000 items, 3x/day)",
        headers: ["Service", "Cost", "Why"],
        rows: [
          ["Residential Proxies", "$50-150", "Bypass anti-bot detection"],
          ["Browserless", "$50-100", "Headless browser compute"],
          ["Cloudflare Workers", "$5-25", "Edge runtime + Queues + R2"],
          ["Neon Postgres", "$19-50", "App data storage"],
          ["Upstash Redis", "$10-20", "Distributed locking"],
          ["Total", "$150-350/mo", "Before maintenance costs"],
        ],
      },
    ],
  },
  {
    slug: "realtime-chat",
    title: "Real-time Chat",
    description:
      "Real-time chat running entirely on Cloudflare's edge. Durable Objects manage WebSocket connections per room, D1 persists messages, tRPC keeps the whole stack type-safe.",
    longDescription:
      "Built to explore Durable Objects beyond the basic counter tutorial. Each chat room is its own DO instance holding WebSocket connections in memory. React Router v7 handles SSR, tRPC gives end-to-end types from D1 queries to React components. Better Auth manages sessions with automatic JWT refresh.",
    problem:
      "Most Durable Objects tutorials stop at incrementing a counter. I needed to see how they handle real concurrent state like WebSocket connections and message broadcasting.",
    solution:
      "Each room is a Durable Object that manages its own WebSocket connections and broadcasts messages. The interesting part was handling hibernation - DOs don't keep connections in memory during idle, so they wake on each message. Used tRPC so API responses are typed without maintaining separate type definitions. Drizzle generates type-safe D1 queries. shadcn/ui for components since I didn't want to build a design system from scratch. Durable Objects turned out simpler than expected - just classes with automatic persistence. The gotcha is WebSocket hibernation and understanding when your DO instance actually runs.",
    tech: [
      "TypeScript",
      "React Router v7",
      "tRPC",
      "Drizzle ORM",
      "Cloudflare D1",
      "Cloudflare Workers",
      "Cloudflare Durable Objects",
      "Better Auth",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    github: "https://github.com/henrychu04/chatting",
    architecture: `
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  React +    │────▶│  CF Workers  │────▶│     D1      │
│  RR v7 SSR  │     │   + tRPC     │     │  (SQLite)   │
└─────────────┘     └──────┬───────┘     └─────────────┘
                          │
                          ▼
                   ┌──────────────┐
                   │   Durable    │
                   │   Objects    │
                   │  (per room)  │
                   └──────┬───────┘
                          │
                   WebSocket ↕ broadcast
                          │
                   ┌──────────────┐
                   │   Clients    │
                   │  (browsers)  │
                   └──────────────┘
`,
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
