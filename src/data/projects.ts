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
    slug: "rl-trading",
    title: "BTC Trading Agent",
    description:
      "Autonomous BTC research and paper-trading system on Hyperliquid. Autoresearch loops generate strategies, walk-forward backtesting validates them, and champion/challenger promotion gates control what trades.",
    longDescription:
      "A local-first system for continuous BTC research on Hyperliquid. The core assumption is that any edge can disappear immediately, so the stack retrains often, promotes conservatively, and defaults to flat when conditions degrade. Inspired by Karpathy-style autoresearch loops and OpenViking filesystem memory.",
    problem:
      "Wanted to explore whether a systematic, automated research loop could find and maintain trading edges on Hyperliquid without manual strategy tweaking or constant supervision.",
    solution:
      "The interesting part is the autoresearch loop. It generates strategy specs as YAML, batch-evaluates them with walk-forward backtesting across multiple folds, and promotes winners through a champion/challenger gate. The gate checks walk-forward PnL, drawdown, Sharpe, signal rate, and requires consistency across folds before promotion. New champions shadow-trade for 300 bars before taking over.\n\nFeature engineering runs on 1-minute bars: quant indicators (RSI, MACD, Bollinger, ADX, ATR), microstructure features (trade size distribution, book depth shape, sweep cost), cross-asset signals (ETH/SOL divergence, funding spreads, BTC dominance), and derived features (momentum divergence, VWAP deviation, CVD). The pipeline uses DuckDB with cross-process file locking for the feature store.\n\nClaude and Codex act as research agents, reviewing leaderboards and proposing new strategy batches. The loop is data-aware: it waits for new market data before resuming instead of burning API calls. Champions auto-extend their TTL when no replacement exists so paper trading never goes dark.",
    tech: [
      "Python",
      "Hyperliquid API",
      "DuckDB",
      "scikit-learn",
      "Parquet",
      "Claude Code",
      "Codex",
    ],
    architecture: `
┌──────────────┐     ┌───────────────┐     ┌──────────────┐
│  Hyperliquid │────▶│   Collector   │────▶│   DuckDB     │
│   WebSocket  │     │  (trades, L2, │     │  (Parquet +  │
│   + REST     │     │   candles)    │     │   features)  │
└──────────────┘     └───────────────┘     └──────┬───────┘
                                                  │
                                                  ▼
┌──────────────┐     ┌───────────────┐     ┌──────────────┐
│    Agent     │────▶│  Autoresearch │────▶│  Walk-Forward│
│  (Claude /   │     │    Loop       │     │  Backtester  │
│   Codex)     │     └───────────────┘     └──────┬───────┘
└──────────────┘                                  │
                                                  ▼
                     ┌───────────────┐     ┌──────────────┐
                     │    Paper      │◀────│  Champion /  │
                     │   Trader      │     │  Challenger  │
                     │ (risk checks) │     │  Promotion   │
                     └───────────────┘     └──────────────┘
`,
  },
  {
    slug: "a2a-hub",
    title: "A2A Hub",
    description:
      "Registry and management platform for Google's A2A protocol agents. Validate, register, monitor, and monetize agents. Think npm meets Uptime Robot for autonomous agents.",
    longDescription:
      "A public registry and management platform for agents built on Google's Agent2Agent protocol. Gives agent developers everything needed to go from 'I have an agent running' to 'my agent is discoverable, trusted, and earning revenue.' TanStack Start with streaming SSR, tRPC for type safety, and Stripe Connect for agent monetization.",
    problem:
      "The A2A protocol lets agents communicate, but there was no central place to discover, validate, or monitor them. Agents need trust signals (uptime, verification, versioned config history) before other agents will rely on them.",
    solution:
      "The validator probes remote Agent Cards against the A2A schema, checks endpoint reachability, verifies capabilities and auth schemes, and surfaces actionable diagnostics. Health monitoring pings every 30 minutes and tracks response times, status codes, and 30-day uptime.\n\nThe card snapshot system captures an immutable snapshot every time an Agent Card changes, with full diffing between versions. If a sync fails, the public profile keeps showing the last valid card.\n\nVerification uses a two-step flow: publish a token in your GitHub repo and at your agent's well-known endpoint. Verified agents earn a trust badge.\n\nFor monetization, I built a Stripe-powered Machine Payments Protocol flow for machine-to-machine transactions: per-request or per-token billing with usage metering. The JSON-RPC proxy enforces access control, initiates payments, records usage, and streams responses.\n\nUltimately shelved the project because open payment protocols like MPP and x402 eliminate the need for a middleman. Payment becomes a protocol-level concern, not something a platform brokers.",
    tech: [
      "TypeScript",
      "React 19",
      "TanStack Start",
      "tRPC",
      "Drizzle ORM",
      "Neon Postgres",
      "Cloudflare Workers",
      "Stripe Connect",
      "GitHub OAuth",
      "Tailwind CSS 4",
    ],
    github: "https://github.com/henrychu04/a2a-hub",
    architecture: `
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  React 19 + │────▶│  CF Workers  │────▶│    Neon     │
│  TanStack   │     │   + tRPC     │     │  Postgres   │
│  Start SSR  │     └──────┬───────┘     └─────────────┘
└─────────────┘            │
                           ├────────────────────┐
                           ▼                    ▼
                    ┌──────────────┐     ┌──────────────┐
                    │    Health    │     │   JSON-RPC   │
                    │   Monitor    │     │    Proxy     │
                    │  (30m cron)  │     │ (access ctl) │
                    └──────┬───────┘     └──────┬───────┘
                           │                    │
                           ▼                    ▼
                    ┌──────────────┐     ┌──────────────┐
                    │    Agent     │     │    Stripe    │
                    │  Endpoints   │     │   Connect    │
                    │    (A2A)     │     │    (MPP)     │
                    └──────────────┘     └──────────────┘
`,
  },
  {
    slug: "hivemind",
    title: "Hivemind",
    description:
      "Collective intelligence for AI coding agents. A shared knowledge base where agents post problems and solutions. When one agent solves a problem, every agent benefits.",
    longDescription:
      "A shared knowledge base that connects AI coding agents across tools. Agents post problems they encounter and solutions they discover. When another agent hits the same error, it searches Hivemind for verified solutions before debugging from scratch. Integrates with Claude Code, Codex, Windsurf, Cline, Cursor, and Copilot through CLI commands and automatic hooks.",
    problem:
      "AI coding agents waste significant time re-debugging the same errors. An agent working on a Cloudflare Workers project might hit the same D1 binding issue that another agent solved yesterday, but there's no way for them to share that knowledge.",
    solution:
      "Three mechanisms reinforce the behavior: CLI commands (search, post, report), an error-interception hook that automatically queries Hivemind when a Bash command errors, and project config snippets that remind agents to use it.\n\nThe hooks fire after every Bash tool call. The intercept-error hook queries Hivemind when errors are detected, injecting known solutions into context before the agent starts debugging. The capture-solve hook tracks errors across commands. When the same command later succeeds, it auto-posts the problem and nudges the agent to share the solution. Both hooks have a 3-second timeout and fail silently.\n\nSearch uses pgvector similarity matching combined with full-text search for hybrid retrieval. Solutions include secret scanning to scrub credentials before posting.\n\nThe init CLI auto-configures hooks for each supported tool, writing to settings.json for Claude Code, config.toml for Codex, hooks.json for Windsurf, and shell scripts for Cline. It handles backup and rollback of existing configs.\n\nDiscontinued after dogfooding because the error surface area across languages, frameworks, tools, environments, and agent behaviors was too large for the approach to be reliably useful.",
    tech: [
      "TypeScript",
      "Hono",
      "Cloudflare Workers",
      "PostgreSQL",
      "pgvector",
      "Drizzle ORM",
      "Zod",
      "pnpm monorepo",
    ],
    github: "https://github.com/henrychu04/hivemind",
    architecture: `
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Claude Code │     │    Codex     │     │  Windsurf /  │
│   (hooks)    │     │  (notify)    │     │ Cline / etc  │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       └────────────┬───────┴────────────────────┘
                    ▼
             ┌──────────────┐
             │  Hivemind    │
             │  CLI + Hook  │
             └──────┬───────┘
                    │
                    ▼
             ┌──────────────┐     ┌──────────────┐
             │  Hono API    │────▶│  PostgreSQL  │
             │ (CF Workers) │     │  + pgvector  │
             └──────────────┘     └──────────────┘
`,
  },
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
      "The interesting part was making the scraper resilient. Built a circuit breaker that trips after 5 failures and retries after 60s. Categorized errors into network/anti-bot/page-changed/removed so each gets different retry logic. Playwright talks to a Browserless instance, pulls JSON-LD from product pages. Cloudflare Queues handles job scheduling with a DLQ for failures. Redis does distributed locking so we don't scrape the same item twice. Rate limiting is sliding window at 10 writes/min, 60 reads/min per user. Scraping doesn't scale economically though. Residential proxies, Browserless, CF Workers, Neon, Redis adds up to $150 to $350/mo for 1000 items. Works great for personal use, but the economics don't work as a free product.",
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
          ["Total", "$150 to $350/mo", "Before maintenance costs"],
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
      "Each room is a Durable Object that manages its own WebSocket connections and broadcasts messages. The interesting part was handling hibernation. DOs don't keep connections in memory during idle, so they wake on each message. Used tRPC so API responses are typed without maintaining separate type definitions. Drizzle generates type-safe D1 queries. shadcn/ui for components since I didn't want to build a design system from scratch. Durable Objects turned out simpler than expected: just classes with automatic persistence. The gotcha is WebSocket hibernation and understanding when your DO instance actually runs.",
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
