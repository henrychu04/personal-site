import { createFileRoute } from "@tanstack/react-router"
import { projects } from "../data/projects"
import { ProjectCard } from "../components/ProjectCard"

export const Route = createFileRoute("/")({
  component: Home,
})

function ExperienceCard({
  date,
  title,
  company,
  points,
  tags,
}: {
  date: string
  title: string
  company: string
  points: string[]
  tags: string[]
}) {
  return (
    <div className="grid grid-cols-[100px_1fr] gap-4 p-6 -mx-6 rounded-lg transition-all hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
      <span className="text-xs uppercase tracking-wide text-[#8a8a8a] pt-1">{date}</span>
      <div>
        <h3 className="text-base font-medium text-[#fafafa] mb-1">
          {title}
        </h3>
        <p className="text-sm text-[#a855f7] mb-3">{company}</p>
        <ul className="space-y-1 mb-4">
          {points.map((point, i) => (
            <li key={i} className="text-sm pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-[#a855f7]">
              {point}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1 bg-[#a855f7]/10 text-[#a855f7] rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function Home() {
  return (
    <div>
      {/* About Section */}
      <section id="about" className="mb-24">
        <p className="mb-4">
          I'm a software engineer specializing in high-throughput data pipelines, scalable APIs, and modern frontend development. Currently at Goldman Sachs, I work on a private fund modeling platform serving 5000+ users.
        </p>
        <p className="mb-4">
          My focus is building reliable, performant systems using{" "}
          <span className="text-[#fafafa]">Kotlin</span>,{" "}
          <span className="text-[#fafafa]">TypeScript</span>, and{" "}
          <span className="text-[#fafafa]">React</span>. I care deeply about code quality, test coverage, and developer experience.
        </p>
        <p>
          When I'm not coding, I'm usually running, watching movies, or reading.
        </p>
      </section>

      {/* Experience Section */}
      <section id="experience" className="mb-24">
        <ExperienceCard
          date="2022 — Now"
          title="Software Engineer Strat · Associate"
          company="Goldman Sachs"
          points={[
            "Architected 10+ features for fund modeling platform (5000+ users)",
            "Built data pipelines processing 50k+ records daily",
            "Improved test coverage from 0% to 80%",
            "Reduced API load time by 75% with React Query",
            "Mentored 5+ junior engineers",
          ]}
          tags={["Kotlin", "Spring Boot", "React", "TypeScript"]}
        />

        <ExperienceCard
          date="2021 — 2022"
          title="Research Assistant"
          company="Rutgers HackRSpace"
          points={[
            "Deployed IaaS platform in Golang for students",
            "Achieved 99.9% uptime for 10+ deployments",
            "Managed containers and NGINX reverse proxies",
          ]}
          tags={["Golang", "Docker", "NGINX"]}
        />
      </section>

      {/* Projects Section */}
      <section id="projects" className="mb-24">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </section>

      {/* Footer */}
      <footer className="text-sm text-[#8a8a8a] pt-6">
        <p>
          Built with React, TypeScript, and Tailwind CSS.
        </p>
      </footer>
    </div>
  )
}
