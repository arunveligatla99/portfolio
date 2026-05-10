import { Section } from '@/components/ui/section';

const GROUPS: { label: string; items: string[] }[] = [
  {
    label: 'Agentic AI',
    items: [
      'LangGraph',
      'Multi-Agent Orchestration',
      'ReAct Tool-Calling',
      'RAG',
      'GPT-4o',
      'RAGAS',
    ],
  },
  {
    label: 'Agentic Safety',
    items: [
      'NLI Hallucination Verification',
      'LlamaGuard',
      'PII Redaction',
      'Confidence-Gated Deploy',
      'Compliance Guard',
    ],
  },
  {
    label: 'Backend',
    items: [
      'C# / .NET',
      'Java / Spring Boot',
      'Python / FastAPI',
      'Microservices',
      'Event-Driven',
    ],
  },
  {
    label: 'Cloud',
    items: ['Azure AI Foundry', 'AWS (Bedrock, Lambda)', 'Docker', 'Kubernetes'],
  },
  {
    label: 'Data',
    items: ['PostgreSQL', 'TimescaleDB', 'Qdrant', 'SQL Server', 'Cosmos DB', 'Kafka'],
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
