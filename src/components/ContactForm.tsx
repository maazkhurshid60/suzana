'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

const field =
  'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-400 focus:border-white/50 focus:ring-2 focus:ring-white/20';
const label = 'mb-1.5 block font-label text-sm font-medium text-neutral-300';

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
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] bg-neutral-950 p-10 text-center text-white">
        <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={1.25} />
        <p className="mt-6 font-heading text-3xl">Thank you. We have your note.</p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">
          If it is easier to talk now, call {phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="relative rounded-[28px] bg-neutral-950 p-6 text-white md:p-10">
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
            Where the project is <span className="text-neutral-500">(town is enough)</span>
          </label>
          <input id="location" name="location" className={field} />
        </div>
        <div>
          <label htmlFor="stage" className={label}>
            What stage it is at
          </label>
          <select id="stage" name="stage" defaultValue="" className={`${field} bg-neutral-950`}>
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
        className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 font-label text-sm font-semibold tracking-wide text-black transition-colors hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending' : 'Send'}
        {status !== 'sending' && <Send className="h-4 w-4" />}
      </button>

      {status === 'error' && (
        <p role="alert" className="mt-4 rounded-xl border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {error}
        </p>
      )}
    </form>
  );
}
