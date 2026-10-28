import type { MetadataRoute } from 'next';
import { business } from '@/content/site';
import { getPagePaths } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [...(await getPagePaths()), '/contact/'].map((path) => ({
    url: new URL(path, business.siteUrl).toString(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
