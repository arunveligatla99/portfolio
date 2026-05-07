import { personSchema } from '@/lib/seo';

export function JsonLd({ data }: { data?: unknown } = {}) {
  const payload = data ?? personSchema;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
