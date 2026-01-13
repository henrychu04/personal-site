import { createFileRoute, notFound, Link } from "@tanstack/react-router"
import { getProjectBySlug } from "../../data/projects"
import { GitHubIcon } from "../../components/Icons"

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
      <Link to="/" className="text-sm hover:text-white transition-colors mb-8 inline-block">
        ← Back
      </Link>

      <h1 className="text-xl font-medium text-white mb-4">{project.title}</h1>

      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:text-white transition-colors mb-8 inline-flex items-center gap-1.5"
        >
          <GitHubIcon />
          GitHub
        </a>
      )}

      <section className="mb-8">
        <p className="leading-relaxed">{project.longDescription}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xs uppercase tracking-widest text-[#555] mb-3">Problem</h2>
        <p className="text-sm">{project.problem}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xs uppercase tracking-widest text-[#555] mb-3">Solution</h2>
        <p className="text-sm">{project.solution}</p>
      </section>

      {project.architecture && (
        <section className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-3">Architecture</h2>
          <pre className="text-[10px] sm:text-xs leading-relaxed overflow-x-auto bg-white/[0.02] p-3 sm:p-4 rounded border border-white/5">
            {project.architecture.trim()}
          </pre>
        </section>
      )}

      {project.tables?.map((table, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-[#555] mb-3">{table.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {table.headers.map((header, j) => (
                    <th key={j} className="text-left py-2 pr-4 text-white font-medium">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, j) => (
                  <tr key={j} className="border-b border-white/5">
                    {row.map((cell, k) => (
                      <td
                        key={k}
                        className={`py-2 pr-4 ${
                          j === table.rows.length - 1 ? "text-[#a855f7]" : ""
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

    </div>
  )
}
