# hchu.dev

Henry Chu's portfolio and project case studies. The site is a small React application built with Vite, TanStack Router, and Tailwind CSS, then deployed as static assets on Cloudflare Workers.

## Local development

```sh
bun install --frozen-lockfile
bun run dev
```

Run the complete verification suite with:

```sh
bun run check
```

## Editing content

Side-project content lives in `src/data/projects.ts`. Every project requires a unique URL-safe slug, summaries, problem and solution copy, at least one technology, and at least two takeaways. Optional repository, demo, architecture, and table fields render only when present. Professional work remains separate in the homepage Experience section.

Paragraphs in a solution are separated with a blank line. The build validates the data and creates one HTML entry point per project so direct URLs receive project-specific metadata.

When adding or removing a project, `bun run build` automatically regenerates the project entry points and `sitemap.xml`.

## Deployment

`bun run build` writes deployable assets to `dist/`. Cloudflare serves known HTML routes without trailing slashes and returns the static `404.html` page for unknown paths. Cache and security policies live in `public/_headers`.
