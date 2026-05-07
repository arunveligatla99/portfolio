import { Section } from '@/components/ui/section';

const GROUPS: { label: string; items: string[] }[] = [
  {
    label: 'Backend',
    items: [
      'C# / .NET Core',
      'Java / Spring Boot',
      'Python / FastAPI',
      'REST',
      'gRPC',
    ],
  },
  {
    label: 'Frontend',
    items: ['TypeScript', 'React', 'Angular', 'Next.js', 'Tailwind'],
  },
  {
    label: 'Cloud',
    items: ['AWS', 'Azure', 'Azure AI Foundry', 'Vercel'],
  },
  {
    label: 'Data',
    items: ['SQL Server', 'MySQL', 'PostgreSQL', 'Databricks / PySpark'],
  },
  {
    label: 'AI / ML',
    items: ['LangGraph', 'RAG', 'Agentic workflows', 'XGBoost', 'CausalML'],
  },
];

export function SkillsSummary() {
  return (
    <Section
      eyebrow="What I'm good at"
      title="Stack"
      description="I optimize for shipping production systems with measurable outcomes, then keep them honest with tests and observability."
    >
      <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {GROUPS.map((g) => (
          <div key={g.label}>
            <dt className="font-mono text-[0.7rem] uppercase tracking-wide text-subtle">
              {g.label}
            </dt>
            <dd className="mt-2 space-y-1 text-sm text-muted">
              {g.items.map((it) => (
                <div key={it}>{it}</div>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
