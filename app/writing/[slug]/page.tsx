import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { getPost, listPosts } from '@/lib/writing';
import { Container } from '@/components/ui/container';
import { Prose } from '@/components/ui/prose';
import { pageMetadata } from '@/lib/seo';

interface Params {
  slug: string;
}

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await listPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/writing/${slug}`,
    ogTitle: post.title,
    ogEyebrow: 'Writing',
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post || post.draft) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-wider text-subtle">
        {new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}
      </p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-4 max-w-2xl text-muted">{post.description}</p>
      <div className="mt-10">
        <Prose>
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </Prose>
      </div>
    </Container>
  );
}
