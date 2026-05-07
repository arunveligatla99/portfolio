import { cn } from '@/lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';
import { Container } from './container';

interface SectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  eyebrow?: string;
  title?: ReactNode;
  description?: ReactNode;
  bare?: boolean;
}

export function Section({
  eyebrow,
  title,
  description,
  bare,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section className={cn('py-16 sm:py-20 lg:py-24', className)} {...rest}>
      <Container>
        {!bare && (eyebrow || title || description) && (
          <header className="mb-10 max-w-2xl">
            {eyebrow && (
              <p className="font-mono text-xs tracking-wider text-subtle uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-muted">{description}</p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
