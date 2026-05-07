import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { codeToHtml } from 'shiki';
import { getProject, listProjects } from '@/lib/projects';
import { Container } from '@/components/ui/container';
import { Prose } from '@/components/ui/prose';
import { CaseStudyHeader } from '@/components/projects/case-study-header';
import { MetricsRow } from '@/components/projects/metrics-row';
import { StackList } from '@/components/projects/stack-list';
import { JsonLd } from '@/components/site/json-ld';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

interface Params {
  slug: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  const all = await listProjects();
  return all.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.tagline,
    path: `/projects/${slug}`,
    ogTitle: project.title,
    ogEyebrow: project.hero?.eyebrow ?? 'Case study',
  });
}

interface CodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

async function ShikiCodeBlock({
  className,
  children,
}: CodeBlockProps) {
  const lang = (className || '').replace('language-', '') || 'text';
  const raw = String(children ?? '').replace(/\n$/, '');
  try {
    const html = await codeToHtml(raw, {
      lang,
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    });
    return (
      <div
        className="my-6 overflow-hidden rounded-[var(--radius-card)] border border-default bg-surface"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  } catch {
    return (
      <pre className="my-6 rounded-[var(--radius-card)] border border-default bg-surface p-4 text-sm">
        <code>{raw}</code>
      </pre>
    );
  }
}

const mdxComponents = {
  pre: ({
    children,
  }: {
    children?: React.ReactNode;
  }) => {
    const child = children as
      | { props?: { className?: string; children?: React.ReactNode } }
      | undefined;
    if (child?.props && typeof child.props === 'object') {
      return (
        <ShikiCodeBlock className={child.props.className}>
          {child.props.children}
        </ShikiCodeBlock>
      );
    }
    return <pre>{children as React.ReactNode}</pre>;
  },
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const breadcrumb = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: project.title, href: `/projects/${slug}` },
  ]);

  return (
    <article>
      <Container className="py-12 sm:py-16">
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-fg"
          >
            <ArrowLeft size={14} aria-hidden />
            All projects
          </Link>
        </div>
        <CaseStudyHeader project={project} />
        {project.metrics && project.metrics.length > 0 && (
          <div className="mt-10">
            <MetricsRow metrics={project.metrics} />
          </div>
        )}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_minmax(0,_18rem)] lg:gap-16">
          <Prose>
            <MDXRemote
              source={project.content}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeSlug],
                },
              }}
              components={mdxComponents}
            />
          </Prose>
          <div className="space-y-8" aria-label="Project metadata">
            <StackList stack={project.stack} />
            {project.links && project.links.length > 0 && (
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-subtle">
                  Links
                </p>
                <ul className="mt-3 space-y-2 text-sm">
                  {project.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <p className="font-mono text-xs uppercase tracking-wide text-subtle">
                Highlights
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-2">
                    <span aria-hidden className="text-accent">
                      ◆
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
      <JsonLd data={breadcrumb} />
    </article>
  );
}
