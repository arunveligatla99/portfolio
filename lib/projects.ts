import { readMdxBySlug, readMdxDir } from './mdx';
import {
  type Project,
  type ProjectDomain,
  projectFrontmatterSchema,
} from './projects-shared';

export {
  type Project,
  type ProjectDomain,
  type ProjectFrontmatter,
  domainLabels,
} from './projects-shared';

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
