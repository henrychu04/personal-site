import { createFileRoute, Link } from "@tanstack/react-router"
import { projects } from "../data/projects"
import { GitHubIcon, LinkedInIcon, EmailIcon } from "../components/Icons"
import { PageMetadata } from "../components/PageMetadata"

export const Route = createFileRoute("/")({
  component: Home,
})

function Home() {
  return (
    <div>
      <PageMetadata
        title="Henry Chu — Software Engineer"
        description="Software engineer building risk analytics, edge systems, and developer tools. Selected side projects and professional experience."
        path="/"
      />

      {/* Header */}
      <header className="mb-12">
        <h1 className="text-xl font-medium text-white mb-4">Henry Chu</h1>
        <p className="leading-relaxed">
          Software engineer at Goldman Sachs building risk analytics for private markets. On the side, I build performance-focused systems with TypeScript.
        </p>
      </header>

      {/* Links */}
      <nav aria-label="Contact links" className="flex flex-wrap gap-x-4 sm:gap-x-6 mb-12 sm:mb-16 text-sm">
        <a href="https://github.com/henrychu04" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex min-h-11 items-center gap-1.5">
          <GitHubIcon />
          GitHub
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href="https://linkedin.com/in/henrychu04" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors inline-flex min-h-11 items-center gap-1.5">
          <LinkedInIcon />
          LinkedIn
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
        <a href="mailto:henrychu04@gmail.com" className="hover:text-white transition-colors inline-flex min-h-11 items-center gap-1.5">
          <EmailIcon />
          Email
        </a>
      </nav>

      {/* Side projects */}
      <section aria-labelledby="projects-heading" className="mb-16">
        <h2 id="projects-heading" className="text-sm uppercase tracking-widest text-[#8b8b8b] mb-6">Side Projects</h2>

        {projects.map((project) => (
          <article key={project.slug} className="mb-9">
            <h3 className="text-base text-white">
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                preload="intent"
                className="hover:text-[#c084fc] transition-colors inline-flex min-h-11 items-center"
              >
                {project.title} →
              </Link>
            </h3>
            <p className="text-sm">{project.description}</p>
            <p className="mt-2 text-xs text-[#8b8b8b]">{project.tech.slice(0, 4).join(" · ")}</p>
          </article>
        ))}
      </section>

      {/* Experience */}
      <section aria-labelledby="experience-heading" className="mb-16">
        <h2 id="experience-heading" className="text-sm uppercase tracking-widest text-[#8b8b8b] mb-6">Experience</h2>

        <article className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <h3 className="text-base text-white">Software Engineer Strat</h3>
            <span className="text-xs text-[#8b8b8b]"><time dateTime="2022">2022</time> – Present</span>
          </div>
          <p className="text-sm mb-2">Goldman Sachs</p>
          <p className="text-sm">Architected and own a risk analytics platform used across Goldman's private asset classes, modeling projected fund returns, running scenario analyses, and tracking performance drivers. Led a Kotlin/Spring Boot API performance overhaul that cut endpoint latency by ~60%, introduced multi-layer caching, and built test coverage from 0% to 80%. Lead 2 contractors and mentor 5+ engineers as sole code reviewer for the team.</p>
        </article>

        <article className="mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
            <h3 className="text-base text-white">Research Assistant</h3>
            <span className="text-xs text-[#8b8b8b]"><time dateTime="2021">2021</time> – <time dateTime="2022">2022</time></span>
          </div>
          <p className="text-sm mb-2">Rutgers HackRSpace</p>
          <p className="text-sm">Deployed IaaS platform in Golang. Managed containers and NGINX reverse proxies.</p>
        </article>
      </section>

      <section aria-labelledby="contact-heading" className="border-t border-white/10 pt-8">
        <h2 id="contact-heading" className="text-base text-white mb-2">Let’s compare notes.</h2>
        <p className="text-sm mb-3">Interested in edge systems, applied AI, or developer tooling?</p>
        <a href="mailto:henrychu04@gmail.com" className="inline-flex min-h-11 items-center text-sm text-white hover:text-[#c084fc] transition-colors">
          Send me an email →
        </a>
      </section>
    </div>
  )
}
