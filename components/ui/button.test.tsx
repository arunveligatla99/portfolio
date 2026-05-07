import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole('button', { name: 'Click me' }),
    ).toBeInTheDocument();
  });

  it('applies the secondary variant class', () => {
    render(<Button variant="secondary">Sec</Button>);
    expect(screen.getByRole('button')).toHaveClass('border');
  });

  it('respects the disabled attribute', () => {
    render(<Button disabled>x</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('forwards type', () => {
    render(<Button type="submit">go</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });
});
