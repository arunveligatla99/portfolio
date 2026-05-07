import { z } from 'zod';

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

export const domainLabels: Record<ProjectDomain, string> = {
  healthcare: 'Healthcare',
  fintech: 'Fintech',
  'ai-ml': 'AI / ML',
  'enterprise-saas': 'Enterprise SaaS',
  platform: 'Platform',
};
