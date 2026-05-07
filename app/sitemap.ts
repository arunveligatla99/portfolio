import type { MetadataRoute } from 'next';
import { listProjects } from '@/lib/projects';
import { listPosts } from '@/lib/writing';
import { siteUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const projects = await listProjects();
  const posts = await listPosts();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'weekly' },
    { url: `${siteUrl}/about`, lastModified: now, changeFrequency: 'monthly' },
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
      changeFrequency: 'weekly',
    },
    {
      url: `${siteUrl}/writing`,
      lastModified: now,
      changeFrequency: 'monthly',
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
    },
    {
      url: `${siteUrl}/resume`,
      lastModified: now,
      changeFrequency: 'monthly',
    },
  ];

  const projectEntries: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${siteUrl}/writing/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly',
  }));

  return [...staticEntries, ...projectEntries, ...postEntries];
}
