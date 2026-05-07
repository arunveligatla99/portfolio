import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { SiteHeader } from '@/components/site/site-header';
import { SiteFooter } from '@/components/site/site-footer';
import { JsonLd } from '@/components/site/json-ld';
import { siteUrl } from '@/lib/seo';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600'],
  variable: '--font-inter',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400'],
  variable: '--font-jetbrains',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Arun Veligatla, Senior Software Engineer',
    template: '%s · Arun Veligatla',
  },
  description:
    'Senior software engineer with 11+ years building production healthcare SaaS, multi-tenant ERP, and Azure AI RAG systems. Open to senior backend, full-stack, and AI engineering roles.',
  authors: [{ name: 'Arun Veligatla' }],
  creator: 'Arun Veligatla',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Arun Veligatla',
    title: 'Arun Veligatla, Senior Software Engineer',
    description:
      'Senior software engineer building production healthcare SaaS and Azure AI systems.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arun Veligatla, Senior Software Engineer',
    description:
      'Senior software engineer building production healthcare SaaS and Azure AI systems.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0b' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
  colorScheme: 'dark light',
  width: 'device-width',
  initialScale: 1,
};

const themeInitScript = `
(function(){try{var t=localStorage.getItem('theme');var prefersLight=window.matchMedia('(prefers-color-scheme: light)').matches;var resolved=t==='light'||t==='dark'?t:(t==='system'?(prefersLight?'light':'dark'):'dark');var root=document.documentElement;if(resolved==='light'){root.classList.add('light');}else{root.classList.remove('light');}root.dataset.theme=resolved;}catch(e){}})();
`.trim();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
      </head>
      <body className="bg-bg text-fg antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="min-h-[60vh]">
          {children}
        </main>
        <SiteFooter />
        <JsonLd />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
