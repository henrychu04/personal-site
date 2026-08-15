import { describe, expect, test } from "bun:test"
import { projects } from "../src/data/projects"

describe("project content", () => {
  test("uses unique, URL-safe slugs", () => {
    const slugs = projects.map((project) => project.slug)

    expect(new Set(slugs).size).toBe(slugs.length)
    slugs.forEach((slug) => expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/))
  })

  test("has complete case-study content", () => {
    projects.forEach((project) => {
      expect(project.title.trim()).not.toBe("")
      expect(project.description.trim()).not.toBe("")
      expect(project.longDescription.trim()).not.toBe("")
      expect(project.problem.trim()).not.toBe("")
      expect(project.solution.trim()).not.toBe("")
      expect(project.tech.length).toBeGreaterThan(0)
      expect(project.takeaways?.length ?? 0).toBeGreaterThanOrEqual(2)
    })
  })

  test("uses safe external URLs", () => {
    projects.forEach((project) => {
      for (const url of [project.github, project.demo].filter(Boolean)) {
        expect(new URL(url!).protocol).toBe("https:")
      }
    })
  })

  test("keeps table rows aligned with their headers", () => {
    projects.flatMap((project) => project.tables ?? []).forEach((table) => {
      expect(table.headers.length).toBeGreaterThan(0)
      table.rows.forEach((row) => expect(row).toHaveLength(table.headers.length))
    })
  })
})
