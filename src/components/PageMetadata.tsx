import { useEffect } from "react"

interface PageMetadataProps {
  title: string
  description: string
  path: string
  noIndex?: boolean
}

const siteUrl = "https://hchu.dev"

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement("meta")
    document.head.append(element)
  }

  Object.entries(attributes).forEach(([name, value]) => element?.setAttribute(name, value))
}

export function PageMetadata({ title, description, path, noIndex = false }: PageMetadataProps) {
  useEffect(() => {
    const canonicalUrl = new URL(path, siteUrl).toString()
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')

    if (!canonical) {
      canonical = document.createElement("link")
      canonical.rel = "canonical"
      document.head.append(canonical)
    }

    document.title = title
    canonical.href = canonicalUrl
    upsertMeta('meta[name="description"]', { name: "description", content: description })
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title })
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description })
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl })
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title })
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description })
    upsertMeta('meta[name="robots"]', {
      name: "robots",
      content: noIndex ? "noindex, nofollow" : "index, follow",
    })
  }, [description, noIndex, path, title])

  return null
}
