# 04 — Task Breakdown

Atomic tasks, ordered. Each has acceptance criteria. Dependencies in `deps:`. Check the box on completion.

Legend: `[ ]` open · `[x]` done.

---

## Foundation

- [ ] **T-001** — Scaffold Next.js 15 + TypeScript strict + Tailwind v4
  - **deps:** none
  - **accept:** `npm run dev` boots, `npm run build` succeeds, `tsc --noEmit` clean, `app/layout.tsx` and `app/page.tsx` exist with the correct fonts.

- [ ] **T-002** — Tooling: ESLint flat config, Prettier, Vitest, Playwright, scripts
  - **deps:** T-001
  - **accept:** `npm run lint`, `npm run typecheck`, `npm run test`, `npm run test:e2e -- --list` all execute. ESLint includes `jsx-a11y`.

- [ ] **T-003** — Design tokens + global CSS + theme provider
  - **deps:** T-001
  - **accept:** Dark default, light toggle persists in `localStorage` under `theme`, no FOUC, `prefers-reduced-motion` respected.

- [ ] **T-004** — Layout primitives: `Container`, `Section`, `Prose`, `Button`, `Tag`
  - **deps:** T-003
  - **accept:** Each component has a colocated test rendering it, `npm run test` green.

- [ ] **T-005** — `<SiteHeader />`, `<SiteFooter />`, `<ThemeToggle />`
  - **deps:** T-004
  - **accept:** Header sticky at `lg+`, theme toggle has `aria-label`, footer has GitHub + LinkedIn + email + resume link.

## Content pipeline

- [ ] **T-006** — MDX support + frontmatter loaders (`lib/mdx.ts`, `lib/projects.ts`, `lib/writing.ts`)
  - **deps:** T-001
  - **accept:** Loaders return strongly-typed lists and reject MDX with bad frontmatter via `zod`. Vitest covers happy path and bad frontmatter.

- [ ] **T-007** — Author 5 project MDX files (placeholders allowed, but real metrics where known)
  - **deps:** T-006
  - **accept:** `verax-erp`, `policymind`, `collectmind`, `loanpulse`, `nemo-trizetto` exist with full frontmatter + body sections (Problem, Approach, Stack, Outcomes, Lessons). Em dashes absent. `<!-- TODO: ARUN COPY -->` markers used where copy is a placeholder.

- [ ] **T-008** — `_placeholder.mdx` post in `/content/writing/` and `lib/writing.ts` filters drafts
  - **deps:** T-006
  - **accept:** `_placeholder.mdx` flagged `draft: true`, listing is empty, scaffold proven.

## Pages

- [ ] **T-009** — `/` Home: hero, featured projects, contact CTA
  - **deps:** T-005, T-007
  - **accept:** Three featured cards rendered (`featured: true` from MDX). Lighthouse a11y 100, axe-core zero violations.

- [ ] **T-010** — `/projects` index with filter
  - **deps:** T-007
  - **accept:** All projects render, filter chips update URL via `useSearchParams`, deep link `?domain=ai-ml` filters correctly.

- [ ] **T-011** — `/projects/[slug]` case study layout (renders MDX with shiki, metrics row, JSON-LD)
  - **deps:** T-007
  - **accept:** All five slugs build statically. Code blocks render with shiki at build, no client JS for highlighting. `generateStaticParams` returns 5 slugs.

- [ ] **T-012** — `/about` (intro, timeline, skills matrix, human texture)
  - **deps:** T-005
  - **accept:** Single `<h1>`. Cricket + 0DTE options at the bottom. ModMed RIF not mentioned anywhere.

- [ ] **T-013** — `/writing` index + `/writing/[slug]` with empty-state copy
  - **deps:** T-008
  - **accept:** Empty state shipped (no posts) but route + MDX rendering proven by an internal-only fixture used in test, not shipped to prod.

- [ ] **T-014** — `/contact` with form + `/api/contact` Resend stub
  - **deps:** T-005
  - **accept:** Posting to `/api/contact` returns 200 with `stub: true` when `RESEND_API_KEY` unset. Honeypot drops without 4xx. Zod validation on bad payloads returns 422. Vitest covers all 3 paths.

- [ ] **T-015** — `/resume` HTML view + `public/arun-veligatla-resume.pdf` placeholder + `/cv` redirect
  - **deps:** T-005
  - **accept:** PDF link exists, HTML mirror renders the same content as `/about` plus contact lines, `/cv` redirects 308 to `/resume`.

- [ ] **T-016** — `not-found.tsx`, `error.tsx`, accessible 404/500 copy
  - **deps:** T-005
  - **accept:** Visiting `/totally-not-a-page` shows the 404 with link back to `/`. `error.tsx` boundary has `reset()` button.

## SEO / SMO / OG

- [ ] **T-017** — `next-sitemap`, `robots`, canonical URLs, per-page `metadata`
  - **deps:** T-009..T-015
  - **accept:** `sitemap.xml` lists every public route; `robots.txt` allows all; each page has unique `<title>` and meta description.

- [ ] **T-018** — `@vercel/og` route + per-page OG fallback PNG
  - **deps:** T-017
  - **accept:** `/og?title=...&eyebrow=...` returns a 1200×630 PNG. Each project sets `openGraph.images` to its OG URL.

- [ ] **T-019** — JSON-LD Person schema on `/`, BreadcrumbList on inner pages
  - **deps:** T-017
  - **accept:** Validates against schema.org; injected via `<JsonLd />`.

## Quality

- [ ] **T-020** — Vitest component tests for primitives, header, footer, hero, project card, contact form
  - **deps:** T-009..T-014
  - **accept:** ≥ 25 passing tests, coverage on rendering paths.

- [ ] **T-021** — Playwright e2e + axe scan on `/`, `/projects`, `/projects/verax-erp`, `/about`, `/contact`
  - **deps:** T-009..T-014
  - **accept:** Zero axe violations on the five pages, viewport screenshots at 375 / 768 / 1440 captured into `tests/e2e/screenshots/`.

- [ ] **T-022** — Lighthouse smoke (manual or `lhci autorun`) on built output
  - **deps:** T-021
  - **accept:** All four categories ≥ 95 on `/` and one project page. Outputs pasted into the verification report.

- [ ] **T-023** — Vercel deploy config (`vercel.json`, env doc) + GH Actions workflow
  - **deps:** T-002
  - **accept:** `vercel.json` valid; `.github/workflows/ci.yml` runs lint, typecheck, vitest, build on PRs.

- [ ] **T-024** — README + content authoring guide
  - **deps:** T-009..T-018
  - **accept:** README documents setup, dev, deploy, env vars, "how to add a new project MDX", architecture overview, em-dash policy.

- [ ] **T-025** — Verification report (`specs/07-verification-report.md`) with raw test outputs and screenshot index
  - **deps:** T-020..T-022
  - **accept:** All raw outputs pasted, every page has 3 screenshots referenced.

- [ ] **T-026** — `scratchpad.md` "FOR ARUN'S REVIEW" summary at top
  - **deps:** T-025
  - **accept:** What was built, every assumption, every deviation, known gaps, recommended next steps.
