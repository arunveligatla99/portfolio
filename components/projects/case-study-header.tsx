import { Tag } from '@/components/ui/tag';
import { domainLabels } from '@/lib/projects-shared';
import type { Project } from '@/lib/projects-shared';

export function CaseStudyHeader({ project }: { project: Project }) {
  return (
    <header>
      <p className="font-mono text-xs uppercase tracking-wider text-subtle">
        {project.hero?.eyebrow ?? domainLabels[project.domain[0]]} ·{' '}
        {project.period}
      </p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-3xl text-lg text-muted">{project.tagline}</p>
      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-subtle">
        <span className="font-mono uppercase tracking-wide">
          {project.role}
        </span>
        <span aria-hidden>·</span>
        <div className="flex flex-wrap gap-1.5">
          {project.domain.map((d) => (
            <Tag key={d} variant="outline">
              {domainLabels[d]}
            </Tag>
          ))}
        </div>
      </div>
    </header>
  );
}
