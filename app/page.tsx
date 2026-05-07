import type { Metadata } from 'next';
import { Hero } from '@/components/home/hero';
import { FeaturedProjects } from '@/components/home/featured-projects';
import { SkillsSummary } from '@/components/home/skills-summary';
import { ContactCta } from '@/components/home/contact-cta';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Arun Veligatla, Senior Software Engineer',
  description:
    'Senior software engineer with 11+ years building production healthcare SaaS, multi-tenant ERP, and Azure AI RAG systems.',
  path: '/',
  ogTitle: 'Arun Veligatla',
  ogEyebrow: 'Senior Software Engineer',
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
