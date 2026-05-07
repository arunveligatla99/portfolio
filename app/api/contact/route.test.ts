import { describe, it, expect, beforeEach, vi } from 'vitest';
import { POST } from './route';

function makeReq(body: unknown, ip = '198.51.100.1'): Request {
  return new Request('http://localhost/api/contact', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-forwarded-for': ip,
    },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}

describe('POST /api/contact', () => {
  beforeEach(() => {
    delete process.env.RESEND_API_KEY;
    vi.restoreAllMocks();
    vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  it('returns 422 on validation failure', async () => {
    const res = await POST(
      makeReq({ name: 'A', email: 'no', message: 'short' }),
    );
    expect(res.status).toBe(422);
  });

  it('returns 400 on invalid JSON', async () => {
    const res = await POST(makeReq('{not json'));
    expect(res.status).toBe(400);
  });

  it('drops bot fills via honeypot without 4xx', async () => {
    const res = await POST(
      makeReq(
        {
          name: 'Bot',
          email: 'bot@example.com',
          message: 'A long enough message to pass length check.',
          honeypot: 'spam',
        },
        '198.51.100.2',
      ),
    );
    expect(res.status).toBe(200);
    const json = (await res.json()) as { ok: boolean; dropped?: boolean };
    expect(json.ok).toBe(true);
    expect(json.dropped).toBe(true);
  });

  it('returns stub success when RESEND_API_KEY unset', async () => {
    const res = await POST(
      makeReq(
        {
          name: 'Recruiter',
          email: 'r@example.com',
          message: 'A long enough message to pass length check.',
        },
        '198.51.100.3',
      ),
    );
    expect(res.status).toBe(200);
    const json = (await res.json()) as { ok: boolean; stub: boolean };
    expect(json).toEqual({ ok: true, stub: true });
  });

  it('rate-limits a single IP after 5 requests', async () => {
    const ip = '198.51.100.99';
    for (let i = 0; i < 5; i++) {
      const res = await POST(
        makeReq(
          {
            name: 'Recruiter',
            email: 'r@example.com',
            message: 'A long enough message to pass length check.',
          },
          ip,
        ),
      );
      expect(res.status).toBe(200);
    }
    const sixth = await POST(
      makeReq(
        {
          name: 'Recruiter',
          email: 'r@example.com',
          message: 'A long enough message to pass length check.',
        },
        ip,
      ),
    );
    expect(sixth.status).toBe(429);
  });
});
