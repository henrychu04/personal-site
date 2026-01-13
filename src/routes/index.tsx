import { createFileRoute, Link } from "@tanstack/react-router"
import { projects } from "../data/projects"
import { GitHubIcon, LinkedInIcon, EmailIcon } from "../components/Icons"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <div>
      {/* Header */}
      <header className="mb-12">
        <h1 className="text-xl font-medium text-white mb-4">Henry Chu</h1>
        <p className="leading-relaxed">
          Software engineer building data pipelines at Goldman Sachs. Obsessed with TypeScript, edge computing, and making things fast.
        </p>
      </header>

      {/* Links */}
      <nav className="flex gap-4 sm:gap-6 mb-12 sm:mb-16 text-sm">
        <a href="https://github.com/henrychu04" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
          <GitHubIcon />
          GitHub
        </a>
        <a href="https://linkedin.com/in/henrychu04" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
          <LinkedInIcon />
          LinkedIn
        </a>
        <a href="mailto:henrychu04@gmail.com" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
          <EmailIcon />
          Email
        </a>
      </nav>

      {/* Projects */}
      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-widest text-[#787878] mb-6">Projects</h2>

        {projects.map((project) => (
          <div key={project.slug} className="mb-8">
            <h3 className="text-[15px] text-white mb-1">
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                preload="intent"
                className="hover:text-[#a855f7] transition-colors"
              >
                {project.title} →
              </Link>
            </h3>
            <p className="text-sm">{project.description}</p>
          </div>
        ))}
      </section>

      {/* Experience */}
      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-widest text-[#787878] mb-6">Experience</h2>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <span className="text-[15px] text-white">Software Engineer Strat</span>
            <span className="text-xs text-[#787878]">2022 — Now</span>
          </div>
          <p className="text-sm mb-2">Goldman Sachs</p>
          <p className="text-sm">Building a full-stack private institutional fund portfolio management and projections application. Data pipelines, React Query optimization, 80% test coverage.</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <span className="text-[15px] text-white">Research Assistant</span>
            <span className="text-xs text-[#787878]">2021 — 2022</span>
          </div>
          <p className="text-sm mb-2">Rutgers HackRSpace</p>
          <p className="text-sm">Deployed IaaS platform in Golang. Managed containers and NGINX reverse proxies.</p>
        </div>
      </section>
    </div>
  )
}
