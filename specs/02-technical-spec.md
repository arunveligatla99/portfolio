# 02 — Technical Specification

## Stack decisions
| Concern | Choice | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router) | RSC-by-default, file-based routing, mature MDX story, Vercel native deploy, ISR free. |
| Language | TypeScript strict | Catches the obvious before runtime. No `any` without a justifying comment. |
| Styling | Tailwind CSS v4 | Token-driven, no runtime cost, matches the minimal/technical design tone. |
| Components | shadcn/ui (selective) | Copy-in primitives, full control, no opaque dependency. Pull only what is used. |
| MDX | `@next/mdx` + `gray-matter` | Frontmatter for projects/posts; MDX inline for code blocks and React components. |
| Code highlighting | `shiki` (build-time) | Themeable, zero client JS, GitHub Dark / Light Default. |
| Icons | `lucide-react` | Tree-shakable, ships only used glyphs. |
| Testing | Vitest + Testing Library | Fast unit/component tests. Colocated `*.test.tsx`. |
| E2E | Playwright | Cross-browser, used for visual smoke checks and a11y axe scans. |
| Lint | ESLint flat config + `eslint-plugin-jsx-a11y` | Catches obvious a11y regressions in CI. |
| Format | Prettier with `prettier-plugin-tailwindcss` | Auto class-sort. |
| Analytics | `@vercel/analytics` + `@vercel/speed-insights` | First-party, zero-config on Vercel. |
| Email | `resend` | Lightweight; stub when key missing. |
| Sitemap/robots | `next-sitemap` | Postbuild generation. |
| OG images | `@vercel/og` | Edge-rendered per-page OG image. |
| PDF resume | Static `public/arun-veligatla-resume.pdf` | Manual upload; HTML mirror at `/resume` for crawlability. |

## Folder structure
```
/
├── app/
│   ├── (site)/
│   │   ├── page.tsx                 # /
│   │   ├── about/page.tsx
│   │   ├── projects/page.tsx
│   │   ├── projects/[slug]/page.tsx
│   │   ├── writing/page.tsx
│   │   ├── writing/[slug]/page.tsx
│   │   ├── contact/page.tsx
│   │   └── resume/page.tsx
│   ├── api/contact/route.ts         # POST handler, Resend or stub
│   ├── og/route.tsx                 # @vercel/og dynamic OG
│   ├── layout.tsx                   # root layout, theme provider, fonts
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   ├── manifest.ts
│   └── globals.css
├── components/
│   ├── ui/                          # shadcn primitives
│   ├── site/                        # nav, footer, theme-toggle
│   ├── home/                        # hero, featured-projects, recent-writing
│   ├── projects/                    # project-card, project-filter, case-study-*
│   └── *.test.tsx
├── content/
│   ├── projects/
│   │   ├── verax-erp.mdx
│   │   ├── policymind.mdx
│   │   ├── collectmind.mdx
│   │   ├── loanpulse.mdx
│   │   └── nemo-trizetto.mdx
│   └── writing/
│       └── _placeholder.mdx
├── lib/
│   ├── mdx.ts                       # frontmatter loaders
│   ├── projects.ts                  # typed project query API
│   ├── writing.ts
│   ├── seo.ts                       # metadata helpers, JSON-LD builders
│   └── utils.ts
├── public/
│   ├── arun-veligatla-resume.pdf    # placeholder
│   └── og-fallback.png
├── tests/
│   ├── e2e/                         # Playwright specs
│   └── setup/
├── specs/                           # this directory
├── scripts/
├── .env.example
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── vitest.config.ts
├── playwright.config.ts
├── eslint.config.mjs
├── package.json
└── vercel.json
```

## Data models

### Project frontmatter (MDX)
```ts
interface ProjectFrontmatter {
  slug: string;               // URL slug, also filename
  title: string;              // "VERAX ERP Platform"
  tagline: string;            // one-line, ≤ 90 chars
  role: string;               // "Self-directed greenfield build"
  period: string;             // "2024 – present"
  domain: ('healthcare'|'fintech'|'ai-ml'|'enterprise-saas'|'platform')[];
  stack: string[];            // ["C#/.NET 10","Angular 17","MySQL 8"]
  highlights: string[];       // 3 to 5 quantified bullets
  metrics?: { label: string; value: string }[]; // shown in case study header
  links?: { label: string; href: string }[];    // optional repo/demo links
  featured?: boolean;         // surfaced on home
  order?: number;             // tie-breaker for sorting
  hero?: { eyebrow?: string; problem: string; outcome: string };
  ogImage?: string;
}
```

