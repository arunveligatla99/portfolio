import { describe, it, expect } from 'vitest';
import { promises as fs } from 'node:fs';
import path from 'node:path';

async function walk(dir: string, exts: string[]): Promise<string[]> {
  const out: string[] = [];
  let entries: import('node:fs').Dirent[];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (
        e.name === 'node_modules' ||
        e.name === '.next' ||
        e.name === 'tests'
      )
        continue;
      out.push(...(await walk(full, exts)));
    } else if (exts.some((x) => e.name.endsWith(x))) {
      out.push(full);
    }
  }
  return out;
}

const root = process.cwd();

const BANNED_PHRASES = [
  'passionate about',
  'leveraging cutting-edge',
  'in today’s fast-paced world',
  "in today's fast-paced world",
  "I'm thrilled to",
];

describe('content guard', () => {
  it('forbids the em dash character in source/content', async () => {
    const files = [
      ...(await walk(path.join(root, 'app'), ['.tsx', '.ts'])),
      ...(await walk(path.join(root, 'components'), ['.tsx', '.ts'])),
      ...(await walk(path.join(root, 'content'), ['.mdx'])),
    ];
    const offenders: string[] = [];
    for (const f of files) {
      if (f.endsWith('.test.ts') || f.endsWith('.test.tsx')) continue;
      if (path.basename(f) === 'content-guard.test.ts') continue;
      const text = await fs.readFile(f, 'utf8');
      if (text.includes('—')) offenders.push(path.relative(root, f));
    }
    expect(offenders, `em dash found in:\n${offenders.join('\n')}`).toEqual(
      [],
    );
  });

  it('forbids banned marketing phrases', async () => {
    const files = [
      ...(await walk(path.join(root, 'app'), ['.tsx', '.ts'])),
      ...(await walk(path.join(root, 'components'), ['.tsx', '.ts'])),
      ...(await walk(path.join(root, 'content'), ['.mdx'])),
    ];
    const offenders: { file: string; phrase: string }[] = [];
    for (const f of files) {
      if (f.endsWith('.test.ts') || f.endsWith('.test.tsx')) continue;
      if (path.basename(f) === 'content-guard.test.ts') continue;
      const text = (await fs.readFile(f, 'utf8')).toLowerCase();
      for (const p of BANNED_PHRASES) {
        if (text.includes(p.toLowerCase())) {
          offenders.push({ file: path.relative(root, f), phrase: p });
        }
      }
    }
    expect(
      offenders,
      `banned phrases:\n${offenders
        .map((o) => `${o.file}: ${o.phrase}`)
        .join('\n')}`,
    ).toEqual([]);
  });

  it('forbids RIF / layoff references in public copy', async () => {
    const banned = ['RIF', 'layoff', 'laid off'];
    const files = [
      ...(await walk(path.join(root, 'app'), ['.tsx', '.ts'])),
      ...(await walk(path.join(root, 'components'), ['.tsx', '.ts'])),
      ...(await walk(path.join(root, 'content'), ['.mdx'])),
    ];
    const offenders: { file: string; word: string }[] = [];
    for (const f of files) {
      if (f.endsWith('.test.ts') || f.endsWith('.test.tsx')) continue;
      if (path.basename(f) === 'content-guard.test.ts') continue;
      const text = await fs.readFile(f, 'utf8');
      for (const w of banned) {
        const re = new RegExp(`\\b${w}\\b`, 'i');
        if (re.test(text)) offenders.push({ file: path.relative(root, f), word: w });
      }
    }
    expect(
      offenders,
      `RIF/layoff terms:\n${offenders
        .map((o) => `${o.file}: ${o.word}`)
        .join('\n')}`,
    ).toEqual([]);
  });
});
