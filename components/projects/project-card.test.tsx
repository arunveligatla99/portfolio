import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProjectCard } from './project-card';
import type { Project } from '@/lib/projects-shared';

const project: Project = {
  slug: 'sample',
  title: 'Sample Project',
  tagline: 'A short tagline.',
  role: 'Lead',
  period: '2025',
  domain: ['ai-ml'],
  stack: ['Python', 'FastAPI'],
  highlights: ['Did the thing.'],
  metrics: [
    { label: 'Accuracy', value: '99%' },
    { label: 'Latency', value: '< 1s' },
  ],
  featured: true,
  content: '',
};

describe('ProjectCard', () => {
  it('renders title, tagline, period, stack', () => {
    render(<ProjectCard project={project} />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Sample Project' }),
    ).toBeInTheDocument();
    expect(screen.getByText('A short tagline.')).toBeInTheDocument();
    expect(screen.getByText('2025')).toBeInTheDocument();
    expect(
      screen.getByText('Python · FastAPI', { exact: false }),
    ).toBeInTheDocument();
  });

  it('renders metrics when provided', () => {
    render(<ProjectCard project={project} />);
    expect(screen.getByText('99%')).toBeInTheDocument();
    expect(screen.getByText('< 1s')).toBeInTheDocument();
  });

  it('uses an accessible link label', () => {
    render(<ProjectCard project={project} />);
    expect(
      screen.getByRole('link', { name: /case study: sample project/i }),
    ).toBeInTheDocument();
  });
});
