import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export function ContactCta() {
  return (
    <section className="border-t border-default bg-surface">
      <Container className="py-16 text-center sm:py-20">
        <p className="font-mono text-xs tracking-wider uppercase text-subtle">
          Currently exploring
        </p>
        <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">
          Senior backend, full-stack, and AI engineering roles.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Best fits: healthcare SaaS, fintech, or AI platform teams that
          care about latency budgets, evals in CI, and small surface areas.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/contact">
            <Button>
              Start a conversation
              <ArrowRight size={16} aria-hidden />
            </Button>
          </Link>
          <Link href="/resume">
            <Button variant="secondary">View resume</Button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
