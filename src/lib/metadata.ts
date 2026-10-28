import type { Metadata } from 'next';
import { business } from '@/content/site';

export function pageMetadata({
  path,
  meta,
  absoluteTitle = false,
}: {
  path: string;
  meta: { title: string; description: string };
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: meta.title } : meta.title,
    description: meta.description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      url: path,
      siteName: business.name,
      title: meta.title,
      description: meta.description,
      locale: 'en_US',
    },
  };
}
