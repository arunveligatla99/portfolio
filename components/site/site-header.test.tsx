import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  it('renders the home link', () => {
    render(<SiteHeader />);
    expect(
      screen.getByRole('link', { name: /arun veligatla, home/i }),
    ).toBeInTheDocument();
  });

  it('renders all primary nav links', () => {
    render(<SiteHeader />);
    for (const label of ['About', 'Projects', 'Writing', 'Contact']) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument();
    }
  });

  it('exposes a labelled theme toggle', () => {
    render(<SiteHeader />);
    expect(
      screen.getByRole('button', { name: /switch to (light|dark) theme/i }),
    ).toBeInTheDocument();
  });
});
