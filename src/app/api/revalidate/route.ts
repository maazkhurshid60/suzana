import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { SANITY_TAG } from '@/sanity/client';

/**
 * Called by a Sanity webhook on every publish, so dashboard changes go live within seconds
 * instead of waiting for the hourly refresh.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ ok: false, error: 'SANITY_REVALIDATE_SECRET is not set' }, { status: 500 });

  const { isValidSignature } = await parseBody(req, secret);
  if (!isValidSignature) return NextResponse.json({ ok: false, error: 'Invalid signature' }, { status: 401 });

  revalidateTag(SANITY_TAG, 'max');
  return NextResponse.json({ ok: true, revalidated: SANITY_TAG });
}
