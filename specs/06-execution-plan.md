# 06 — Execution Plan

Sequenced execution path. Group tasks into phases that match natural commit boundaries. Within each phase, run in the listed order; commit at the end of each task.

## Phase A — Foundation (T-001 → T-005)
Boot the project, lock down tooling, ship the chrome. After this phase, an empty `/` page renders inside the real header / footer with the theme toggle wired.

1. T-001 scaffold
2. T-002 tooling
3. T-003 design tokens + theme
4. T-004 primitives
5. T-005 header / footer / theme toggle

Smoke check: `npm run dev` shows `/` with header + footer, toggling theme persists.

## Phase B — Content pipeline (T-006 → T-008)
Stand up MDX loaders and seed real content. After this phase, projects can be queried and listed by code, even if no page consumes them yet.

6. T-006 MDX loaders
7. T-007 author 5 project MDX
8. T-008 writing scaffolding

Smoke check: a Vitest test prints `projects.map(p => p.slug)` and asserts the 5 expected slugs.

## Phase C — Pages (T-009 → T-016)
Render the site.

9. T-009 home
10. T-010 projects index
11. T-011 project case study
12. T-012 about
13. T-013 writing
14. T-014 contact + API
15. T-015 resume + redirect
16. T-016 404 / error boundaries

Smoke check: every page returns 200 in `next build` output.

## Phase D — SEO / SMO / OG (T-017 → T-019)
Add the metadata, sitemap, OG image, JSON-LD. None of this changes layout; it's metadata only.

17. T-017 sitemap + robots + per-page metadata
18. T-018 OG image route
19. T-019 JSON-LD

Smoke check: `curl /sitemap.xml` lists every public route, `curl /og?title=X` returns image bytes.

## Phase E — Quality (T-020 → T-022)
Lock in the quality bar.

20. T-020 vitest component coverage
21. T-021 Playwright + axe + screenshots
22. T-022 Lighthouse smoke

Smoke check: tests green, axe zero violations, Lighthouse ≥ 95.

## Phase F — Ship (T-023 → T-026)
Deploy config and review surface.

23. T-023 vercel.json + GH Actions
24. T-024 README + authoring guide
25. T-025 verification report
26. T-026 scratchpad summary

## Risk-driven ordering decisions
- MDX (Phase B) lands before pages (Phase C) so page work isn't blocked by content shape questions.
- SEO (Phase D) lands after pages but before tests (Phase E) so axe/Playwright sees the final markup.
- OG image route is wired before the verification report so screenshots include real OG previews.
- The content guard test (em dash, banned phrases) is added in T-020 to retroactively scan all prior phases.

## Time / context budget
This is autonomous execution; no real time budget. The tighter constraint is *blast radius*: every task is its own commit, so any single task can be reverted independently if the user disagrees.

## Stop conditions
Per the prompt's "WHEN YOU MAY STOP AND ASK" section. None expected.
