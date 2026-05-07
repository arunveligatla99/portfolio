import { z } from 'zod';
import { readMdxBySlug, readMdxDir } from './mdx';

export const ProjectDomain = z.enum([
  'healthcare',
  'fintech',
  'ai-ml',
  'enterprise-saas',
  'platform',
]);
export type ProjectDomain = z.infer<typeof ProjectDomain>;

export const projectFrontmatterSchema = z.object({
  title: z.string().min(1),
  tagline: z.string().min(1).max(160),
  role: z.string().min(1),
  period: z.string().min(1),
  domain: z.array(ProjectDomain).min(1),
  stack: z.array(z.string().min(1)).min(1),
  highlights: z.array(z.string().min(1)).min(1),
  metrics: z
    .array(z.object({ label: z.string(), value: z.string() }))
    .optional(),
  links: z
    .array(z.object({ label: z.string(), href: z.string().url() }))
    .optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  hero: z
    .object({
      eyebrow: z.string().optional(),
      problem: z.string(),
      outcome: z.string(),
    })
    .optional(),
  ogImage: z.string().optional(),
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;

export interface Project extends ProjectFrontmatter {
  slug: string;
  content: string;
}

const CONTENT_DIR = 'content/projects';

export async function listProjects(): Promise<Project[]> {
  const entries = await readMdxDir<unknown>(CONTENT_DIR);
  const projects: Project[] = [];
  for (const e of entries) {
    const parsed = projectFrontmatterSchema.safeParse(e.data);
    if (!parsed.success) {
      throw new Error(
        `Invalid project frontmatter in ${e.filePath}: ${parsed.error.message}`,
      );
    }
    projects.push({ slug: e.slug, content: e.content, ...parsed.data });
  }
  projects.sort((a, b) => {
    const ao = a.order ?? 100;
    const bo = b.order ?? 100;
    if (ao !== bo) return ao - bo;
    return a.title.localeCompare(b.title);
  });
  return projects;
}

export async function getProject(slug: string): Promise<Project | null> {
  const e = await readMdxBySlug<unknown>(CONTENT_DIR, slug);
  if (!e) return null;
  const parsed = projectFrontmatterSchema.safeParse(e.data);
  if (!parsed.success) {
    throw new Error(
      `Invalid project frontmatter in ${e.filePath}: ${parsed.error.message}`,
    );
  }
  return { slug: e.slug, content: e.content, ...parsed.data };
}

export async function listFeaturedProjects(): Promise<Project[]> {
  const all = await listProjects();
  return all.filter((p) => p.featured);
}

export function uniqueDomains(projects: Project[]): ProjectDomain[] {
  const seen = new Set<ProjectDomain>();
  for (const p of projects) p.domain.forEach((d) => seen.add(d));
  return Array.from(seen);
}

export function uniqueStack(projects: Project[]): string[] {
  const seen = new Set<string>();
  for (const p of projects) p.stack.forEach((s) => seen.add(s));
  return Array.from(seen).sort();
}

export const domainLabels: Record<ProjectDomain, string> = {
  healthcare: 'Healthcare',
  fintech: 'Fintech',
  'ai-ml': 'AI / ML',
  'enterprise-saas': 'Enterprise SaaS',
  platform: 'Platform',
};
