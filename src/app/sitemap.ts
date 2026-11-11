import type { MetadataRoute } from 'next';
import { business } from '@/content/site';
import { getPagePaths, getProjects } from '@/lib/content';
import { isPublishable } from '@/lib/review';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const work = (await getProjects()).filter((p) => p.slug && isPublishable(p)).map((p) => `/work/${p.slug}/`);
  return [...(await getPagePaths()), '/work/', ...work, '/contact/'].map((path) => ({
    url: new URL(path, business.siteUrl).toString(),
    changeFrequency: 'monthly',
    priority: path === '/' ? 1 : 0.8,
  }));
}
