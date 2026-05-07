import type { Metadata } from 'next';
import { Suspense } from 'react';
import { listProjects, uniqueDomains } from '@/lib/projects';
import { Container } from '@/components/ui/container';
import { ProjectFilter } from '@/components/projects/project-filter';
import { ProjectsGrid } from '@/components/projects/projects-grid';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Projects',
  description:
    'Selected production work across healthcare SaaS, fintech, and AI / RAG platforms.',
  path: '/projects',
  ogTitle: 'Projects',
  ogEyebrow: 'Arun Veligatla',
});

export default async function ProjectsPage() {
  const projects = await listProjects();
  const domains = uniqueDomains(projects);

  return (
    <Container className="py-16 sm:py-20">
      <header className="mb-10">
        <p className="font-mono text-xs tracking-wider uppercase text-subtle">
          Case studies
        </p>
        <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
          Projects
        </h1>
        <p className="mt-3 max-w-2xl text-muted">
          Filter by domain. Each card opens a full case study with the
          problem, the approach, the stack, and the measured outcome.
        </p>
      </header>

      <Suspense fallback={null}>
        <ProjectFilter domains={domains} />
      </Suspense>

      <div className="mt-8">
        <Suspense fallback={null}>
          <ProjectsGrid projects={projects} />
        </Suspense>
      </div>
    </Container>
  );
}
