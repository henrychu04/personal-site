import { createRootRoute, Outlet, Link, ScrollRestoration } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: RootLayout,
})

function RootLayout() {
  return (
    <div className="min-h-screen bg-black text-[#888] font-sans">
      <ScrollRestoration />
      <div className="max-w-[600px] mx-auto px-6 py-16">
        <Outlet />
      </div>
    </div>
  )
}
