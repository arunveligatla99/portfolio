import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ThemeToggle } from './theme-toggle';

const NAV = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/writing', label: 'Writing' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-default bg-bg/80 backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Arun Veligatla, home"
          className="font-mono text-sm tracking-wide text-fg hover:text-accent transition-colors"
        >
          arun<span className="text-accent">.</span>v
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-1 sm:gap-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center rounded-[0.5rem] px-2 py-1.5 text-sm text-muted hover:text-fg transition-colors sm:px-3"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="ml-1">
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
