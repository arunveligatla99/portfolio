import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <Container className="pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-32">
      <p className="font-mono text-xs tracking-wider text-subtle uppercase">
        Senior Software Engineer · Healthcare SaaS · AI / RAG
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
        Arun Veligatla
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        11+ years building production .NET, Java, and Python systems.
        Currently shipping a multi-tenant SaaS ERP and an Azure AI RAG
        platform with measured outcomes: 92.5% citation accuracy, p95 under
        800ms, 167 passing tests gated on RAGAS evals.
      </p>
      <p className="mt-3 max-w-2xl text-muted">
        Based in Lake Orion, MI. Open to senior backend, full-stack, and AI
        engineering roles. H-1B with approved I-140, transfer-eligible.
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
