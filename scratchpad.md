# Scratchpad

> The "FOR ARUN'S REVIEW" summary will be prepended at the top of this file at the end of Phase F.

---

## Decisions

- Manually scaffold Next.js instead of `create-next-app` to avoid interactive prompts and to keep dependencies tightly justified in `02-technical-spec.md`. The shape produced is identical to what `create-next-app --ts --tailwind --app --eslint --src-dir=false` would emit, plus the extras documented in the spec.
- Tailwind v4 is configured via `@theme` in `globals.css` (the v4 idiom). No `tailwind.config.ts` is needed for tokens; one is kept only for content globs and plugins.
- Theme toggle persists in `localStorage` under the key `theme` (`"dark" | "light" | "system"`). Default is `dark`. SSR sets `class="dark"` via an inline script in `<head>` to prevent FOUC.
- MDX is processed via `next-mdx-remote/rsc` to keep the App Router story clean (avoids the older `pageExtensions` hack).
- Shiki is invoked at build time inside the MDX rehype pipeline; the page ships zero JS for highlighting.
- The `/writing` listing intentionally renders an empty state when no published posts exist; the route plumbing is exercised by a private fixture inside the test suite.
- The contact form rate limiter is a plain in-memory token bucket. Documented limitation: each Vercel cold instance gets its own bucket. Acceptable for a portfolio.

## Assumptions

- `RESEND_API_KEY` is unset during this build; the `/api/contact` handler returns `{ ok: true, stub: true }` and logs the payload server-side. No real email is sent.
- `NEXT_PUBLIC_SITE_URL` defaults to `https://arunveligatla.com` for sitemap/canonical URLs (placeholder; can be changed via env without code changes).
- Resume PDF (`public/arun-veligatla-resume.pdf`) is a placeholder zero-byte file. The HTML mirror at `/resume` renders the canonical content; PDF should be uploaded by hand later.
- Project metrics on PolicyMind are taken verbatim from the prompt (92.5% citation accuracy, p95 < 800ms, 167 tests). Other project metrics are placeholders flagged with `<!-- TODO: ARUN COPY -->` and need real numbers from Arun.
- Domain is unconfirmed; Vercel deployment will use the auto-assigned `*.vercel.app` URL until Arun configures DNS.
- Lighthouse CI is documented but not run inside CI; Lighthouse smoke is a manual `lhci` invocation captured in the verification report. Running headless Chromium inside Vercel-style sandboxed CI is out of scope for the autonomous build.

## Deviations from spec

- Spec listed `next-sitemap` for postbuild generation. Switched to native `app/sitemap.ts` + `app/robots.ts` (Next App Router idiom) and dropped the dependency. Less moving parts, same output. Spec updated to match.
- MDX files cannot contain HTML comments; the `<!-- TODO: ARUN COPY -->` markers were rewritten to `{/* TODO: ARUN COPY */}` (still grep-able as `TODO: ARUN COPY`).
- Server vs. client module split: `lib/projects.ts` (server, reads fs) and `lib/projects-shared.ts` (types, schema, labels) so client components can import the latter without dragging `node:fs` into the client bundle.

---

## Build log
