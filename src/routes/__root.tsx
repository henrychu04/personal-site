import { createRootRoute, Outlet } from "@tanstack/react-router"
import { NotFound } from "../components/NotFound"

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-black text-[#9ca3af] font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only fixed left-4 top-4 z-10 bg-black px-4 py-3 text-sm text-white"
      >
        Skip to content
      </a>
      <main id="main-content" tabIndex={-1} className="max-w-[600px] mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <Outlet />
      </main>
    </div>
  )
}
