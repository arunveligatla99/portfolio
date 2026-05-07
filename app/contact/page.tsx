import type { Metadata } from 'next';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Container } from '@/components/ui/container';
import { ContactForm } from '@/components/contact/contact-form';
import { JsonLd } from '@/components/site/json-ld';
import { breadcrumbSchema, pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata({
  title: 'Contact',
  description:
    'Get in touch about senior backend, full-stack, or AI engineering roles.',
  path: '/contact',
  ogTitle: 'Contact',
  ogEyebrow: 'Arun Veligatla',
});

export default function ContactPage() {
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Contact', href: '/contact' },
  ]);
  return (
    <Container className="py-16 sm:py-20">
      <p className="font-mono text-xs tracking-wider uppercase text-subtle">
        Contact
      </p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
        Let&apos;s talk
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        I read everything that comes in. Best fits are senior backend,
        full-stack, or AI roles in healthcare SaaS, fintech, or AI
        platforms. H-1B with approved I-140, transfer-eligible.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-2">
        <ContactForm />

        <aside className="space-y-6 text-sm">
          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-subtle">
              Direct
            </p>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  className="inline-flex items-center gap-2 text-fg hover:text-accent"
                  href="mailto:arun.veligatla@gmail.com"
                >
                  <Mail size={16} aria-hidden />
                  arun.veligatla@gmail.com
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-fg hover:text-accent"
                  href="https://www.linkedin.com/in/arun-v-311419137"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin size={16} aria-hidden />
                  linkedin.com/in/arun-v-311419137
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-fg hover:text-accent"
                  href="https://github.com/arunveligatla"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={16} aria-hidden />
                  github.com/arunveligatla
                </a>
              </li>
              <li>
                <a
                  className="inline-flex items-center gap-2 text-fg hover:text-accent"
                  href="/resume"
                >
                  <FileText size={16} aria-hidden />
                  Resume
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-subtle">
              Status
            </p>
            <p className="mt-2 text-muted">
              Open to senior backend, full-stack, and AI engineering roles
              based in the US (remote or hybrid). H-1B with approved I-140
              (priority date October 2023), transfer-eligible.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-wide text-subtle">
              Where I am
            </p>
            <p className="mt-2 text-muted">Lake Orion, Michigan (ET).</p>
          </div>
        </aside>
      </div>
      <JsonLd data={breadcrumb} />
    </Container>
  );
}
