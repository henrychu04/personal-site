export interface Project {
  slug: string
  title: string
  description: string
  longDescription: string
  problem: string
  solution: string
  learnings: string
  tech: string[]
  github?: string
  demo?: string
}

export const projects: Project[] = [
  {
    slug: "price-tracker",
    title: "Price Tracker",
    description:
      "A full-stack e-commerce price tracking application enabling users to monitor product prices and receive automated email notifications when prices drop.",
    longDescription:
      "Price Tracker is a comprehensive price monitoring solution built with TypeScript, React 19, and TanStack Start. It features automated scraping, real-time notifications, and a dual-database architecture for optimal performance.",
    problem:
      "Users needed a reliable way to track e-commerce prices across multiple items without manually checking websites daily.",
    solution:
      "Built a resilient scraping pipeline using Playwright and Browserless with circuit breaker pattern, error categorization, and smart retry logic. Implemented real-time price monitoring using Cloudflare Workers, Queues, and Upstash Redis for distributed job scheduling.",
    learnings:
      "Gained deep experience with serverless architecture patterns, circuit breaker implementations, and the trade-offs between different database solutions (Neon Postgres vs Cloudflare D1).",
    tech: [
      "TypeScript",
      "React 19",
      "TanStack Start",
      "Playwright",
      "Cloudflare Workers",
      "Neon Postgres",
      "Drizzle ORM",
      "tRPC",
      "Vitest",
    ],
    github: "https://github.com/henrychu04/price-tracker",
  },
  {
    slug: "realtime-chat",
    title: "Realtime Chatting App",
    description:
      "A globally distributed chat application with sub-50ms latency using Cloudflare Durable Objects for persistent state.",
    longDescription:
      "A real-time chat application leveraging edge computing principles for low-latency global communication. Features persistent chat rooms and live messaging capabilities.",
    problem:
      "Traditional chat applications suffer from latency issues for globally distributed users due to centralized server architecture.",
    solution:
      "Utilized Cloudflare Durable Objects for persistent chat room state, achieving sub-50ms message delivery. Built on Cloudflare Workers for edge compute, ensuring optimal routing and global scalability.",
    learnings:
      "Learned the power of edge computing for real-time applications and the unique patterns required for Durable Objects state management.",
    tech: ["React", "Tailwind CSS", "Cloudflare Workers", "Cloudflare Durable Objects"],
    github: "https://github.com/henrychu04/realtime-chat",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
