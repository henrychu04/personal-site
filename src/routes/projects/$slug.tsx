import { createFileRoute, notFound } from "@tanstack/react-router"
import { getProjectBySlug } from "../../data/projects"

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProjectBySlug(params.slug)
    if (!project) {
      throw notFound()
    }
    return { project }
  },
})
