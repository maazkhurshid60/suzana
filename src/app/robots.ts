import type { MetadataRoute } from 'next';
import { business } from '@/content/site';
import { INDEXABLE } from '@/lib/review';

export default function robots(): MetadataRoute.Robots {
  // Review and preview builds are not for search engines.
  if (!INDEXABLE) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: new URL('/sitemap.xml', business.siteUrl).toString(),
  };
}
