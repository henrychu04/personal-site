import { createFileRoute, notFound, Link } from "@tanstack/react-router"
import { getProjectBySlug } from "../../data/projects"

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetail,
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug)
    if (!project) {
      throw notFound()
    }
    return { project }
  },
})

function ProjectDetail() {
  const { project } = Route.useLoaderData()

  return (
    <div>
      <Link
        to="/"
        className="text-[#a855f7] hover:text-[#c084fc] mb-8 inline-flex items-center gap-2 text-sm"
      >
        <span>←</span> Back to Home
      </Link>

      <h1 className="text-3xl font-bold text-[#fafafa] mb-4">{project.title}</h1>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 bg-[#a855f7]/10 text-[#a855f7] rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-4 mb-8">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 border border-white/10 rounded-lg hover:border-[#a855f7]/50 text-[#fafafa] text-sm transition-colors"
          >
            View on GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-[#a855f7] text-white rounded-lg hover:bg-[#9333ea] text-sm transition-colors"
          >
            Live Demo
          </a>
        )}
      </div>

      {/* Long Description */}
      <section className="mb-8">
        <p className="text-[#a1a1aa] leading-relaxed">
          {project.longDescription}
        </p>
      </section>

      {/* Problem */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#fafafa] mb-3">The Problem</h2>
        <p className="text-[#a1a1aa]">{project.problem}</p>
      </section>

      {/* Solution */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#fafafa] mb-3">The Solution</h2>
        <p className="text-[#a1a1aa]">{project.solution}</p>
      </section>

      {/* Learnings */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-[#fafafa] mb-3">What I Learned</h2>
        <p className="text-[#a1a1aa]">{project.learnings}</p>
      </section>
    </div>
  )
}
