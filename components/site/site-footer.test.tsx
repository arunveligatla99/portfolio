import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  it('renders core nav links', () => {
    render(<SiteFooter />);
    for (const label of ['About', 'Projects', 'Writing', 'Contact', 'Resume']) {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0);
    }
  });

  it('exposes GitHub, LinkedIn, email links', () => {
    render(<SiteFooter />);
    expect(screen.getByLabelText('GitHub').getAttribute('href')).toContain('github.com/arunveligatla');
    expect(screen.getByLabelText('LinkedIn').getAttribute('href')).toContain('linkedin.com');
    expect(screen.getByLabelText('Email').getAttribute('href')).toBe('mailto:arun.veligatla@gmail.com');
  });

  it('renders the current year in the credit', () => {
    render(<SiteFooter />);
    expect(
      screen.getByText(new RegExp(`${new Date().getFullYear()}`)),
    ).toBeInTheDocument();
  });
});
