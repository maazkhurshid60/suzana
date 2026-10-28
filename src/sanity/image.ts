import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import { dataset, isSanityConfigured, projectId } from './env';

const builder = isSanityConfigured ? createImageUrlBuilder({ projectId, dataset }) : null;

/** A resized, compressed URL for an image uploaded in the dashboard. */
export function imageUrl(source: SanityImageSource, width = 2000) {
  return builder?.image(source).width(width).auto('format').quality(80).url();
}
