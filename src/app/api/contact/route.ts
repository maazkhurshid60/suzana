import { NextResponse } from 'next/server';

const FIELDS = ['name', 'phone', 'email', 'location', 'stage', 'notes'] as const;

/**
 * Receives the contact form and forwards it as JSON to CONTACT_WEBHOOK_URL
 * (Formspree, Zapier, Make or similar, which then emails the office).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot filled in: pretend it worked and drop it.
  if (typeof body.company_site === 'string' && body.company_site.trim()) {
    return NextResponse.json({ ok: true });
  }

  const submission = Object.fromEntries(
    FIELDS.map((key) => [key, typeof body[key] === 'string' ? (body[key] as string).trim().slice(0, 2000) : '']),
  );

  if (!submission.name || (!submission.phone && !submission.email)) {
    return NextResponse.json({ ok: false, error: 'Name and a phone or email are required.' }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[contact] CONTACT_WEBHOOK_URL not set. Submission:', submission);
      return NextResponse.json({ ok: true });
    }
    console.error('[contact] CONTACT_WEBHOOK_URL is not configured. Submission dropped.');
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...submission, source: 'garrectorassociates.com/contact', receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Forwarding failed:', err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
