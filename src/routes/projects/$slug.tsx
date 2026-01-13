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
          <svg
            viewBox="0 0 16 16"
            className="w-4 h-4"
            fill="currentColor"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
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
