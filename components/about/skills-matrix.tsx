interface SkillGroup {
  label: string;
  proficient: string[];
  working: string[];
}

const GROUPS: SkillGroup[] = [
  {
    label: 'Backend',
    proficient: [
      'C# / .NET Core',
      'Java / Spring Boot',
      'Python / FastAPI',
      'REST',
      'Domain-driven design',
    ],
    working: ['gRPC', 'Go'],
  },
  {
    label: 'Frontend',
    proficient: ['TypeScript', 'React', 'Angular', 'Next.js'],
    working: ['Tailwind CSS v4', 'shadcn/ui'],
  },
  {
    label: 'Cloud',
    proficient: ['AWS', 'Azure', 'Azure AI Foundry'],
    working: ['Vercel', 'GCP'],
  },
  {
    label: 'Data',
    proficient: ['SQL Server', 'MySQL', 'PostgreSQL', 'Databricks / PySpark'],
    working: ['pgvector', 'DuckDB'],
  },
  {
    label: 'AI / ML',
    proficient: [
      'RAG',
      'LangGraph',
      'OpenAI / GPT-4o',
      'Embeddings',
      'Agentic workflows',
    ],
    working: ['XGBoost', 'CausalML', 'RAGAS'],
  },
  {
    label: 'Practices',
    proficient: [
      'CI / CD',
      'OpenTelemetry',
      'Eval-gated deploys',
      'PCI DSS scope reduction',
    ],
    working: ['SLSA', 'OWASP ASVS'],
  },
];

export function SkillsMatrix() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {GROUPS.map((g) => (
        <div
          key={g.label}
          className="rounded-[var(--radius-card)] border border-default bg-surface p-5"
        >
          <p className="font-mono text-xs uppercase tracking-wide text-subtle">
            {g.label}
          </p>
          <p className="mt-3 text-xs text-subtle">Day-to-day</p>
          <ul className="mt-1 space-y-1 text-sm text-fg">
            {g.proficient.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          {g.working.length > 0 && (
            <>
              <p className="mt-4 text-xs text-subtle">Working knowledge</p>
              <ul className="mt-1 space-y-1 text-sm text-muted">
                {g.working.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
