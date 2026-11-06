'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

const field =
  'w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink outline-none placeholder:text-muted/60 focus:border-ink focus:ring-0';
const label = 'block font-mono text-[11px] uppercase tracking-[0.18em] text-bronze';

export function ContactForm({ stages, phone }: { stages: string[]; phone: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    if (!data.name?.trim()) {
      setStatus('error');
      setError('Please add your name.');
      return;
    }
    if (!data.phone?.trim() && !data.email?.trim()) {
      setStatus('error');
      setError('Please leave a phone number or an email so Gar can reach you.');
      return;
    }

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setStatus('sent');
      form.reset();
    } catch {
      setStatus('error');
      setError(`That did not send. Please call ${phone}.`);
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center border border-line bg-paper-deep p-10 text-center text-ink">
        <CheckCircle2 className="h-10 w-10 text-bronze" strokeWidth={1.25} />
        <p className="mt-6 font-heading text-3xl">Thank you. We have your note.</p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
          If it is easier to talk now, call {phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative border border-line bg-paper-deep p-6 text-ink md:p-10">
      <div className="grid gap-5">
        <div>
          <label htmlFor="name" className={label}>
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={field} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="phone" className={label}>
              Phone
            </label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" className={field} />
          </div>
          <div>
            <label htmlFor="email" className={label}>
              Email
            </label>
            <input id="email" name="email" type="email" autoComplete="email" className={field} />
          </div>
        </div>
        <div>
          <label htmlFor="location" className={label}>
            Where the project is <span className="normal-case tracking-normal text-muted">(town is enough)</span>
          </label>
          <input id="location" name="location" className={field} />
        </div>
        <div>
          <label htmlFor="stage" className={label}>
            What stage it is at
          </label>
          <select id="stage" name="stage" defaultValue="" className={`${field} bg-paper-deep`}>
            <option value="" disabled>
              Choose one
            </option>
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="notes" className={label}>
            Anything else worth knowing
          </label>
          <textarea id="notes" name="notes" rows={5} maxLength={2000} className={`${field} resize-y`} />
        </div>

        {/* Honeypot. Real visitors never see or fill this. */}
        <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="company_site">Leave this empty</label>
          <input id="company_site" name="company_site" tabIndex={-1} autoComplete="off" />
        </div>
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-9 inline-flex w-full items-center justify-center gap-3 bg-ink px-8 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-paper transition-colors hover:bg-bronze disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending' : 'Send'}
        {status !== 'sending' && <Send className="h-4 w-4" />}
      </button>

      {status === 'error' && (
        <p role="alert" className="mt-4 border border-red-700/30 bg-red-50 px-4 py-3 text-sm text-red-900">
          {error}
        </p>
      )}
    </form>
  );
}
