import { createRootRoute, Outlet, Link, ScrollRestoration } from "@tanstack/react-router"
import { useState, useEffect } from "react"

export const Route = createRootRoute({
  component: RootLayout,
})

function NavLink({ to, children, isActive }: { to: string; children: React.ReactNode; isActive: boolean }) {
  return (
    <a
      href={to}
      className={`group flex items-center gap-4 py-3 text-xs font-semibold uppercase tracking-widest transition-all ${
        isActive ? "text-[#fafafa]" : "text-[#8a8a8a] hover:text-[#fafafa]"
      }`}
    >
      <span
        className={`h-px transition-all ${
          isActive ? "w-16 bg-[#fafafa]" : "w-8 bg-[#8a8a8a] group-hover:w-16 group-hover:bg-[#fafafa]"
        }`}
      />
      {children}
    </a>
  )
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("about")

  useEffect(() => {
    const sections = ["about", "experience", "projects"]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: 0,
      }
    )

    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [])

  return activeSection
}

function RootLayout() {
  const activeSection = useActiveSection()

  return (
    <div className="min-h-screen bg-black text-[#a1a1aa]">
      <ScrollRestoration />
      <div className="flex max-w-[1200px] mx-auto min-h-screen">
        {/* Sidebar */}
        <header className="w-[45%] p-24 sticky top-0 h-screen flex flex-col max-lg:hidden">
          <Link to="/" className="block">
            <h1 className="text-5xl font-bold text-[#fafafa] tracking-tight mb-3">Henry Chu</h1>
          </Link>
          <p className="text-xl text-[#fafafa] font-medium mb-4">
            Software Engineer at <span className="text-[#a855f7]">Goldman Sachs</span>
          </p>
          <p className="text-[#a1a1aa] max-w-xs mb-8">
            I build full-stack applications with an emphasis on performance, scalability, and clean code.
          </p>

          <nav className="mb-auto">
            <NavLink to="#about" isActive={activeSection === "about"}>About</NavLink>
            <NavLink to="#experience" isActive={activeSection === "experience"}>Experience</NavLink>
            <NavLink to="#projects" isActive={activeSection === "projects"}>Projects</NavLink>
          </nav>

          <div className="flex gap-5">
            <a href="https://github.com/henrychu04" target="_blank" rel="noopener noreferrer" className="text-sm text-[#8a8a8a] hover:text-[#a855f7] transition-colors">
              GitHub
            </a>
            <a href="https://linkedin.com/in/henrychu04" target="_blank" rel="noopener noreferrer" className="text-sm text-[#8a8a8a] hover:text-[#a855f7] transition-colors">
              LinkedIn
            </a>
            <a href="mailto:henrychu04@gmail.com" className="text-sm text-[#8a8a8a] hover:text-[#a855f7] transition-colors">
              Email
            </a>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="lg:hidden fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-b border-white/5 z-50 px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-lg font-semibold text-[#fafafa]">Henry Chu</Link>
            <div className="flex gap-4">
              <a href="https://github.com/henrychu04" target="_blank" rel="noopener noreferrer" className="text-sm text-[#8a8a8a] hover:text-[#a855f7]">GitHub</a>
              <a href="https://linkedin.com/in/henrychu04" target="_blank" rel="noopener noreferrer" className="text-sm text-[#8a8a8a] hover:text-[#a855f7]">LinkedIn</a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main id="main-content" className="w-[55%] py-24 px-12 max-lg:w-full max-lg:pt-20 max-lg:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
