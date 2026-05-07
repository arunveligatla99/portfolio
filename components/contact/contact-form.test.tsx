import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, act, waitFor, fireEvent } from '@testing-library/react';
import { ContactForm } from './contact-form';

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});
afterEach(() => {
  vi.unstubAllGlobals();
});

function fill() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Recruiter' } });
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'r@example.com' } });
  fireEvent.change(screen.getByLabelText('Message'), {
    target: { value: 'Long enough message body for tests.' },
  });
}

describe('ContactForm', () => {
  it('renders accessible labelled fields', () => {
    render(<ContactForm />);
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  it('shows the stub success state when API returns stub:true', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true, stub: true }),
    });
    render(<ContactForm />);
    fill();
    await act(async () => {
      screen.getByRole('button', { name: 'Send' }).click();
    });
    await waitFor(() =>
      expect(screen.getByText(/stub mode/i)).toBeInTheDocument(),
    );
  });

  it('shows the error state on API failure', async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ ok: false, error: 'boom' }),
    });
    render(<ContactForm />);
    fill();
    await act(async () => {
      screen.getByRole('button', { name: 'Send' }).click();
    });
    await waitFor(() => expect(screen.getByText('boom')).toBeInTheDocument());
  });
});
