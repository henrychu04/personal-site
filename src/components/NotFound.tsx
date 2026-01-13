import { Link } from "@tanstack/react-router"

export function NotFound() {
  return (
    <div className="text-center py-16">
      <h1 className="text-4xl font-medium text-white mb-4">404</h1>
      <p className="mb-8">Page not found</p>
      <Link to="/" className="text-sm hover:text-white transition-colors">
        ← Back home
      </Link>
    </div>
  )
}
