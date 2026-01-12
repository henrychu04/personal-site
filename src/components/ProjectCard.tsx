import { Link } from "@tanstack/react-router"
import type { Project } from "../data/projects"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="group block p-6 -mx-6 rounded-lg transition-all hover:bg-white/[0.03] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] cursor-pointer"
    >
      <h3 className="text-base font-medium text-[#fafafa] mb-2 group-hover:text-[#a855f7] transition-colors flex items-center gap-2">
        {project.title}
        <span className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
      </h3>
      <p className="text-sm text-[#a1a1aa] mb-4 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap items-center gap-2">
        {project.tech.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-xs px-3 py-1 bg-[#a855f7]/10 text-[#a855f7] rounded-full"
          >
            {tech}
          </span>
        ))}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="ml-auto text-xs text-[#8a8a8a] hover:text-[#a855f7] transition-colors"
          >
            GitHub
          </a>
        )}
      </div>
    </Link>
  )
}
