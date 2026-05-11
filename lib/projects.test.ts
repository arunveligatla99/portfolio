import { describe, it, expect } from 'vitest';
import { listProjects, listFeaturedProjects, getProject } from './projects';

describe('projects loader', () => {
  it('loads all seven expected projects', async () => {
    const projects = await listProjects();
    const slugs = projects.map((p) => p.slug).sort();
    expect(slugs).toEqual(
      [
        'agentix-erp',
        'collectmind',
        'ehr-migration',
        'ema-mmrxservice',
        'nemorx',
        'policymind',
        'traknet',
      ].sort(),
    );
  });

  it('orders by `order` then title', async () => {
    const projects = await listProjects();
    const orders = projects.map((p) => p.order ?? 100);
    const sorted = [...orders].sort((a, b) => a - b);
    expect(orders).toEqual(sorted);
  });

  it('returns featured subset', async () => {
    const featured = await listFeaturedProjects();
    expect(featured.length).toBeGreaterThanOrEqual(2);
    expect(featured.every((p) => p.featured)).toBe(true);
  });

  it('parses frontmatter into typed metrics', async () => {
    const agentix = await getProject('agentix-erp');
    expect(agentix).not.toBeNull();
    expect(agentix!.metrics?.[0]).toHaveProperty('label');
    expect(agentix!.metrics?.[0]).toHaveProperty('value');
    expect(agentix!.stack).toContain('.NET 10');
    expect(agentix!.domain).toContain('enterprise-saas');
  });

  it('returns null for unknown slug', async () => {
    const missing = await getProject('does-not-exist');
    expect(missing).toBeNull();
  });
});
