import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from './hero';

describe('Hero', () => {
  it('renders the H1 with the name', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Arun Veligatla' }),
    ).toBeInTheDocument();
  });

  it('shows the headline metrics inline', () => {
    render(<Hero />);
    expect(
      screen.getByText(/92.5% citation accuracy/i),
    ).toBeInTheDocument();
    expect(screen.getByText(/p95 under\s+800ms/i)).toBeInTheDocument();
    expect(screen.getByText(/100% escalation recall/i)).toBeInTheDocument();
  });

  it('shows three CTAs', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: /get in touch/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /see projects/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view resume/i })).toBeInTheDocument();
  });
});
