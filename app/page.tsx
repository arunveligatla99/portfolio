import type { Metadata } from 'next';
import { Hero } from '@/components/home/hero';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { SkillsSummary } from '@/components/home/skills-summary';
import { ContactCta } from '@/components/home/contact-cta';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Arun Veligatla, Senior AI Engineer',
  description:
    'Senior AI engineer specializing in multi-agent orchestration, agentic safety, and LLMOps. 11+ years shipping production SaaS in regulated environments.',
  path: '/',
  ogTitle: 'Arun Veligatla',
  ogEyebrow: 'Senior AI Engineer',
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SkillsSummary />
      <ContactCta />
    </>
  );
}
