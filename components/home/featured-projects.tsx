import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { listFeaturedProjects } from '@/lib/projects';
import { Section } from '@/components/ui/section';
import { ProjectCard } from '@/components/projects/project-card';

export async function FeaturedProjects() {
  const projects = await listFeaturedProjects();
  if (projects.length === 0) return null;
  return (
    <Section
      eyebrow="Featured work"
      title="Selected projects"
      description="A small set of representative builds. The full case studies live on the project pages."
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <li key={p.slug}>
            <ProjectCard project={p} headingLevel={3} />
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
        >
          See all projects
          <ArrowRight size={14} aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
