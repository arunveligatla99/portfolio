import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ThemeToggle } from './theme-toggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    document.documentElement.className = '';
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders with an aria-label', () => {
    render(<ThemeToggle />);
    expect(
      screen.getByRole('button', { name: /switch to (light|dark) theme/i }),
    ).toBeInTheDocument();
  });

  it('persists theme to localStorage on click', () => {
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    act(() => {
      btn.click();
    });
    expect(window.localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('toggles back to dark', () => {
    window.localStorage.setItem('theme', 'light');
    render(<ThemeToggle />);
    const btn = screen.getByRole('button');
    act(() => {
      btn.click();
    });
    expect(window.localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.classList.contains('light')).toBe(false);
  });
});
