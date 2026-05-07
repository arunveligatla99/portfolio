interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  highlights: string[];
}

const ENTRIES: TimelineEntry[] = [
  {
    period: '2024 to present',
    role: 'Independent / Self-Directed Builds',
    org: 'VERAX, PolicyMind, CollectMind, LoanPulse',
    highlights: [
      'Greenfield multi-tenant SaaS ERP platform on .NET 10 + Angular 17 + MySQL 8 with custom columns and an agentic onboarding workflow.',
      'Production RAG system on Azure AI Foundry with 92.5% citation accuracy and p95 < 800ms, gated by RAGAS evals on every PR.',
      'Agentic collection policy engine on LangGraph with deterministic, auditable replay.',
      'Three-module fintech ML platform: survival analysis, drift monitoring, and causal uplift.',
    ],
  },
  {
    period: '2021 to 2026',
    role: 'Senior Software Engineer',
    org: 'Healthcare SaaS, EHR / e-prescribing',
    highlights: [
      'Owned EMA clinical workflow features end-to-end across backend services and the React-based clinical UI.',
      'Led mmRxService, a Java / Spring Boot e-prescribing platform on AWS, including RxNorm integration and pharmacy routing.',
      'Drove a large-scale EHR migration on Databricks / PySpark, with replay-safe pipelines and per-tenant validation.',
      'Built PolicyMind, the production RAG platform documented under Projects.',
    ],
  },
  {
    period: '2014 to 2021',
    role: 'Software Engineer',
    org: 'Healthcare SaaS, podiatry / specialty practice software',
    highlights: [
      'TRAKnet, NemoRx: feature work across the EMR, scheduling, and patient billing modules.',
      'Led the TriZetto Payments integration with PCI DSS scope reduction to SAQ-A and idempotent reconciliation.',
    ],
  },
  {
    period: '2013 to 2014',
    role: 'MS, Computer Science and Engineering',
    org: 'Oakland University',
    highlights: ['Distributed systems, databases, machine learning.'],
  },
];

export function Timeline() {
  return (
    <ol className="relative space-y-10 border-l border-default pl-6">
      {ENTRIES.map((e) => (
        <li key={e.period} className="relative">
          <span
            aria-hidden
            className="absolute -left-[calc(0.375rem+1px)] top-1 h-2 w-2 rounded-full bg-[color:var(--color-accent)]"
          />
          <p className="font-mono text-xs uppercase tracking-wide text-subtle">
            {e.period}
          </p>
          <p className="mt-1 text-base font-semibold text-fg">{e.role}</p>
          <p className="text-sm text-muted">{e.org}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {e.highlights.map((h) => (
              <li key={h} className="flex gap-2">
                <span aria-hidden className="mt-1 text-accent">
                  ◆
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
