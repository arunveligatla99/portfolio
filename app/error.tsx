'use client';

import { useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('app error boundary', error);
  }, [error]);

  return (
    <Container className="py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-wider text-subtle">
        500
      </p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
        Something broke
      </h1>
      <p className="mx-auto mt-4 max-w-md text-muted">
        An unexpected error happened. You can try again, or email
        arun.veligatla@gmail.com if the issue keeps happening.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button onClick={() => reset()}>Try again</Button>
      </div>
    </Container>
  );
}
