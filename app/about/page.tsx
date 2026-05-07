import type { Metadata } from 'next';
import { Container } from '@/components/ui/container';
import { Section } from '@/components/ui/section';
import { Timeline } from '@/components/about/timeline';
import { SkillsMatrix } from '@/components/about/skills-matrix';
import { JsonLd } from '@/components/site/json-ld';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'About',
  description:
    'Senior software engineer with 11+ years across healthcare SaaS, multi-tenant ERP, and AI / RAG systems. Lake Orion, MI.',
  path: '/about',
  ogTitle: 'About Arun Veligatla',
  ogEyebrow: 'Background',
});

export default function AboutPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
  ]);
  return (
    <>
      <Container className="py-16 sm:py-20">
        <p className="font-mono text-xs tracking-wider uppercase text-subtle">
          About
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Senior software engineer, 11+ years in production healthcare
          SaaS.
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-muted">
          <p>
            I build the unglamorous parts of platform: the data layer, the
            tenant model, the eval pipeline, the integration that has to
            survive a duplicate webhook at 3am. I prefer measured outcomes
            over adjectives, contracts over conventions, and a small
            surface area over a clever one.
          </p>
          <p>
            Most of my career has been in healthcare SaaS: EMR workflows,
            e-prescribing, payments integration, large-scale data migration,
            and most recently a production RAG platform on Azure AI
            Foundry. The current arc is multi-tenant SaaS ERP with custom
            columns and an agentic onboarding workflow.
          </p>
          <p>
            I hold an MS in Computer Science and Engineering from Oakland
            University. I am based in Lake Orion, Michigan, on H-1B with an
            approved I-140 (priority date October 2023) and am
            transfer-eligible. I am open to senior backend, full-stack, and
            AI engineering roles.
          </p>
        </div>
      </Container>

      <Section eyebrow="Timeline" title="Where I have spent my time" bare>
        <p className="mb-8 max-w-2xl text-muted">
          Where I have spent my time, what I owned, and what shipped.
        </p>
        <Timeline />
      </Section>

      <Section
        eyebrow="Skills"
        title="Stack"
        description="Day-to-day work and working knowledge, grouped honestly."
      >
        <SkillsMatrix />
      </Section>

      <Section eyebrow="Outside the editor" title="Not all of it is code">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-default bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-subtle">
              Cricket
            </p>
            <p className="mt-2 text-sm text-muted">
              Captain of the Oakland County Cricket Club. Team management
              and field captaincy turn out to be uncannily similar to
              technical leadership: the people problem is the problem.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-default bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-subtle">
              0DTE SPX / SPY options
            </p>
            <p className="mt-2 text-sm text-muted">
              I trade 0DTE SPX and SPY options. It is a sharp lesson in
              probabilistic thinking, position sizing, and the difference
              between being right and being early.
            </p>
          </div>
        </div>
      </Section>

      <JsonLd data={breadcrumb} />
    </>
  );
}
