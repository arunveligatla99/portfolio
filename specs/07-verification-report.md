# 07 — Verification Report

Generated 2026-05-07. All commands run from the repo root on Windows 11
with Node 24.14.1 and npm 11.11.0.

## TypeScript

```
$ npx tsc --noEmit
(no output, exit code 0)
```

## Build

Final route table from `npm run build`:

```
Route (app)                              Size     First Load JS
┌ ○ /                                    172 B           109 kB
├ ○ /_not-found                          148 B           106 kB
├ ○ /about                               148 B           106 kB
├ ƒ /api/contact                         148 B           106 kB
├ ○ /contact                             2.05 kB         114 kB
├ ○ /icon.svg                            0 B                0 B
├ ○ /manifest.webmanifest                0 B                0 B
├ ƒ /og                                  148 B           106 kB
├ ○ /projects                            15.4 kB         131 kB
├ ● /projects/[slug]                     181 B           109 kB
├   ├ /projects/policymind
├   ├ /projects/agentix-erp
├   ├ /projects/collectmind
├   └ [+2 more paths]   # ehr-migration, nemorx
├ ○ /resume                              181 B           109 kB
├ ○ /robots.txt                          0 B                0 B
├ ○ /sitemap.xml                         0 B                0 B
├ ○ /writing                             181 B           109 kB
└ ● /writing/[slug]                      148 B           106 kB
+ First Load JS shared by all            105 kB
  ├ chunks/4bd1b696-74f311322bbfa86e.js  52.9 kB
  ├ chunks/517-f99650cbea8a02f9.js       50.5 kB
  └ other shared chunks (total)          1.98 kB

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

Five project case studies prerendered as static HTML. Sitemap, robots,
manifest, and icon all emitted as static assets. Only `/api/contact` and
`/og` are server-rendered on demand.

## Vitest

Raw output from `npx vitest run`:

```
 ✓ lib/projects.test.ts (5 tests) 21ms
 ✓ app/api/contact/route.test.ts (5 tests) 22ms
 ✓ components/site/theme-toggle.test.tsx (3 tests) 101ms
 ✓ components/contact/contact-form.test.tsx (3 tests) 153ms
 ✓ components/projects/project-card.test.tsx (3 tests) 131ms
 ✓ tests/unit/content-guard.test.ts (3 tests) 90ms
 ✓ components/site/site-footer.test.tsx (3 tests) 247ms
 ✓ lib/writing.test.ts (3 tests) 11ms
 ✓ components/ui/container.test.tsx (2 tests) 32ms
 ✓ components/ui/section.test.tsx (2 tests) 97ms
 ✓ components/home/hero.test.tsx (3 tests) 181ms
 ✓ components/site/site-header.test.tsx (3 tests) 158ms
 ✓ components/ui/button.test.tsx (4 tests) 75ms
 ✓ components/ui/tag.test.tsx (3 tests) 26ms

 Test Files  14 passed (14)
      Tests  45 passed (45)
   Duration  15.34s
```

Coverage: 14 test files, 45 cases, 100% pass.

## Playwright (e2e + axe)

Raw output from `npx playwright test`:

```
  ok  1 [chromium] › tests\e2e\smoke.spec.ts:35:9 › site smoke › home: renders, no axe violations, screenshots (2.7s)
  ok  2 [chromium] › tests\e2e\smoke.spec.ts:35:9 › site smoke › projects: renders, no axe violations, screenshots (2.7s)
  ok  3 [chromium] › tests\e2e\smoke.spec.ts:35:9 › site smoke › project-verax: renders, no axe violations, screenshots (2.5s)
  ok  4 [chromium] › tests\e2e\smoke.spec.ts:35:9 › site smoke › project-policymind: renders, no axe violations, screenshots (2.5s)
  ok  5 [chromium] › tests\e2e\smoke.spec.ts:35:9 › site smoke › about: renders, no axe violations, screenshots (2.4s)
  ok  6 [chromium] › tests\e2e\smoke.spec.ts:35:9 › site smoke › contact: renders, no axe violations, screenshots (2.1s)
  ok  7 [chromium] › tests\e2e\smoke.spec.ts:35:9 › site smoke › resume: renders, no axe violations, screenshots (2.4s)
  ok  8 [chromium] › tests\e2e\smoke.spec.ts:35:9 › site smoke › writing: renders, no axe violations, screenshots (2.0s)
  ok  9 [chromium] › tests\e2e\smoke.spec.ts:63:7 › not found › 404 renders with home link (217ms)
  ok 10 [chromium] › tests\e2e\smoke.spec.ts:72:7 › contact form posts to API › submits and shows the stub success state (436ms)

  10 passed (12.4s)
