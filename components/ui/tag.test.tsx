import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tag } from './tag';

describe('Tag', () => {
  it('renders children', () => {
    render(<Tag>AI / ML</Tag>);
    expect(screen.getByText('AI / ML')).toBeInTheDocument();
  });

  it('applies the mono variant class', () => {
    render(<Tag variant="mono">.NET</Tag>);
    expect(screen.getByText('.NET')).toHaveClass('font-mono');
  });

  it('applies the outline variant class', () => {
    render(<Tag variant="outline">x</Tag>);
    expect(screen.getByText('x')).toHaveClass('border');
  });
});
