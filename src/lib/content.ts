import { cache } from 'react';
import { contact as localContact, pages as localPageMap } from '@/content/pages';
import { business as localBusiness, chrome as localChrome } from '@/content/site';
import type { Business, ContactContent, PageContent, SiteChrome } from '@/content/types';
import { client, SANITY_TAG } from '@/sanity/client';
import {
  mapBusiness,
  mapChrome,
  mapContact,
  mapPage,
  type SanityChrome,
  type SanityContact,
  type SanityPage,
} from '@/sanity/mappers';

// Single entry point for content. Reads from Sanity when it is configured and has pages,
// otherwise from the local files in src/content, so the site always has something to render.

const localPages = Object.values(localPageMap);

const fetchSanity = cache(async (query: string, params: Record<string, string> = {}): Promise<unknown> => {
  if (!client) return null;
  // Every page load reads the dashboard fresh, so a publish shows on the next refresh with no
  // webhook needed.
  return client.fetch(query, params, { cache: 'no-store', next: { tags: [SANITY_TAG] } });
});

const sanityHasPages = cache(async () => Boolean(await fetchSanity('count(*[_type == "page"]) > 0')));

export async function getPagePaths(): Promise<string[]> {
  if (await sanityHasPages()) return (await fetchSanity('*[_type == "page" && defined(path)].path')) as string[];
  return localPages.map((p) => p.path);
}

export const PAGE_QUERY = `*[_type == "page" && path == $path][0]{
  ...,
  blocks[]{
    ...,
    _type == "projectsBlock" => { items[]{ ..., project-> } },
    _type == "testimonialsBlock" => { items[]-> }
  }
}`;

export async function getPage(path: string): Promise<PageContent | null> {
  if (await sanityHasPages()) {
    const doc = (await fetchSanity(PAGE_QUERY, { path })) as SanityPage | null;
    return doc ? mapPage(doc) : null;
  }
  return localPages.find((p) => p.path === path) ?? null;
}

export const getBusiness = cache(async (): Promise<Business> => {
  const doc = (await fetchSanity('*[_id == "siteSettings"][0]')) as Partial<Business> | null;
  return doc ? mapBusiness(doc, localBusiness) : localBusiness;
});

const CHROME_QUERY = `*[_id == "siteChrome"][0]{
  ...,
  "logoAsset": logo.asset->{ url, "width": metadata.dimensions.width, "height": metadata.dimensions.height },
  "heroVideoUrl": heroVideo.asset->url
}`;

/** Header menu, footer, logo, homepage film and shared button wording. */
export const getChrome = cache(async (): Promise<SiteChrome> => {
  const doc = (await fetchSanity(CHROME_QUERY)) as SanityChrome | null;
  return doc ? mapChrome(doc, localChrome) : localChrome;
});

export async function getContactPage(): Promise<ContactContent> {
  const doc = (await fetchSanity('*[_id == "contactPage"][0]')) as SanityContact | null;
  return doc ? mapContact(doc, localContact) : localContact;
}
