import type { Metadata } from 'next';

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
  'https://arunveligatla.com';

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Arun Veligatla',
  url: siteUrl,
  jobTitle: 'Senior AI Engineer',
  email: 'mailto:arun.veligatla@gmail.com',
  telephone: '+1-201-381-8046',
  sameAs: [
    'https://github.com/arunveligatla',
    'https://www.linkedin.com/in/arun-v-311419137',
  ],
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Oakland University',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'Jawaharlal Nehru Technological University',
    },
  ],
  knowsAbout: [
    'Multi-Agent Orchestration',
    'Agentic Safety',
    'LLMOps',
    'LangGraph',
    'RAG',
    'GPT-4o',
    'Qdrant',
    'RAGAS',
    'C#',
    '.NET',
    'Java',
    'Spring Boot',
    'Python',
    'FastAPI',
    'TypeScript',
    'React',
    'Angular',
    'AWS',
    'Azure',
    'Multi-Tenant SaaS',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Lake Orion',
    addressRegion: 'MI',
    addressCountry: 'US',
  },
};

export function breadcrumbSchema(
  items: { name: string; href: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${siteUrl}${it.href}`,
    })),
  };
}

export function pageMetadata({
  title,
  description,
  path,
  ogTitle,
  ogEyebrow,
}: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogEyebrow?: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  const ogUrl = `${siteUrl}/og?title=${encodeURIComponent(
    ogTitle || title,
  )}${ogEyebrow ? `&eyebrow=${encodeURIComponent(ogEyebrow)}` : ''}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogUrl],
    },
  };
}
