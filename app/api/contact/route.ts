import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const payloadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(120, 'Name must be 120 characters or fewer'),
  email: z
    .string()
    .email('Email must be a valid email address')
    .max(254, 'Email must be 254 characters or fewer'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(4000, 'Message must be 4000 characters or fewer'),
  honeypot: z.string().optional().default(''),
});

interface BucketState {
  count: number;
  reset: number;
}
const buckets = new Map<string, BucketState>();
const WINDOW_MS = 60_000;
const LIMIT = 5;

function rateLimit(key: string): boolean {
  const now = Date.now();
  const cur = buckets.get(key);
  if (!cur || cur.reset < now) {
    buckets.set(key, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  cur.count += 1;
  return cur.count <= LIMIT;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON' },
      { status: 400 },
    );
  }

  const parsed = payloadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: parsed.error.issues[0]?.message ?? 'Validation failed',
      },
      { status: 422 },
    );
  }

  if (parsed.data.honeypot.trim() !== '') {
    return NextResponse.json({ ok: true, dropped: true });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'anon';
  if (!rateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests' },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'contact@arunveligatla.com';
  const to = process.env.CONTACT_TO_EMAIL || 'arun.veligatla@gmail.com';

  if (!apiKey) {
    console.info('[contact] stub mode (RESEND_API_KEY unset)', {
      from: parsed.data.email,
      name: parsed.data.name,
      bytes: parsed.data.message.length,
    });
    return NextResponse.json({ ok: true, stub: true });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: parsed.data.email,
      subject: `Portfolio contact: ${parsed.data.name}`,
      text: `From: ${parsed.data.name} <${parsed.data.email}>\n\n${parsed.data.message}`,
    });
    return NextResponse.json({ ok: true, stub: false });
  } catch (e) {
    console.error('[contact] resend error', e);
    return NextResponse.json(
      { ok: false, error: 'Email failed; please try again' },
      { status: 502 },
    );
  }
}
