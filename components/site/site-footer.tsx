import Link from 'next/link';
import { Github, Linkedin, Mail, FileText } from 'lucide-react';
import { Container } from '@/components/ui/container';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-default">
      <Container className="grid gap-8 py-10 sm:grid-cols-3">
        <div>
          <p className="font-mono text-sm text-fg">Arun Veligatla</p>
          <p className="mt-1 text-sm text-muted">
            Senior AI Engineer
          </p>
          <p className="mt-1 text-sm text-subtle">Lake Orion, MI</p>
        </div>

        <nav aria-label="Footer">
          <ul className="space-y-1 text-sm">
            <li>
              <Link className="text-muted hover:text-fg" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-fg" href="/projects">
                Projects
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-fg" href="/writing">
                Writing
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-fg" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-fg" href="/resume">
                Resume
              </Link>
            </li>
          </ul>
        </nav>

        <ul className="flex flex-wrap items-center gap-4 text-sm sm:justify-end">
          <li>
            <a
              className="inline-flex items-center gap-2 text-muted hover:text-fg"
              href="https://github.com/arunveligatla"
              rel="me noopener noreferrer"
              target="_blank"
              aria-label="GitHub"
            >
              <Github size={16} aria-hidden />
              <span>GitHub</span>
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-2 text-muted hover:text-fg"
              href="https://www.linkedin.com/in/arun-v-311419137"
              rel="me noopener noreferrer"
              target="_blank"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} aria-hidden />
              <span>LinkedIn</span>
            </a>
          </li>
          <li>
            <a
              className="inline-flex items-center gap-2 text-muted hover:text-fg"
              href="mailto:arun.veligatla@gmail.com"
              aria-label="Email"
            >
              <Mail size={16} aria-hidden />
              <span>Email</span>
            </a>
          </li>
          <li>
            <Link
              className="inline-flex items-center gap-2 text-muted hover:text-fg"
              href="/resume"
              aria-label="Resume"
            >
              <FileText size={16} aria-hidden />
              <span>Resume</span>
            </Link>
          </li>
        </ul>
      </Container>
      <Container className="border-t border-default py-6">
        <p className="font-mono text-xs text-subtle">
          © {year} Arun Veligatla. Built with Next.js. Open to senior roles.
        </p>
      </Container>
    </footer>
  );
}
