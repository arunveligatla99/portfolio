interface MetricsRowProps {
  metrics: { label: string; value: string }[];
}

export function MetricsRow({ metrics }: MetricsRowProps) {
  if (!metrics || metrics.length === 0) return null;
  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-default bg-[color:var(--color-border)] sm:grid-cols-3">
      {metrics.map((m) => (
        <div key={m.label} className="bg-surface p-5">
          <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-subtle">
            {m.label}
          </dt>
          <dd className="mt-2 text-xl font-semibold text-fg">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}