### Writing frontmatter (MDX)
```ts
interface PostFrontmatter {
  slug: string;
  title: string;
  description: string;
  date: string;            // ISO
  tags?: string[];
  draft?: boolean;
}
```

## Routing & rendering
- All site pages are RSC by default.
- `/contact` is the single page with a small client island for the form.
- Theme toggle is client (`"use client"` on `<ThemeToggle />` only).
- MDX is compiled at build time. Pages call `generateStaticParams` over MDX slugs.
- Fonts: `next/font/google` for Inter (UI) and JetBrains Mono (code/credentials accent). Self-host to keep LCP tight.

## Environment variables
| Var | Required | Default | Purpose |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes (build) | `http://localhost:3000` | Canonical URL for SEO/sitemap. |
| `RESEND_API_KEY` | no | unset → form returns 200 + logs payload server-side | Contact form delivery. |
| `RESEND_FROM` | no | `contact@local.test` | From address. |
| `CONTACT_TO_EMAIL` | no | `arun.veligatla@gmail.com` | Inbox for contact form. |

`.env.example` ships with all four documented.

## API surface
- `POST /api/contact`
  - Body: `{ name, email, message, honeypot }`
  - Validates with `zod`. Drops if honeypot non-empty. Rate-limit by IP via in-memory token bucket (good enough for a portfolio; documented as such).
  - With `RESEND_API_KEY`: sends. Without: returns `{ ok: true, stub: true }` and logs payload.
- `GET /og` — `@vercel/og` route returning a 1200×630 PNG, parameters `?title=&eyebrow=`.

## Build / CI / deploy
- Single `package.json` script set: `dev`, `build`, `start`, `lint`, `typecheck`, `test`, `test:e2e`, `format`.
- GitHub Actions workflow: install → typecheck → lint → vitest → playwright → build. Lighthouse CI deferred to a manual step (documented in README).
- Vercel deploy via push to `main`. `vercel.json` declares Node version, output dir, and a redirect from `/cv` to `/resume` (vanity).
- `next-sitemap` runs as `postbuild`.

## Performance budget enforcement
- `next/image` for any image; layout-shift-safe with explicit width/height.
- No client-side fetches above the fold.
- Tailwind purged (default in v4).
- Shiki runs at build, output is plain `<pre>` HTML.
- `font-display: swap`, preloaded primary face.

## Justification log for added dependencies
| Dep | Why |
|---|---|
| `@next/mdx`, `remark-gfm`, `rehype-shiki`, `gray-matter` | MDX with GFM tables and build-time syntax highlight. |
| `@vercel/analytics`, `@vercel/speed-insights` | Vendor analytics with zero perf cost. |
| `@vercel/og` | Per-page OG image. |
| `next-sitemap` | Sitemap + robots generation. |
| `lucide-react` | Icon set. |
| `clsx`, `tailwind-merge` | shadcn `cn()` helper. |
| `class-variance-authority` | shadcn variant API. |
| `zod` | Runtime validation for API + frontmatter. |
| `resend` | Email transport. Optional at runtime. |
| `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` | Unit/component tests. |
| `@playwright/test`, `@axe-core/playwright` | E2E + a11y scan. |
| `eslint`, `@eslint/js`, `eslint-config-next`, `eslint-plugin-jsx-a11y`, `typescript-eslint` | Lint. |
| `prettier`, `prettier-plugin-tailwindcss` | Format. |

No CSS-in-JS runtime, no animation library, no state library, no form library. The contact form is plain HTML + a fetch.

## Risks / known soft spots
- Rate limiter is in-memory; on Vercel each cold instance gets its own bucket. Acceptable for a portfolio; documented in README.
- Resend stub path means the form silently no-ops in dev. Mitigation: visible "stub mode" indicator on the success state when `stub: true`.
- Lighthouse 95+ depends on font weights; we ship two weights of Inter and one of JetBrains Mono.
