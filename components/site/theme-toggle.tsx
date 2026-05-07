'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

type Theme = 'light' | 'dark';

function readTheme(): Theme {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return 'dark';
}

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.classList.toggle('light', t === 'light');
  root.dataset.theme = t;
}

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(readTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    window.localStorage.setItem('theme', next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      aria-pressed={theme === 'light'}
      onClick={toggle}
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-[0.5rem] border border-default text-fg hover:bg-surface-2 transition-colors',
        className,
      )}
    >
      {mounted && theme === 'dark' ? (
        <Sun aria-hidden size={16} />
      ) : (
        <Moon aria-hidden size={16} />
      )}
    </button>
  );
}
