import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'mono';
}

export function Tag({
  className,
  variant = 'default',
  children,
  ...rest
}: TagProps) {
  const styles =
    variant === 'mono'
      ? 'font-mono text-[0.7rem] tracking-wide bg-surface-2 text-muted'
      : variant === 'outline'
        ? 'border border-default text-muted'
        : 'bg-surface-2 text-muted';
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs',
        styles,
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
