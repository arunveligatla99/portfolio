'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Status =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success'; stub: boolean }
  | { kind: 'error'; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === 'submitting') return;
    setStatus({ kind: 'submitting' });
    const formEl = e.currentTarget;
    const data = new FormData(formEl);
    const payload = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      message: String(data.get('message') ?? ''),
      honeypot: String(data.get('company') ?? ''),
    };
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        stub?: boolean;
        error?: string;
      };
      if (!res.ok || !json.ok) {
        setStatus({
          kind: 'error',
          message: json.error || 'Something went wrong. Please email instead.',
        });
        return;
      }
      formEl.reset();
      setStatus({ kind: 'success', stub: !!json.stub });
    } catch {
      setStatus({
        kind: 'error',
        message: 'Network error. Please email arun.veligatla@gmail.com.',
      });
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm text-fg">
          Name
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={120}
          className={inputClass()}
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm text-fg">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={inputClass()}
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-fg">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          minLength={10}
          maxLength={4000}
          className={inputClass('min-h-[10rem] resize-y py-2')}
        />
      </div>
      <div className="hidden" aria-hidden>
        <label htmlFor="company">Company (do not fill)</label>
        <input
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <Button type="submit" disabled={status.kind === 'submitting'}>
        {status.kind === 'submitting' ? 'Sending…' : 'Send'}
      </Button>

      <div role="status" aria-live="polite" className="min-h-[1.25rem]">
        {status.kind === 'success' && (
          <p className="text-sm text-[color:var(--color-success)]">
            Thanks. {status.stub ? '(Stub mode: no email sent.)' : 'Message received.'}
          </p>
        )}
        {status.kind === 'error' && (
          <p className="text-sm text-[color:var(--color-danger)]">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}

function inputClass(extra = '') {
  return cn(
    'mt-2 block w-full rounded-[0.5rem] border border-default bg-surface px-3 text-sm text-fg placeholder:text-subtle focus:outline-none focus:ring-2 focus:ring-[color:var(--color-ring)]',
    'h-10',
    extra,
  );
}
