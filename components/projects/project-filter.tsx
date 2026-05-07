'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { cn } from '@/lib/utils';
import type { ProjectDomain } from '@/lib/projects-shared';
import { domainLabels } from '@/lib/projects-shared';

export interface ProjectFilterProps {
  domains: ProjectDomain[];
}

export function ProjectFilter({ domains }: ProjectFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const active = params.get('domain');

  const set = useCallback(
    (next: string | null) => {
      const sp = new URLSearchParams(params.toString());
      if (next) sp.set('domain', next);
      else sp.delete('domain');
      const qs = sp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, {
        scroll: false,
      });
    },
    [params, pathname, router],
  );

  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">Filter projects by domain</legend>
      <button
        type="button"
        onClick={() => set(null)}
        aria-pressed={!active}
        className={cn(
          'rounded-full border px-3 py-1 text-xs transition-colors',
          !active
            ? 'border-[color:var(--color-accent)] text-fg'
            : 'border-default text-muted hover:text-fg',
        )}
      >
        All
      </button>
      {domains.map((d) => {
        const isActive = active === d;
        return (
          <button
            key={d}
            type="button"
            onClick={() => set(d)}
            aria-pressed={isActive}
            className={cn(
              'rounded-full border px-3 py-1 text-xs transition-colors',
              isActive
                ? 'border-[color:var(--color-accent)] text-fg'
                : 'border-default text-muted hover:text-fg',
            )}
          >
            {domainLabels[d]}
          </button>
        );
      })}
    </fieldset>
  );
}
