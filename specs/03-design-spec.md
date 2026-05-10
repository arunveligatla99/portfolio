# 03 — Design Specification

## Tone
Minimal, technical, confident. Reads like a well-kept engineering handbook, not a marketing site. Generous whitespace, monospace accents for credentials and code, no stock photography, no gradient blobs, no parallax, no scroll-jacking. Motion is functional only: focus rings, theme transition, hover state on links.

## Design tokens

### Color (CSS custom properties)
Implemented as Tailwind v4 `@theme` tokens. Dark is default; light is a toggle.

```css
/* dark (default) */
--bg:        #0A0A0B;
--surface:   #111114;
--surface-2: #17171B;
--border:    #26262B;
--fg:        #ECEDEE;
--fg-muted:  #A1A1AA;
--fg-subtle: #71717A;
--accent:    #7DD3FC;   /* cyan-300, used sparingly */
--accent-fg: #0A0A0B;
--ring:      #38BDF8;
--success:   #34D399;
--danger:    #F87171;

/* light */
--bg:        #FAFAFA;
--surface:   #FFFFFF;
--surface-2: #F4F4F5;
--border:    #E4E4E7;
--fg:        #09090B;
--fg-muted:  #52525B;
--fg-subtle: #71717A;
--accent:    #0369A1;   /* sky-700 */
--accent-fg: #FAFAFA;
--ring:      #0284C7;
```

Contrast verified: `--fg` on `--bg` ≥ 16:1 dark, ≥ 18:1 light. `--fg-muted` on `--bg` ≥ 7:1 both. `--accent` on `--bg` ≥ 7:1 dark, ≥ 7:1 light.

### Typography
- UI/body: Inter (400, 600). `font-feature-settings: "ss01","cv11"`.
- Mono: JetBrains Mono (400). For code, key-value labels, "shipped: 2024".

Scale (rem, 1rem = 16px):
```
--text-xs:   0.75   / 1rem
--text-sm:   0.875  / 1.25rem
--text-base: 1      / 1.6rem
--text-lg:   1.125  / 1.6rem
--text-xl:   1.25   / 1.6rem
--text-2xl:  1.5    / 1.4rem
--text-3xl:  1.875  / 1.3rem
--text-4xl:  2.25   / 1.2rem
--text-5xl:  3      / 1.1rem  (hero only, desktop)
```

### Spacing
Tailwind default 4px grid. Container max-width `72rem` (1152px). Page gutter `1rem` mobile, `1.5rem` ≥ md, `2rem` ≥ lg.

### Radius / borders
- Card / button: 8px.
- Pill / chip: 9999px.
- Hairline borders (`1px solid var(--border)`) preferred over shadows.

### Elevation
One shadow only (`shadow-sm`), used on hover states for cards. Otherwise no shadows.

### Motion
- `transition-colors duration-150 ease-out` on links and buttons.
- Theme toggle: `transition-[background-color,color] duration-200`.
- `prefers-reduced-motion: reduce` zeroes out all non-instant transitions.
- No page-load animations.

## Component inventory
| Component | File | Notes |
|---|---|---|
| `<SiteHeader />` | components/site/site-header.tsx | sticky on desktop, static on mobile, ThemeToggle inside. |
| `<SiteFooter />` | components/site/site-footer.tsx | 3-col on lg, stacked on mobile. |
| `<ThemeToggle />` | components/site/theme-toggle.tsx | client island, icon button. |
| `<Container />` | components/ui/container.tsx | layout wrapper. |
| `<Section />` | components/ui/section.tsx | semantic `<section>` with title + description slot. |
| `<Prose />` | components/ui/prose.tsx | typographic styles for MDX. |
| `<Tag />` | components/ui/tag.tsx | pill chip. |
| `<Button />` | components/ui/button.tsx | shadcn-derived. |
| `<Hero />` | components/home/hero.tsx | name, eyebrow, role, CTAs. |
| `<FeaturedProjects />` | components/home/featured-projects.tsx | 3 cards. |
| `<RecentWriting />` | components/home/recent-writing.tsx | hidden if zero posts. |
| `<ContactCta />` | components/home/contact-cta.tsx | "Open to senior backend / full-stack / AI roles". |
| `<ProjectCard />` | components/projects/project-card.tsx | grid card. |
| `<ProjectFilter />` | components/projects/project-filter.tsx | client island, URL-state via `useSearchParams`. |
| `<CaseStudyHeader />` | components/projects/case-study-header.tsx | title, metrics row. |
| `<MetricsRow />` | components/projects/metrics-row.tsx | 3-up KPI strip. |
| `<SkillsMatrix />` | components/about/skills-matrix.tsx | grouped by Backend, Frontend, Cloud, Data, AI/ML. |
| `<Timeline />` | components/about/timeline.tsx | role/period/highlights. |
| `<ContactForm />` | components/contact/contact-form.tsx | client island, native form, fetch to `/api/contact`. |
| `<JsonLd />` | components/site/json-ld.tsx | Person schema injector. |

