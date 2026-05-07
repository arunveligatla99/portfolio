import { describe, it, expect } from 'vitest';
import { listPosts, getPost } from './writing';

describe('writing loader', () => {
  it('returns no posts in default (drafts excluded)', async () => {
    const posts = await listPosts();
    expect(posts).toEqual([]);
  });

  it('exposes drafts when includeDrafts is true', async () => {
    const posts = await listPosts({ includeDrafts: true });
    expect(posts.length).toBeGreaterThanOrEqual(1);
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0].draft).toBe(true);
  });

  it('returns the placeholder by slug', async () => {
    const post = await getPost('hello-world');
    expect(post).not.toBeNull();
    expect(post!.title).toBe('Hello, world');
  });
});
