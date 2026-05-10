import type { Metadata } from 'next';
import Link from 'next/link';
import { Download, FileText, Mail } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Timeline } from '@/components/about/timeline';
import { SkillsMatrix } from '@/components/about/skills-matrix';
import { Section } from '@/components/ui/section';
import { pageMetadata } from '@/lib/seo';

const RESUME_PDF = '/arun-veligatla-resume.pdf';

export const metadata: Metadata = pageMetadata({
  title: 'Resume',
  description:
    'Resume for Arun Veligatla, senior AI engineer specializing in multi-agent orchestration, agentic safety, and LLMOps. 11+ years shipping production SaaS.',
  path: '/resume',
  ogTitle: 'Resume',
  ogEyebrow: 'Arun Veligatla',
});

export default function ResumePage() {
  return (
    <>
      <Container className="py-16 sm:py-20">
        <p className="font-mono text-xs uppercase tracking-wider text-subtle">
          Resume
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Arun Veligatla
          </h1>
          <a
            href={RESUME_PDF}
            download
            className="inline-flex items-center gap-2 self-end"
            aria-label="Download resume PDF"
          >
            <Button>
              <Download size={16} aria-hidden />
              Download PDF
            </Button>
          </a>
        </div>
        <p className="mt-3 max-w-2xl text-muted">
          Senior AI Engineer · Lake Orion, MI · 11+ years shipping
          production SaaS. Specializing in multi-agent orchestration,
          agentic safety, and LLMOps. Open to senior AI, backend, and
          full-stack roles. H-1B with approved I-140, transfer-eligible.
        </p>

        <ul className="mt-6 flex flex-wrap gap-4 text-sm">
          <li>
            <a
              className="inline-flex items-center gap-2 text-muted hover:text-fg"
              href="mailto:arun.veligatla@gmail.com"
            >
              <Mail size={16} aria-hidden />
              arun.veligatla@gmail.com
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-2 text-muted hover:text-fg"
              href="tel:+12013818046"
            >
              (201) 381-8046
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-2 text-muted hover:text-fg"
              href="https://github.com/arunveligatla"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/arunveligatla
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-2 text-muted hover:text-fg"
              href="https://www.linkedin.com/in/arun-v-311419137"
              target="_blank"
              rel="noopener noreferrer"
            >
              linkedin.com/in/arun-v-311419137
            </a>
          </li>
        </ul>

        <p className="mt-6 inline-flex items-center gap-2 rounded-[0.5rem] border border-default bg-surface px-3 py-2 text-xs text-subtle">
          <FileText size={14} aria-hidden />
          The PDF is the canonical version. The HTML below mirrors it for
          search engines and screen readers.
        </p>
      </Container>

      <Section eyebrow="Experience" title="Where I have worked" bare>
        <Timeline />
      </Section>

      <Section
        eyebrow="Skills"
        title="Stack"
        description="Day-to-day work and working knowledge."
      >
        <SkillsMatrix />
      </Section>

      <Section eyebrow="Education" title="Education" bare>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[var(--radius-card)] border border-default bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-subtle">
              2013 to 2015
            </p>
            <p className="mt-1 text-base font-semibold text-fg">
              MS, Computer Science and Engineering
            </p>
            <p className="text-sm text-muted">
              Oakland University, Michigan. Distributed systems, databases,
              machine learning.
            </p>
          </div>
          <div className="rounded-[var(--radius-card)] border border-default bg-surface p-5">
            <p className="font-mono text-xs uppercase tracking-wide text-subtle">
              2008 to 2012
            </p>
            <p className="mt-1 text-base font-semibold text-fg">
              BS, Computer Science and Engineering
            </p>
            <p className="text-sm text-muted">
              Jawaharlal Nehru Technological University, India.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="More" title="Project case studies" bare>
        <p className="max-w-2xl text-muted">
          The full case studies (problem, approach, stack, outcomes,
          lessons) live under{' '}
          <Link
            href="/projects"
            className="text-accent underline underline-offset-4"
          >
            /projects
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
