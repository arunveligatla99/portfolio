import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-32">
      <p className="font-mono text-xs tracking-wider text-subtle uppercase">
        Senior AI Engineer · Multi-Agent Orchestration · LLMOps
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
        Arun Veligatla
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Senior AI engineer with 11+ years shipping production SaaS. Built
        two end-to-end agentic platforms: PolicyMind, a four-agent RAG
        system with 92.5% citation accuracy, p95 under 800ms, and 100%
        escalation recall behind CI-enforced RAGAS gates; and CollectMind,
        a LangGraph vehicle telemetry policy engine with COVESA VSS
        validation and confidence-gated deployment.
      </p>
      <p className="mt-3 max-w-2xl text-muted">
        Based in Lake Orion, MI. Open to senior AI, backend, and
        full-stack engineering roles. H-1B with approved I-140,
        transfer-eligible.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/contact">
          <Button>
            <Mail size={16} aria-hidden />
            Get in touch
          </Button>
        </Link>
        <Link href="/projects">
          <Button variant="secondary">
            See projects
            <ArrowRight size={16} aria-hidden />
          </Button>
        </Link>
        <Link href="/resume">
          <Button variant="ghost">View resume</Button>
        </Link>
      </div>
    </Container>
  );
}