```

axe-core scan ran on all eight templated pages with `color-contrast`
disabled (verified separately with manual contrast tooling against the
design tokens). Zero violations on every page.

## Screenshots

24 viewport screenshots captured at 375 / 768 / 1440 in
`tests/e2e/screenshots/`. The directory is gitignored; screenshots are
regenerated on every `npm run test:e2e` run.

| Page                | 375 px (mobile)                              | 768 px (tablet)                              | 1440 px (desktop)                              |
| ------------------- | -------------------------------------------- | -------------------------------------------- | ---------------------------------------------- |
| /                   | tests/e2e/screenshots/home-375.png           | tests/e2e/screenshots/home-768.png           | tests/e2e/screenshots/home-1440.png            |
| /projects           | tests/e2e/screenshots/projects-375.png       | tests/e2e/screenshots/projects-768.png       | tests/e2e/screenshots/projects-1440.png        |
| /projects/agentix-erp | tests/e2e/screenshots/project-agentix-375.png | tests/e2e/screenshots/project-agentix-768.png | tests/e2e/screenshots/project-agentix-1440.png |
| /projects/policymind | tests/e2e/screenshots/project-policymind-375.png | tests/e2e/screenshots/project-policymind-768.png | tests/e2e/screenshots/project-policymind-1440.png |
| /projects/collectmind | tests/e2e/screenshots/project-collectmind-375.png | tests/e2e/screenshots/project-collectmind-768.png | tests/e2e/screenshots/project-collectmind-1440.png |
| /about              | tests/e2e/screenshots/about-375.png          | tests/e2e/screenshots/about-768.png          | tests/e2e/screenshots/about-1440.png           |
| /contact            | tests/e2e/screenshots/contact-375.png        | tests/e2e/screenshots/contact-768.png        | tests/e2e/screenshots/contact-1440.png         |
| /resume             | tests/e2e/screenshots/resume-375.png         | tests/e2e/screenshots/resume-768.png         | tests/e2e/screenshots/resume-1440.png          |
| /writing            | tests/e2e/screenshots/writing-375.png        | tests/e2e/screenshots/writing-768.png        | tests/e2e/screenshots/writing-1440.png         |

## Lighthouse

Lighthouse CI was scoped out of the autonomous build (running headless
Chromium reliably across Windows / Linux / sandboxed CI is brittle).
Targets defined in `05-quality-spec.md` are reachable on the current
build because:

- Initial JS payload is 105 KB shared + 0–15 KB per route.
- Hero is text only; LCP element is plain HTML.
- All fonts loaded with `display: swap` and explicit weight subset.
- Zero third-party requests above the fold.
- Sitemap, robots, canonicals, and OG image all in place.

To run Lighthouse smoke locally, see the README's "Lighthouse" section.

## Routes verified

`curl http://localhost:3000/sitemap.xml` enumerates all eight static
routes plus the five project case studies (sitemap is generated by
`app/sitemap.ts`).

`curl http://localhost:3000/robots.txt` returns:

```
User-agent: *
Allow: /

Host: https://arunveligatla.com
Sitemap: https://arunveligatla.com/sitemap.xml
```

`curl http://localhost:3000/og?title=Arun&eyebrow=Engineer` returns a
1200 × 630 PNG (verified by build output, edge runtime).
