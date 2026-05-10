# 05 — Quality Specification

## Performance budget
| Metric | Budget | How enforced |
|---|---|---|
| Lighthouse Performance | ≥ 95 | manual `lhci` smoke on `/` and one project page; documented in verification report. |
| Lighthouse Accessibility | 100 | axe-core in Playwright + `eslint-plugin-jsx-a11y`. |
| Lighthouse Best Practices | ≥ 95 | manual smoke. |
| Lighthouse SEO | ≥ 95 | manual smoke + sitemap/canonicals/metadata coverage. |
| LCP | < 2.0s on simulated 4G | hero text-only (no LCP image), font preload, no client JS above the fold. |
| CLS | < 0.1 | explicit width/height on every image, `font-display: swap` with size-adjust fallback. |
| INP | < 200ms | no heavy client JS; theme toggle is the only above-the-fold interaction. |
| JS payload (initial route) | ≤ 90 KB gzipped on `/` | RSC-by-default; client islands minimized. |
| Image payload | ≤ 200 KB combined on `/` | only icons + OG fallback. |

## Accessibility checklist (every page)
- [ ] Exactly one `<h1>`.
- [ ] Heading order monotonic (no skipping h2 → h4).
- [ ] All interactive elements keyboard-reachable; visible focus.
- [ ] Skip-to-content link present.
- [ ] Form fields labeled; errors `aria-describedby`-linked.
- [ ] Icon-only buttons have `aria-label`.
- [ ] Color is never the sole differentiator.
- [ ] Contrast ≥ 4.5:1 for body, ≥ 3:1 for large text and UI components.
- [ ] `prefers-reduced-motion` respected.
- [ ] No autoplay media.
- [ ] `lang="en"` on `<html>`.
- [ ] Focus is not trapped anywhere.

## SEO checklist
- [ ] Unique `<title>` and meta description per page.
- [ ] Canonical URL per page.
- [ ] OpenGraph + Twitter card metadata (with OG image).
- [ ] JSON-LD Person on `/`.
- [ ] JSON-LD BreadcrumbList on inner pages.
- [ ] `sitemap.xml` includes all static + dynamic routes.
- [ ] `robots.txt` allows all.
- [ ] No `noindex` left on accidentally.
- [ ] Internal links use `next/link` (not raw `<a>` for in-app routes).
- [ ] Resume PDF reachable from `/resume` and discoverable in nav.

## Browser matrix
| Browser | Version target | Tested via |
|---|---|---|
| Chrome / Edge | latest 2 | Playwright `chromium` project |
| Firefox | latest | Playwright `firefox` project |
| Safari (desktop) | latest | Playwright `webkit` project |
| Mobile Safari (iOS) | latest | Playwright `webkit` device emulation, iPhone 12 |
| Mobile Chrome (Android) | latest | Playwright `chromium` device emulation, Pixel 5 |

## Test coverage targets
- ≥ 25 vitest tests across primitives, header, footer, hero, contact form, MDX loaders.
- Playwright covers `/`, `/projects`, `/projects/agentix-erp`, `/projects/policymind`, `/projects/collectmind`, `/about`, `/contact`, `/resume`, `/writing` with axe on each.

## Content quality gates
- **No em dash** anywhere in source. Enforced by a custom Vitest test that walks `content/**/*.mdx` and `app/**/*.tsx` and fails on `—`.
- **No banned phrases** (`passionate about`, `leveraging cutting-edge`, `in today's fast-paced world`, `I'm thrilled to`). Enforced by the same content guard test.
- **No PII for former colleagues / clients** in MDX. Enforced manually during review (no automated way to detect).
- **No mention of "RIF", "layoff", or "ModMed" outside of the experience timeline label**. Enforced by the content guard test (allowlist).

## Definition of done (per task)
1. Code merged into `main` (or current branch) via a conventional commit.
2. Acceptance criteria from `04-task-breakdown.md` met.
3. Test output pasted verbatim into the relevant scratchpad section, raw not summarized.
4. No console errors in dev server during the smoke check.
5. Linter and TypeScript clean.
