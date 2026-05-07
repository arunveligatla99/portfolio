import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Container } from './container';

describe('Container', () => {
  it('renders its children', () => {
    const { getByText } = render(<Container>hi</Container>);
    expect(getByText('hi')).toBeInTheDocument();
  });

  it('passes className alongside defaults', () => {
    const { container } = render(
      <Container className="my-extra">x</Container>,
    );
    const el = container.firstElementChild!;
    expect(el.className).toContain('mx-auto');
    expect(el.className).toContain('my-extra');
  });
});
