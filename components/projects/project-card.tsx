import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/lib/projects-shared';
import { Tag } from '@/components/ui/tag';
import { domainLabels } from '@/lib/projects-shared';
import { cn } from '@/lib/utils';

export interface ProjectCardProps {
  project: Project;
  className?: string;
  emphasized?: boolean;
}

export function ProjectCard({
  project,
  className,
  emphasized,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        'group relative flex h-full flex-col rounded-[var(--radius-card)] border border-default bg-surface p-5 transition-colors duration-150 ease-out hover:border-[color:var(--color-accent)]',
        emphasized && 'sm:p-6',
        className,
      )}
      aria-label={`Read case study: ${project.title}`}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[0.7rem] uppercase tracking-wide text-subtle">
          {project.period}
        </p>
        <ArrowUpRight
          size={18}
          aria-hidden
          className="text-subtle transition-colors group-hover:text-accent"
        />
      </div>
      <h3 className="mt-2 text-lg font-semibold text-fg">{project.title}</h3>
      <p className="mt-2 text-sm text-muted">{project.tagline}</p>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.domain.map((d) => (
          <Tag key={d} variant="outline">
            {domainLabels[d]}
          </Tag>
        ))}
      </div>
      {project.metrics && project.metrics.length > 0 && (
        <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-default pt-4 text-xs">
          {project.metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <dt className="text-subtle">{m.label}</dt>
              <dd className="mt-1 font-mono text-fg">{m.value}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-auto pt-4">
        <p className="font-mono text-[0.7rem] uppercase tracking-wide text-subtle">
          Stack
        </p>
        <p className="mt-1 text-xs text-muted">
          {project.stack.slice(0, 6).join(' · ')}
        </p>
      </div>
    </Link>
  );
}
