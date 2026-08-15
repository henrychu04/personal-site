import { mkdir, readFile, writeFile } from "node:fs/promises"
import { projects } from "../src/data/projects"

const outputDirectory = new URL("../dist/", import.meta.url)
const siteUrl = "https://hchu.dev"

interface Metadata {
  title: string
  description: string
  url: string
}

function escapeAttribute(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
}

function replaceOnce(html: string, pattern: RegExp, replacement: string) {
  if (!pattern.test(html)) {
    throw new Error(`Could not find metadata pattern: ${pattern}`)
  }

  return html.replace(pattern, replacement)
}

function withMetadata(template: string, metadata: Metadata) {
  const title = escapeAttribute(metadata.title)
  const description = escapeAttribute(metadata.description)
  const url = escapeAttribute(metadata.url)
  let html = template

  html = replaceOnce(html, /<title>.*?<\/title>/, `<title>${title}</title>`)
  html = replaceOnce(html, /<meta name="description" content=".*?" \/>/, `<meta name="description" content="${description}" />`)
  html = replaceOnce(html, /<link rel="canonical" href=".*?" \/>/, `<link rel="canonical" href="${url}" />`)
  html = replaceOnce(html, /<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${title}" />`)
  html = replaceOnce(html, /<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${description}" />`)
  html = replaceOnce(html, /<meta property="og:url" content=".*?" \/>/, `<meta property="og:url" content="${url}" />`)
  html = replaceOnce(html, /<meta name="twitter:title" content=".*?" \/>/, `<meta name="twitter:title" content="${title}" />`)
  html = replaceOnce(html, /<meta name="twitter:description" content=".*?" \/>/, `<meta name="twitter:description" content="${description}" />`)

  return html
}

const template = await readFile(new URL("index.html", outputDirectory), "utf8")
const projectsDirectory = new URL("projects/", outputDirectory)
await mkdir(projectsDirectory, { recursive: true })

for (const project of projects) {
  const path = `/projects/${project.slug}`
  const html = withMetadata(template, {
    title: `${project.title} — Henry Chu`,
    description: project.description,
    url: new URL(path, siteUrl).toString(),
  })

  await writeFile(new URL(`${project.slug}.html`, projectsDirectory), html)
}

const sitemapUrls = ["/", ...projects.map((project) => `/projects/${project.slug}`)]
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapUrls.map((path) => `  <url><loc>${new URL(path, siteUrl).toString()}</loc></url>`),
  "</urlset>",
  "",
].join("\n")

await writeFile(new URL("sitemap.xml", outputDirectory), sitemap)

console.log(`Generated ${projects.length} project pages and sitemap.xml`)
