# Deploy checklist

Ordered steps for shipping `arunveligatla.com` (or chosen domain) to Vercel.
Reference, not duplication: env vars, scripts, and authoring details live in
[README.md](./README.md). This file is the runbook.

> Hard prereqs: repo on GitHub, Vercel account, registrar access for the
> chosen domain. Phases run in order; do not skip ahead.

---

## 0. Pre-flight (one-shot)

> **Status:** complete (initial deploy run, 2026-05). Gates green, resume PDF in place, TODO markers acknowledged.


- [ ] `git status` clean.
- [ ] `npm run typecheck && npm run lint && npm run test && npm run build` all green locally.
- [ ] Confirm 3 remaining placeholder markers in `content/projects/` are acceptable to ship as-is, or land replacements:
  ```
  grep -rn "TODO: ARUN COPY" content/
  ```
- [ ] Real resume PDF in place at `public/arun-veligatla-resume.pdf` (currently 354 KB, committed).

## 1. Push to GitHub

> **Status:** complete. Remote: <https://github.com/arunveligatla99/portfolio>. Default branch `main`. CI workflow runs on every push.


- [ ] Create empty private (or public) GitHub repo.
- [ ] Add remote, push `main`:
  ```
  git remote add origin git@github.com:arunveligatla/<repo-name>.git
  git push -u origin main
  ```
- [ ] Confirm `.github/workflows/ci.yml` runs on the push and goes green.

## 2. Vercel project hookup

> **Status:** complete. Vercel project linked to the GitHub repo, framework auto-detected as Next.js, `vercel.json` honoured.


- [ ] Vercel dashboard → **Add New Project** → Import the GitHub repo.
- [ ] Framework auto-detects as Next.js. Leave defaults. `vercel.json` is honoured.
- [ ] Do **not** deploy yet; configure env vars first.

## 3. Environment variables on Vercel

> **Status:** complete for the build-required var. `NEXT_PUBLIC_SITE_URL` set to `https://arunveligatla.com`. `RESEND_API_KEY` is intentionally not set; `/api/contact` runs in stub mode in production. See Phase 6 for the Resend path when ready to wire real email.


