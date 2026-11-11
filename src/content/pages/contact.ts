import type { ContactContent } from '../types';

// The Contact page runs from its own instructions document, which the copy document did not
// have. Reconcile against it before launch. If the two disagree, that document wins.
export const contact: ContactContent = {
  path: '/contact/',
  meta: {
    title: 'Contact | Talk to Gar About Your Project',
    description:
      'Talk to Gar Rector about your project. Call (707) 963-8700 or send a note. Office and shop at 1401 Charter Oak Ave, St. Helena, CA.',
  },
  h1: 'Talk to Gar about your project',
  sub: 'The first step is a conversation, not a quote.',
  heroImage: '/media/photos/hero-contact.jpg',
  review: [
    {
      kind: 'hold',
      text: 'This page runs from its own Contact instructions document, which is not in the consolidated reference. Reconcile the copy and form against it before launch. If the two disagree, that document wins.',
    },
  ],
  // Removed at the client's request, November 2026.
  whatHappens: { heading: '', body: [] },
  getInTouchHeading: 'Get in touch',
  detailsFlags: [{
    kind: 'input',
    text: 'No email address appears anywhere in the reference. One is needed, or the form is the only route.',
  }],
  formHeading: 'Send a note',
  formFlags: [{
    kind: 'decision',
    text: 'The form fields are a proposal, not an approved spec. The Contact instructions document may already define these. Nothing here asks for a budget, a timeline or a square footage, because that makes the page a quote request.',
  }],
  stages: [
    'Thinking about it',
    'Site owned, no drawings',
    'Architect engaged, drawings in progress',
    'Drawings complete',
  ],
  directionsHeading: 'Directions',
  directionsFlags: [{
    kind: 'input',
    text: 'Whether a map embeds here. A Google Maps embed on the Charter Oak address supports the Business Profile, and Charter Oak is the address that publishes.',
  }],
};
