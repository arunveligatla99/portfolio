import type { Metadata } from 'next';
import Link from 'next/link';
import { listPosts } from '@/lib/writing';
import { Container } from '@/components/ui/container';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Writing',
  description: 'Notes on platform engineering, RAG systems, and applied AI.',
  path: '/writing',
  ogTitle: 'Writing',
  ogEyebrow: 'Notes',
});

export default async function WritingPage() {
  const posts = await listPosts();

  return (
    <Container className="py-16 sm:py-20">
      <p className="font-mono text-xs tracking-wider uppercase text-subtle">
        Notes
      </p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Writing</h1>

      {posts.length === 0 ? (
        <div className="mt-8 max-w-2xl rounded-[var(--radius-card)] border border-default bg-surface p-6">
          <p className="text-muted">
            Nothing public yet. The scaffold is in place; long-form notes
            on platform engineering, RAG systems, and applied AI will land
            here when they are ready.
          </p>
          <p className="mt-3 text-muted">
            In the meantime, the project case studies under{' '}
            <Link href="/projects" className="text-accent hover:underline">
              Projects
            </Link>{' '}
            cover the same ground.
          </p>
        </div>
      ) : (
        <ul className="mt-10 space-y-6">
          {posts.map((p) => (
            <li
              key={p.slug}
              className="rounded-[var(--radius-card)] border border-default bg-surface p-5"
            >
              <Link href={`/writing/${p.slug}`} className="block">
                <p className="font-mono text-xs text-subtle">
                  {new Date(p.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <h2 className="mt-2 text-lg font-semibold text-fg">
                  {p.title}
                </h2>
                <p className="mt-2 text-sm text-muted">{p.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
