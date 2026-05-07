import { promises as fs } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface RawMdx<T> {
  slug: string;
  filePath: string;
  data: T;
  content: string;
}

export async function readMdxDir<T>(
  relDir: string,
): Promise<RawMdx<T>[]> {
  const dir = path.join(process.cwd(), relDir);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  const out: RawMdx<T>[] = [];
  for (const entry of entries) {
    if (!entry.endsWith('.mdx')) continue;
    if (entry.startsWith('_')) continue;
    const filePath = path.join(dir, entry);
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = matter(raw);
    const slug = entry.replace(/\.mdx$/, '');
    out.push({
      slug,
      filePath,
      data: parsed.data as T,
      content: parsed.content,
    });
  }
  return out;
}

export async function readMdxBySlug<T>(
  relDir: string,
  slug: string,
): Promise<RawMdx<T> | null> {
  const dir = path.join(process.cwd(), relDir);
  const filePath = path.join(dir, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const parsed = matter(raw);
    return {
      slug,
      filePath,
      data: parsed.data as T,
      content: parsed.content,
    };
  } catch {
    return null;
  }
}
