import { createLazyFileRoute, Link } from "@tanstack/react-router"
import { GitHubIcon } from "../../components/Icons"
import { PageMetadata } from "../../components/PageMetadata"

export const Route = createLazyFileRoute("/projects/$slug")({
  component: ProjectDetail,
})

function ProjectDetail() {
  const { project } = Route.useLoaderData()
  const solutionParagraphs = project.solution.split(/\n\n+/)

  return (
    <article>
      <PageMetadata
        title={`${project.title} — Henry Chu`}
        description={project.description}
        path={`/projects/${project.slug}`}
      />

      <Link to="/" className="text-sm hover:text-white transition-colors mb-8 inline-flex min-h-11 items-center">
        ← Back
      </Link>

      <header className="mb-8">
        <h1 className="text-2xl font-medium text-white">{project.title}</h1>
        <p className="mt-2 mb-3 text-xs text-[#8b8b8b]">Side project</p>
        <p className="leading-relaxed">{project.longDescription}</p>
      </header>

      {(project.github || project.demo) && (
        <nav aria-label="Project links" className="flex flex-wrap gap-x-6 mb-10 text-sm">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex min-h-11 items-center gap-1.5"
            >
              <GitHubIcon />
              GitHub
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex min-h-11 items-center"
            >
              Live demo →
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </nav>
      )}

      <section className="mb-8">
        <h2 className="text-sm uppercase tracking-widest text-[#8b8b8b] mb-3">Problem</h2>
        <p className="text-sm">{project.problem}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-sm uppercase tracking-widest text-[#8b8b8b] mb-3">Solution</h2>
        <div className="space-y-4 text-sm">
          {solutionParagraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>

      {project.takeaways && (
        <section className="mb-8">
          <h2 className="text-sm uppercase tracking-widest text-[#8b8b8b] mb-3">Takeaways</h2>
          <ul className="space-y-2 text-sm">
            {project.takeaways.map((takeaway) => (
              <li key={takeaway} className="flex gap-3">
                <span aria-hidden="true" className="text-[#c084fc]">→</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-sm uppercase tracking-widest text-[#8b8b8b] mb-3">Technology</h2>
        <ul aria-label="Technologies used" className="flex flex-wrap gap-2">
          {project.tech.map((technology) => (
            <li key={technology} className="rounded-full border border-white/10 px-3 py-1 text-sm">
              {technology}
            </li>
          ))}
        </ul>
      </section>

      {project.architecture && (
        <section className="mb-8">
          <h2 className="text-sm uppercase tracking-widest text-[#8b8b8b] mb-3">Architecture</h2>
          <figure>
            <pre
              role="img"
              aria-label={`Architecture diagram for ${project.title}`}
              className="text-xs leading-relaxed overflow-x-auto bg-white/[0.02] p-3 sm:p-4 rounded border border-white/5"
            >
              {project.architecture.trim()}
            </pre>
            <figcaption className="sr-only">
              The diagram shows the principal services and data flow described in the solution above.
            </figcaption>
          </figure>
        </section>
      )}

      {project.tables?.map((table, i) => (
        <section key={i} className="mb-8">
          <h2 className="text-sm uppercase tracking-widest text-[#8b8b8b] mb-3">{table.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">{table.title}</caption>
              <thead>
                <tr className="border-b border-white/10">
                  {table.headers.map((header, j) => (
                    <th key={j} scope="col" className="text-left py-2 pr-4 text-white font-medium">
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

    </article>
  )
}
