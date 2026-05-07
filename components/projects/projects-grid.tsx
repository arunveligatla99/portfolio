'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Project } from '@/lib/projects-shared';
import { ProjectCard } from './project-card';

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const params = useSearchParams();
  const domain = params.get('domain');

  const filtered = useMemo(() => {
    if (!domain) return projects;
    return projects.filter((p) =>
      p.domain.includes(domain as Project['domain'][number]),
    );
  }, [projects, domain]);

  if (filtered.length === 0) {
    return (
      <p className="rounded-[var(--radius-card)] border border-default bg-surface p-6 text-sm text-muted">
        No projects match this filter yet.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {filtered.map((p) => (
        <li key={p.slug}>
          <ProjectCard project={p} />
        </li>
      ))}
    </ul>
  );
}
