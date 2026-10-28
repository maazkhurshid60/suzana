import {
  faqBlock,
  glanceBlock,
  imageBlock,
  offeringsBlock,
  placesBlock,
  projectsBlock,
  proseBlock,
  testimonialsBlock,
} from './blocks';
import { contactPage, page, project, siteChrome, siteSettings, testimonial } from './documents';
import { link, paragraph, photoSlot, reviewNote, subsection } from './objects';

export const schemaTypes = [
  // Documents
  page,
  project,
  testimonial,
  siteSettings,
  siteChrome,
  contactPage,
  // Sections
  proseBlock,
  offeringsBlock,
  projectsBlock,
  placesBlock,
  glanceBlock,
  faqBlock,
  imageBlock,
  testimonialsBlock,
  // Building blocks
  link,
  reviewNote,
  paragraph,
  photoSlot,
  subsection,
];

/** Documents that exist exactly once. */
export const singletons = ['siteSettings', 'siteChrome', 'contactPage'];
