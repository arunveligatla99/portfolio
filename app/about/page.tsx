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
    'Senior AI engineer specializing in multi-agent orchestration, agentic safety, and LLMOps. 11+ years in regulated SaaS. Lake Orion, MI.',
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
          Senior AI engineer. 11+ years shipping production SaaS.
        </h1>
        <div className="mt-6 max-w-2xl space-y-4 text-muted">
          <p>
            I specialize in multi-agent orchestration, agentic safety, and
            LLMOps for regulated, high-scale environments. I build the
            unglamorous parts of platform: the typed state object, the
            citation verifier, the eval pipeline, the integration that has
            to survive a duplicate webhook at 3am. I prefer measured
            outcomes over adjectives, contracts over conventions, and a
            small surface area over a clever one.
          </p>
          <p>
            Recent work: PolicyMind, a four-agent RAG platform with 92.5%
            citation accuracy and 100% escalation recall behind CI-enforced
            RAGAS gates; CollectMind, a LangGraph vehicle telemetry policy
            engine with COVESA VSS validation and confidence-gated
            deployment; and Agentix ERP, a greenfield multi-tenant SaaS
            ERP with a 10-step autonomous onboarding agent on AWS Bedrock.
          </p>
          <p>
            Before that: 11+ years across healthcare SaaS. EMR clinical
            workflows, e-prescribing on AWS with DEA EPCS-compliant
            identity federation, and a multi-source EHR migration program
            that moved millions of patient records with zero data loss.
          </p>
          <p>
            I hold an MS in Computer Science and Engineering from Oakland
            University and a BS in Computer Science from Jawaharlal Nehru
            Technological University. I am based in Lake Orion, Michigan.
            Open to senior backend, full-stack, and AI engineering roles
            based in the US (remote, hybrid, or on-site). H-1B with
            approved I-140, transfer-eligible.
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
              Designing Agentic AI applications
            </p>
            <p className="mt-2 text-sm text-muted">
              I have been designing agentic AI applications to solve
              problems where multi-step reasoning, tool use, and
              autonomous decision-making produce better outcomes than
              traditional code.
            </p>
          </div>
        </div>
      </Section>

      <JsonLd data={breadcrumb} />
    </>
  );
}
