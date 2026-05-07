import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Prose({
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'max-w-[68ch] text-fg',
        '[&_h1]:mt-0 [&_h1]:mb-6 [&_h1]:text-3xl [&_h1]:font-semibold',
        '[&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold',
        '[&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold',
        '[&_p]:my-4 [&_p]:leading-relaxed',
        '[&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6',
        '[&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6',
        '[&_li]:my-1',
        '[&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4',
        '[&_strong]:font-semibold',
        '[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-default [&_blockquote]:pl-4 [&_blockquote]:text-muted [&_blockquote]:italic',
        '[&_code]:font-mono [&_code]:text-[0.875em] [&_code]:rounded-sm [&_code]:bg-surface-2 [&_code]:px-1 [&_code]:py-0.5',
        '[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-[0.5rem] [&_pre]:border [&_pre]:border-default [&_pre]:bg-surface [&_pre]:p-4 [&_pre]:text-sm',
        '[&_pre_code]:bg-transparent [&_pre_code]:p-0',
        '[&_table]:my-6 [&_table]:w-full [&_table]:text-sm',
        '[&_thead]:border-b [&_thead]:border-default',
        '[&_th]:py-2 [&_th]:px-3 [&_th]:text-left [&_th]:font-semibold',
        '[&_td]:py-2 [&_td]:px-3 [&_td]:border-b [&_td]:border-default',
        '[&_hr]:my-10',
        className,
      )}
      {...rest}
    />
  );
}
