import { createClient } from 'next-sanity';
import { apiVersion, dataset, isSanityConfigured, projectId } from './env';

export const client = isSanityConfigured
  ? // The live API, not the CDN: the site caches pages itself, and the CDN can briefly return the
    // pre-publish version right after the webhook fires.
    createClient({ projectId, dataset, apiVersion, useCdn: false, perspective: 'published' })
  : null;

/** Every Sanity read is cached and tagged, so the publish webhook can refresh the whole site at once. */
export const SANITY_TAG = 'sanity';