Set in Vercel → Project → Settings → Environment Variables. Apply to
**Production**, **Preview**, and **Development** unless noted. Full reference
in [README › Environment variables](./README.md#environment-variables).

| Var                    | Value source                                                   | Required?                            |
| ---------------------- | -------------------------------------------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SITE_URL` | The chosen public URL once DNS is set, e.g. `https://arunveligatla.com`. Until DNS lands, use the auto-assigned `https://<project>.vercel.app`. | required (build) |
| `RESEND_API_KEY`       | Resend dashboard → API Keys → create one for this project.    | optional; without it `/api/contact` returns `{ ok: true, stub: true }` |
| `RESEND_FROM`          | A verified sender on the Resend domain. Default `contact@arunveligatla.com` once DNS is set, otherwise any verified sender. | optional |
| `CONTACT_TO_EMAIL`     | Your inbox. Default `arun.veligatla@gmail.com`.                | optional |

- [ ] Save. Trigger first deploy (Vercel → **Deployments** → **Redeploy** with the env vars applied).

## 4. First deploy validation

> **Status:** complete. Auto-assigned `*.vercel.app` deploy validated by the project owner before the custom-domain flip.


Auto-assigned URL: `https://<project>.vercel.app`.

- [ ] Home loads, hero renders, theme toggle persists.
- [ ] `/projects` lists all five case studies; filter chips update URL.
- [ ] Each case study renders with shiki code blocks and metrics row.
- [ ] `/contact` form posts and shows the stub success state (or real success once Resend is wired).
- [ ] `/api/contact` honeypot drop and rate limit verified via curl.
- [ ] `/cv` 308 redirects to `/resume`.
- [ ] `/projects/verax-erp` 308 redirects to `/projects/agentix-erp` (and `loanpulse`, `nemo-trizetto` 308 to `/projects`).
- [ ] `/sitemap.xml` lists 6 static + 5 project routes.
- [ ] `/robots.txt` allows all.
- [ ] `/og?title=Test&eyebrow=AI` returns a 1200×630 PNG.

## 5. Domain + DNS

> **Status:** complete on 2026-05-11. `arunveligatla.com` live on the apex with HTTPS cert issued by Vercel; `NEXT_PUBLIC_SITE_URL` flipped to the canonical URL and redeployed.


Once the domain is chosen (assume `arunveligatla.com`):

- [ ] Vercel → Project → Settings → **Domains** → Add `arunveligatla.com` and `www.arunveligatla.com`.
- [ ] Vercel will print the DNS records to set. The standard pattern:
  | Host                | Type    | Value                              |
  | ------------------- | ------- | ---------------------------------- |
  | `@` (apex)          | `A`     | `76.76.21.21`                      |
  | `www`               | `CNAME` | `cname.vercel-dns.com`             |
  Use whatever Vercel prints. The IP above is the canonical Vercel apex IP at time of writing; Vercel's UI is the source of truth.
- [ ] Set the records on the registrar. Wait for Vercel's domain status to flip to **Valid Configuration**.
- [ ] Confirm one canonical: in Vercel Domains, set `arunveligatla.com` as primary and check "Redirect www to apex" (or the reverse, your call; pick one and stick).
- [ ] Update `NEXT_PUBLIC_SITE_URL` in Vercel env vars to the final canonical (`https://arunveligatla.com`). Trigger a redeploy.
- [ ] HTTPS: Vercel issues the cert automatically. Confirm green padlock on the live domain.

## 6. Resend (only if you set `RESEND_API_KEY`)

> **Status:** deferred. Production currently runs in Resend stub mode; `/api/contact` returns `{ ok: true, stub: true }` and logs the payload server-side. This phase is the path to real email delivery when ready.


- [ ] Resend → Domains → add `arunveligatla.com`. Set the DKIM, SPF, and Return-Path records on the registrar.
- [ ] Wait for Resend to flip the domain to **Verified**.
- [ ] Set `RESEND_FROM` to a verified sender on that domain (e.g. `contact@arunveligatla.com`).
- [ ] Submit the contact form on production. Confirm delivery to `CONTACT_TO_EMAIL`.

## 7. Post-deploy validation

> **Status:** partial. Site is functionally live on the custom domain. OG-inspector validation, Lighthouse production smoke, Search Console / Bing submission, and the schema rich-results check have not been formally captured yet. The functional smoke (form, redirects, mobile viewports) was verified during the first-deploy pass.


### OG card validation

Drop the production URL into each inspector and confirm the per-page OG image
renders (title, eyebrow, dark background):

- [ ] LinkedIn Post Inspector: <https://www.linkedin.com/post-inspector/>
- [ ] X / Twitter Card Validator: <https://cards-dev.twitter.com/validator>  (or paste the URL into a draft tweet)
- [ ] Facebook Sharing Debugger: <https://developers.facebook.com/tools/debug/>
- [ ] Slack: paste the URL into a `#test` channel and confirm the unfurl.

### Lighthouse smoke

Targets per [README › Lighthouse](./README.md#lighthouse) and `specs/05-quality-spec.md`:
all four categories ≥ 95, LCP < 2.0s, CLS < 0.1, INP < 200ms.

```
npx @lhci/cli@0.13.x autorun \
  --collect.url=https://arunveligatla.com \
  --collect.url=https://arunveligatla.com/projects/policymind \
  --upload.target=temporary-public-storage
```

- [ ] Paste the four scores back into `specs/07-verification-report.md` under a new "Lighthouse (production)" subsection.

### Sitemap ping (optional, search indexing)

- [ ] Google Search Console: add the property, verify, submit `https://arunveligatla.com/sitemap.xml`.
- [ ] Bing Webmaster Tools: same.

### Schema validation

- [ ] Paste `https://arunveligatla.com` into <https://search.google.com/test/rich-results> → confirm the Person schema parses without warnings.
- [ ] Paste a project case study URL → confirm the BreadcrumbList parses without warnings.

### Functional smoke

- [ ] Submit the contact form from the live URL with a real email; confirm delivery.
- [ ] `curl -I https://arunveligatla.com/cv` returns `308` to `/resume`.
- [ ] `curl -I https://arunveligatla.com/projects/verax-erp` returns `308` to `/projects/agentix-erp`.
- [ ] Mobile Safari + Mobile Chrome: open the home page, the about page, one case study. No layout breaks at 375px.

## 8. Optional follow-ups (not blockers)

> **Status:** open. None of these have been actioned. All remain available, none blocking.


- [ ] Vercel Analytics + Speed Insights: enable in the Vercel project dashboard. The hooks are already wired in `app/layout.tsx`.
- [ ] Add the production URL to the GitHub repo description and the LinkedIn profile.
- [ ] Open a PR (or direct push) once a real first writing post is ready; the empty state goes away automatically.

---

## Rollback

Vercel keeps every prior deployment. To revert:

1. Vercel → Deployments → find the last known-good deployment → **Promote to Production**.
2. If the regression came from a commit on `main`, also `git revert <sha>` and push, so the next deploy does not re-introduce it.

## Where things live

- Site code, scripts, env reference, content authoring guide → [README.md](./README.md).
- Spec, design tokens, performance budget, content rules → `specs/`.
- Decisions, assumptions, deviations, review summary → `scratchpad.md`.
- This runbook → `DEPLOY.md`.
