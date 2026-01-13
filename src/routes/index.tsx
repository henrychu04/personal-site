import { createFileRoute, Link } from "@tanstack/react-router"
import { projects } from "../data/projects"

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
          <svg viewBox="0 0 16 16" className="w-4 h-4" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub
        </a>
        <a href="https://linkedin.com/in/henrychu04" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
          LinkedIn
        </a>
        <a href="mailto:henrychu04@gmail.com" className="hover:text-white transition-colors inline-flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          Email
        </a>
      </nav>

      {/* Projects */}
      <section className="mb-16">
        <h2 className="text-xs uppercase tracking-widest text-[#555] mb-6">Projects</h2>

        {projects.map((project) => (
          <div key={project.slug} className="mb-8">
            <h3 className="text-[15px] text-white mb-1">
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
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
        <h2 className="text-xs uppercase tracking-widest text-[#555] mb-6">Experience</h2>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <span className="text-[15px] text-white">Software Engineer Strat</span>
            <span className="text-xs text-[#555]">2022 — Now</span>
          </div>
          <p className="text-sm mb-2">Goldman Sachs</p>
          <p className="text-sm">Building a full-stack private institutional fund portfolio management and projections application. Data pipelines, React Query optimization, 80% test coverage.</p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <span className="text-[15px] text-white">Research Assistant</span>
            <span className="text-xs text-[#555]">2021 — 2022</span>
          </div>
          <p className="text-sm mb-2">Rutgers HackRSpace</p>
          <p className="text-sm">Deployed IaaS platform in Golang. Managed containers and NGINX reverse proxies.</p>
        </div>
      </section>
    </div>
  )
}