## Page wireframes (ASCII)

### `/` Home
```
┌──────────────────────────────────────────────────┐
│ [logo: AV]                  about projects writing contact │
├──────────────────────────────────────────────────┤
│                                                  │
│   ARUN VELIGATLA                                 │
│   Senior Software Engineer · Healthcare SaaS · AI │
│                                                  │
│   11+ years building production .NET, Java, and  │
│   Python systems. Currently shipping multi-tenant│
│   SaaS ERP and Azure AI RAG (92.5% citation      │
│   accuracy, p95 < 800ms).                        │
│                                                  │
│   [ Get in touch ]   [ View resume ]             │
│                                                  │
├──────────────────────────────────────────────────┤
│   FEATURED WORK                                  │
│   ┌────────┐ ┌────────┐ ┌────────┐               │
│   │ Policy │ │ Agentix│ │Collect │               │
│   │ Mind   │ │ ERP    │ │ Mind   │               │
│   └────────┘ └────────┘ └────────┘               │
│   → all projects                                 │
├──────────────────────────────────────────────────┤
│   WHAT I'M GOOD AT                               │
│   Backend · Frontend · Cloud · Data · AI/ML      │
├──────────────────────────────────────────────────┤
│   RECENT WRITING (hidden if empty)               │
├──────────────────────────────────────────────────┤
│   CONTACT CTA                                    │
└──────────────────────────────────────────────────┘
```

### `/projects`
```
┌──────────────────────────────────────────────────┐
│ Projects                                         │
│ Filter: [All] [Healthcare] [AI/ML] [Fintech]…    │
│ ┌────┐ ┌────┐ ┌────┐                             │
│ │    │ │    │ │    │                             │
│ └────┘ └────┘ └────┘                             │
│ ┌────┐ ┌────┐                                    │
│ │    │ │    │                                    │
│ └────┘ └────┘                                    │
└──────────────────────────────────────────────────┘
```

### `/projects/[slug]` (case study)
```
┌──────────────────────────────────────────────────┐
│ eyebrow: Agentic RAG · Production                │
│ PolicyMind                                       │
│ One-line tagline.                                │
│ ┌──── metrics row ────┐                          │
│ │ 92.5% accuracy │ p95 < 800ms │ 167 tests │     │
│ └─────────────────────┘                          │
├──────────────────────────────────────────────────┤
│ Problem                                          │
│ Approach                                         │
│ Architecture (mermaid or annotated diagram)      │
│ Stack                                            │
│ Outcomes                                         │
│ Lessons                                          │
│ Code snippet (shiki, dark)                       │
└──────────────────────────────────────────────────┘
```

### `/about`
```
intro paragraph
timeline (ModMed, Nemo Health, education)
skills matrix
human texture (cricket, options trading) at the bottom
```

### `/contact`
```
left col: form (name, email, message, honeypot, submit)
right col: direct email, LinkedIn, GitHub, resume link
```

## Responsive breakpoints
| Token | min-width | Notes |
|---|---|---|
| `sm` | 640 | Two-column tags, footer 2-col. |
| `md` | 768 | Project grid 2-col, contact 2-col. |
| `lg` | 1024 | Project grid 3-col, sticky header. |
| `xl` | 1280 | Larger hero type. |

Mobile-first. All layouts must read on a 375×667 viewport with no horizontal scroll.

## Accessibility rules of thumb
- All interactive elements reachable by keyboard, visible focus ring (`outline: 2px solid var(--ring); outline-offset: 2px`).
- Skip-to-content link, visible on focus.
- `aria-label` on icon-only buttons (theme toggle, social icons).
- Form fields have associated `<label>`, error messages tied with `aria-describedby`.
- Heading order: each page has exactly one `<h1>`.
- Landmarks: `<header>`, `<nav>`, `<main>`, `<footer>`.
- Color is never the only signal; tags use both color and text.

## Iconography
Lucide only. Stroke 1.5, size 16/20/24. No emoji in UI.

## Imagery
No stock photography. Project hero uses a typography-led OG image generated by `@vercel/og`. About page is text-only.
