import { Tag } from '@/components/ui/tag';

export function StackList({ stack }: { stack: string[] }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-wide text-subtle">
        Stack
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {stack.map((s) => (
          <Tag key={s} variant="mono">
            {s}
          </Tag>
        ))}
      </div>
    </div>
  );
}
