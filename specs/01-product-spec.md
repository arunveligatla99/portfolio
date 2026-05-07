# 01 — Product Specification

## Goal
Personal portfolio website for Arun Veligatla. Primary success metric: inbound interview requests for senior full-stack / staff engineering roles, with a secondary signal of recruiter outreach for AI/ML platform work.

## Audience (in priority order)
1. **Recruiters and hiring managers** screening for senior backend/full-stack/AI engineering roles. They scan for stack match, recent role tenure, and quick proof of impact. Need: 60-second skim path on `/`.
2. **Hiring engineers / panel members** doing pre-loop diligence. They want depth: architecture decisions, trade-offs, real metrics. Need: rich case studies on `/projects/[slug]`.
3. **Peer engineers** linking from GitHub, Slack, conference talks, or referrals. Need: clear bio, contact paths, writing.

## Positioning
> Senior software engineer, 11+ years building production healthcare SaaS. Currently shipping multi-tenant SaaS ERP and Azure AI RAG systems with measured outcomes (92.5% citation accuracy, p95 < 800ms, 167 passing tests gated on RAGAS evals).

The site sells **proof, not adjectives**: every claim ties to a metric, a repo, or a system diagram.

## Goals
- Convert a recruiter skim into a contact (form, email, or LinkedIn DM) within one screen of the homepage.
- Give a panelist enough technical depth on the featured projects (VERAX, PolicyMind, CollectMind, LoanPulse, Nemo TriZetto) to walk into an interview already informed.
- Surface H-1B / I-140 status without making it the lead, so it answers the question without prompting it.
- Keep an authoring path open for writing (MDX), so the site can grow with a blog over time without rework.

## Non-goals
- Lead-gen funnel, newsletter, paid product, or course sales.
- Social-media-style frequent updates. The site is a portfolio, not a feed.
- Comments, reactions, or any user-generated content.
- A multi-tenant CMS. Content lives in MDX files in the repo.
- Server-side state beyond a single contact form handler.
- Light-mode-first design. Dark default, light is a toggle.

## Tone & voice constraints
- First person, plainly written, evidence-led.
- No em dash. Anywhere. Use comma, period, colon, or rewrite.
- No "passionate about", "leveraging cutting-edge", "in today's fast-paced world", "I'm thrilled to".
- Quantify. If a claim has no number attached, either find one or rewrite.
- Never name former colleagues or specific clients in public copy.
- Never reference the ModMed RIF on the public site. Frame as "open to new opportunities".

## Success criteria (measurable)
- Lighthouse: 95+ on Performance, Accessibility, Best Practices, SEO across all four template pages (`/`, `/projects/[slug]`, `/about`, `/contact`).
- LCP < 2.0s on a 4G throttled run, CLS < 0.1, INP < 200ms.
- Zero axe-core violations on every templated page.
- WCAG 2.1 AA contrast verified on dark and light themes.
- All five featured projects rendered as case studies with metrics.
- Resume PDF reachable in ≤ 2 clicks from `/`.
- Contact form working (Resend stubbed if `RESEND_API_KEY` missing).
- TypeScript `strict` with zero `any` outside justified comments.

## Out-of-scope explicitly deferred
- i18n / translations.
- A search index over MDX content.
- Dynamic project filtering by tag (build the filter UI, but feature-flag if it adds complexity past task budget).
- RSS for `/writing`. Generate it only if cheap.
- Email capture / newsletter.
