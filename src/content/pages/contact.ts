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
  whatHappens: {
    heading: 'What happens',
    body: [
      'You talk to Gar. Then you walk the site with him, whatever stage it is at, whether that is raw land, a house you are thinking of buying, or a set of drawings close to final.',
      'There is no estimate form on this site and no automated quote. A budget gets built line by line from completed architectural and engineering drawings, which is a later conversation and a longer one.',
      'If the project is not a fit, he will say so and point you somewhere better. That is worth more to both of us than a meeting that goes nowhere.',
    ],
  },
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
