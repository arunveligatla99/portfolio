interface TimelineEntry {
  period: string;
  role: string;
  org: string;
  highlights: string[];
}

const ENTRIES: TimelineEntry[] = [
  {
    period: '2021 to present',
    role: 'Senior Software Engineer',
    org: 'Modernizing Medicine (ModMed)',
    highlights: [
      'PolicyMind (Dec 2025 to Feb 2026): four-agent LangGraph RAG platform with hybrid retrieval (Qdrant + BM25 + RRF + cross-encoder), NLI-based hallucination verification, 92.5% citation accuracy at p95 < 800ms, 100% escalation recall, 167 CI-gated tests.',
      'EMA clinical workflows and mmRxService (Mar 2025 to Nov 2025): Java / Spring Boot e-prescribing on AWS with SQS/SNS, Kafka, DynamoDB, Okta, and SureScripts integration.',
      'EHR data migration (Apr 2021 to Mar 2025): TRAKnet, Sammy, and Exscribe to EMA. Hundreds of practices, millions of records, zero data loss across all production cutovers.',
    ],
  },
  {
    period: 'Dec 2014 to Apr 2021',
    role: 'Software Developer / Senior Software Developer',
    org: 'Nemo Health LLC',
    highlights: [
      'NemoRx (May 2018 to Apr 2021): multi-tenant SaaS e-prescribing with React frontend, Cosmos DB partition-key isolation, SureScripts integration, and DEA EPCS-compliant identity federation via Okta and Exostar.',
      'TRAKnet (Dec 2014 to Apr 2018): podiatry EHR platform on .NET / WPF / UWP / WinForms across hundreds of active practices. Led distributed offshore engineering team.',
    ],
  },
  {
    period: 'May 2014 to Sep 2014',
    role: 'Software Developer',
    org: 'ATCO Industries Inc.',
    highlights: [
      'Enterprise .NET applications and SQL Server data models supporting operational workflows.',
    ],
  },
  {
    period: '2013 to 2015',
    role: 'MS, Computer Science and Engineering',
    org: 'Oakland University, Michigan',
    highlights: [
      'Distributed systems, databases, machine learning.',
    ],
  },
  {
    period: '2008 to 2012',
    role: 'BS, Computer Science and Engineering',
    org: 'Jawaharlal Nehru Technological University, India',
    highlights: [],
  },
];

export function Timeline() {
  return (
    <ol className="relative space-y-10 border-l border-default pl-6">
      {ENTRIES.map((e) => (
        <li key={`${e.period}-${e.org}`} className="relative">
          <span
            aria-hidden
            className="absolute -left-[calc(0.375rem+1px)] top-1 h-2 w-2 rounded-full bg-[color:var(--color-accent)]"
          />
          <p className="font-mono text-xs uppercase tracking-wide text-subtle">
            {e.period}
          </p>
          <p className="mt-1 text-base font-semibold text-fg">{e.role}</p>
          <p className="text-sm text-muted">{e.org}</p>
          {e.highlights.length > 0 && (
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
          )}
        </li>
      ))}
    </ol>
  );
}
