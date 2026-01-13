import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router"
import { NotFound } from "../components/NotFound"

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFound,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-black text-[#9ca3af] font-sans">
      <ScrollRestoration />
      <main className="max-w-[600px] mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <Outlet />
      </main>
    </div>
  )
}
