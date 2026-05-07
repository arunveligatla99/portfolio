import { z } from 'zod';
import { readMdxBySlug, readMdxDir } from './mdx';

export const postFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string()).optional(),
  draft: z.boolean().optional(),
});

export type PostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}

const CONTENT_DIR = 'content/writing';

export async function listPosts(opts?: {
  includeDrafts?: boolean;
}): Promise<Post[]> {
  const entries = await readMdxDir<unknown>(CONTENT_DIR);
  const posts: Post[] = [];
  for (const e of entries) {
    const parsed = postFrontmatterSchema.safeParse(e.data);
    if (!parsed.success) {
      throw new Error(
        `Invalid post frontmatter in ${e.filePath}: ${parsed.error.message}`,
      );
    }
    if (parsed.data.draft && !opts?.includeDrafts) continue;
    posts.push({ slug: e.slug, content: e.content, ...parsed.data });
  }
  posts.sort((a, b) => (a.date < b.date ? 1 : -1));
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  const e = await readMdxBySlug<unknown>(CONTENT_DIR, slug);
  if (!e) return null;
  const parsed = postFrontmatterSchema.safeParse(e.data);
  if (!parsed.success) {
    throw new Error(
      `Invalid post frontmatter in ${e.filePath}: ${parsed.error.message}`,
    );
  }
  return { slug: e.slug, content: e.content, ...parsed.data };
}
