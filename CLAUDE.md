# CLAUDE.md

Personal portfolio for Arun Veligatla. Senior AI Engineer · Multi-Agent Orchestration · LLMOps. Recruiter funnel, not a feed.

Depth lives in `specs/` and `scratchpad.md`. This file is the operating contract.

## Stack (do not relitigate without reason)

Next.js 15 App Router · TypeScript strict · Tailwind v4 (`@theme` in `globals.css`) · MDX via `next-mdx-remote/rsc` · shiki at build · shadcn primitives copied in selectively · Resend (stubbed if key missing) · `@vercel/og` · Vercel deploy. Full table: `specs/02-technical-spec.md`. Folder layout, env vars, deps and rationale all live there.

## Hard content rules (enforced by `tests/content-guard.test.ts`)

- **No em dash anywhere.** Use comma, period, colon, or rewrite.
- **No banned phrases:** "passionate about", "leveraging", "cutting-edge", "in today's fast-paced world", "I'm thrilled to", "delve into", "seamlessly", "robust solution".
- **Never name former colleagues or specific clients** in public copy.
- **Never reference the ModMed RIF.** Frame as "open to new opportunities" or "2021 to present".
- **Quantify or rewrite.** Every claim ties to a number, a repo, or a system diagram. Proof, not adjectives.
- **First person, plain, evidence-led.** Hero / about / project copy already shipped sets the tone — match it.
- **No emojis** in code, docs, commits, or shipped copy unless the user explicitly asks.

## Decision protocol

Decide and document. Ask only when blocked.

- **Decide silently** when the choice is reversible, local, and the spec or shipped patterns imply an answer. Edit, run tests, move on.
- **Decide and note in `scratchpad.md`** when the choice deviates from the spec, adds a dep, or changes a public surface (route, frontmatter, env var, OG output). Use the existing "Decisions" / "Deviations" / "Assumptions" sections.
- **Ask the user** only for: irreversible actions (force push, deleting branches, dropping content, sending mail to real recipients), contradictions between spec and resume / shipped copy, or anything that costs money or touches DNS.
- **Never invent metrics.** If a project number is missing, leave a `{/* TODO: ARUN COPY */}` marker (MDX comment, not HTML comment). `grep -rn "TODO: ARUN COPY" content/` is the punch list.

## Quality gates (must stay green)

`npm run typecheck && npm run lint && npm run test && npm run build` clean. Playwright + axe zero violations on the five templated pages. TS strict, no `any` outside justified test code. Targets and current numbers: `specs/05-quality-spec.md` and `specs/07-verification-report.md`. Performance budget: Lighthouse ≥ 95 across all four categories, LCP < 2.0s, CLS < 0.1, INP < 200ms.

## Server vs client split

`lib/projects.ts` reads `node:fs` (server only). Client components import types and `domainLabels` from `lib/projects-shared.ts`. Do not drag `node:fs` into the client bundle.

## Where to look

- **What was built, what's left, why** → [scratchpad.md](./scratchpad.md) ("FOR ARUN'S REVIEW" at top).
- **Product goals, audience, voice, success metrics** → [specs/01-product-spec.md](./specs/01-product-spec.md).
- **Stack, folder structure, data models, API surface** → [specs/02-technical-spec.md](./specs/02-technical-spec.md).
- **Design tokens, type scale, motion, color** → [specs/03-design-spec.md](./specs/03-design-spec.md).
- **Tasks T-001..T-026 (historical)** → [specs/04-task-breakdown.md](./specs/04-task-breakdown.md).
- **Quality bar + verification evidence** → `specs/05-quality-spec.md`, `specs/07-verification-report.md`.
- **Setup, scripts, env, content authoring guide** → [README.md](./README.md).
- **Ship-to-prod runbook** → [DEPLOY.md](./DEPLOY.md).
