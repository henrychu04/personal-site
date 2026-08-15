import { Link } from "@tanstack/react-router"
import { PageMetadata } from "./PageMetadata"

export function NotFound() {
  return (
    <div className="text-center py-16">
      <PageMetadata
        title="Page not found — Henry Chu"
        description="The requested page could not be found."
        path="/404"
        noIndex
      />
      <h1 className="text-4xl font-medium text-white mb-4">404</h1>
      <p className="mb-8">Page not found</p>
      <Link to="/" className="inline-flex min-h-11 items-center text-sm hover:text-white transition-colors">
        ← Back home
      </Link>
    </div>
  )
}
