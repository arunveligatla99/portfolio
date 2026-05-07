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
    'Resume for Arun Veligatla, senior software engineer with 11+ years in healthcare SaaS, multi-tenant ERP, and AI / RAG systems.',
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
          Senior Software Engineer · Lake Orion, MI · 11+ years in
          healthcare SaaS, multi-tenant ERP, and AI / RAG systems. Open to
          senior roles. H-1B with approved I-140, transfer-eligible.
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

      <Section eyebrow="Education" title="Oakland University" bare>
        <div className="rounded-[var(--radius-card)] border border-default bg-surface p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-subtle">
            2013 to 2014
          </p>
          <p className="mt-1 text-base font-semibold text-fg">
            MS, Computer Science and Engineering
          </p>
          <p className="text-sm text-muted">
            Distributed systems, databases, machine learning.
          </p>
        </div>
      </Section>

      <Section eyebrow="More" title="Project case studies" bare>
        <p className="max-w-2xl text-muted">
          The full case studies (problem, approach, stack, outcomes,
          lessons) live under{' '}
          <Link href="/projects" className="text-accent hover:underline">
            /projects
          </Link>
          .
        </p>
      </Section>
    </>
  );
}
