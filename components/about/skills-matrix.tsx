interface SkillGroup {
  label: string;
  proficient: string[];
  working: string[];
}

const GROUPS: SkillGroup[] = [
  {
    label: 'Agentic AI / GenAI',
    proficient: [
      'LangGraph',
      'Multi-Agent Orchestration',
      'ReAct Tool-Calling',
      'Versioned Prompt Registry',
      'GPT-4o (structured output)',
      'text-embedding-3-large',
      'Qdrant',
      'BM25 + Vector Hybrid + RRF',
      'Cross-Encoder Reranking',
      'RAGAS',
      'LLMOps',
    ],
    working: ['Model-Agnostic Routing', 'A/B Testing'],
  },
  {
    label: 'Agentic Safety & LLM Security',
    proficient: [
      'NLI Hallucination Verification',
      'PII Redaction (referential)',
      'Confidence-Gated Deploy',
      'Action Authorization Registries',
      'Compliance-Guard Architecture',
    ],
    working: ['LlamaGuard'],
  },
  {
    label: 'Backend',
    proficient: [
      'C# / .NET Core',
      'ASP.NET Core Web API',
      'Java / Spring Boot',
      'Python / FastAPI',
      'Entity Framework',
      'REST',
      'Swagger / OpenAPI',
      'Microservices',
      'Event-Driven Architecture',
    ],
    working: ['gRPC', 'WCF (legacy)'],
  },
  {
    label: 'Frontend',
    proficient: ['TypeScript', 'React', 'Angular', 'Next.js', 'SPA Architecture'],
    working: ['Tailwind CSS v4', 'WPF / UWP / XAML (legacy)'],
  },
  {
    label: 'Cloud & Deployment',
    proficient: [
      'Azure AI Foundry',
      'Azure (App Insights, Cosmos DB)',
      'AWS (Bedrock, Lambda, SQS/SNS, DynamoDB, S3, SES)',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'Azure DevOps',
    ],
    working: ['Vercel'],
  },
  {
    label: 'Data / Streaming',
    proficient: [
      'PostgreSQL',
      'TimescaleDB',
      'SQL Server / T-SQL',
      'Cosmos DB',
      'MySQL',
      'Qdrant',
      'Apache Kafka',
      'Redis',
      'Elasticsearch / Kibana',
    ],
    working: [],
  },
  {
    label: 'ML / Data Science',
    proficient: [
      'Scikit-learn',
      'Isolation Forest',
      'Time-Series Anomaly Detection',
      'Feature Engineering',
      'Model Training / Tuning / Eval',
    ],
    working: [],
  },
  {
    label: 'Observability & Practices',
    proficient: [
      'Application Insights',
      'Langfuse',
      'Prometheus',
      'Grafana',
      'RAGAS CI gates',
      'xUnit',
      'Moq',
      'Eval-gated deploys',
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
