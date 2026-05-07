import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Section } from './section';

describe('Section', () => {
  it('renders eyebrow, title, description', () => {
    render(
      <Section eyebrow="EYE" title="T" description="D">
        <p>body</p>
      </Section>,
    );
    expect(screen.getByText('EYE')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'T' })).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
    expect(screen.getByText('body')).toBeInTheDocument();
  });

  it('skips the header when bare', () => {
    render(
      <Section bare title="T">
        <p>body</p>
      </Section>,
    );
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
  });
});
