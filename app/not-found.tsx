import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-subtle">
        404
      </p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
        Page not found
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        That URL does not exist. The home page and the project index are
        both still here.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/">
          <Button>Go home</Button>
        </Link>
        <Link href="/projects">
          <Button variant="secondary">See projects</Button>
        </Link>
      </div>
    </Container>
  );
}
