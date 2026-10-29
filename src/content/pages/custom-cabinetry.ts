import { placeholderPhoto, shared } from '../site';
import type { PageContent } from '../types';

// Thirty years belongs to the cabinetmaker, not the shop. The shop is recent. Keep them apart
// through every edit. No cabinetmaker name and no shop DBA appear without written permission.
export const customCabinetry: PageContent = {
  path: '/services/custom-cabinetry/',
  meta: {
    title: 'Custom Cabinetry & Millwork, St. Helena | Napa Valley',
    description:
      'Cabinetry, paneling and millwork made in our own three-person shop in St. Helena, built to your architect’s drawings on the same calendar as the house.',
  },
  eyebrow: 'Services',
  hero: {
    h1: 'Cabinetry and millwork, made in St. Helena',
    image: '/media/photos/hero-cabinet-shop.jpg',
    sub: 'A three-person shop, a cabinetmaker with thirty years at the bench, and the finish work running on our own calendar.',
    ctas: ['conversation'],
    flags: [
      {
        kind: 'input',
        text: 'Item 10. Does the shop take standalone work, from owners or other builders? That answer decides whether this page carries its own CTA and what it says. The copy assumes it does not, which is the safer default.',
      },
    ],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'Why a builder owns a cabinet shop',
      body: [
        'On a high-end house the millwork is the last thing in and the first thing anyone notices. It is also, routinely, the thing that holds up the end of a build. A shop with its own queue and its own priorities decides when your kitchen gets made.',
        'Gar bought the tools and built the shop out so that would stop being somebody else’s decision. The finish work on our houses is made by us, to our schedule, and if a date moves it moves for a reason we can see.',
      ],
    },
    {
      type: 'prose',
      heading: 'The shop',
      subsections: [
        {
          heading: 'Three people and a long bench',
          body: [
            'The shop runs with three people, led by a cabinetmaker Gar met and brought in, who has roughly thirty years of his own at the bench. It is a small operation and it is growing.',
          ],
          flags: [
            {
              kind: 'input',
              text: 'Item 10 and guardrail 10. The cabinetmaker’s name cannot be published without his written permission. The copy describes him without naming him.',
            },
          ],
        },
        {
          heading: 'What gets made here',
          body: [
            'Kitchens, paneling, built-ins, vanities, interior doors and trim. Anything the drawings call for in wood, made for one house at a time rather than batched against other jobs.',
          ],
          flags: [
            {
              kind: 'input',
              text: 'Item 3. The full capability list. The list above is inferred from what the shop does on these builds and needs confirming before it publishes.',
            },
          ],
        },
        {
          heading: 'Built to your architect’s drawings',
          body: [
            'Millwork details come from the design team the same way the rest of the house does. Where a detail is difficult to build, the shop works it out with them rather than simplifying it quietly.',
          ],
        },
        {
          heading: 'One company, one calendar',
          body: [
            'Because the shop is ours, the cabinetry schedule and the build schedule are the same schedule. There is no handoff between a builder and a supplier, and no gap where one blames the other.',
          ],
        },
      ],
    },
    {
      type: 'glance',
      rows: [
        { label: 'What it is', value: 'Our own cabinetry and millwork shop in St. Helena' },
        { label: 'The team', value: 'Three people, led by a cabinetmaker with roughly thirty years of experience' },
        { label: 'What gets made', flags: [{ kind: 'input', text: 'Item 3. Confirm the capability list.' }] },
        { label: 'Who it is for', value: 'Owners and architects building or remodeling with Gar Rector & Associates' },
        { label: 'Standalone work', flags: [{ kind: 'input', text: 'Item 10. Not answered.' }] },
        { label: 'How the number gets built', value: 'Millwork is a line in the project budget, developed from completed drawings' },
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'Recent work',
      image: placeholderPhoto(
        'great-room-builtins.jpg',
        'Interiors. This page needs them more than any other, top of the shot list for the planned shoot.',
      ),
      items: [],
      flags: [
        {
          kind: 'input',
          text: 'The shop has no project block of its own. One image exists in the current asset set, a vaulted ceiling with custom millwork from 344 Troon Ct, a project with no other information attached. Either that project gets filled in, or this page borrows an interior from Quail Camp or Contemporary Farmhouse with permission.',
        },
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'Can I buy cabinetry from you without building with you?',
          flags: [
            {
              kind: 'input',
              text: 'Item 10. Until this is answered the question stays unanswered. If the answer is no, the honest version is one line: the shop exists to serve our own builds, and we are glad to recommend others.',
            },
          ],
        },
        {
          q: 'Who designs the cabinetry?',
          a: [
            'Your architect or designer does, and we build to their drawings. Where a detail needs working out for the shop to make it, that happens with them.',
          ],
        },
        {
          q: 'How long has the shop been running?',
          flags: [
            {
              kind: 'input',
              text: 'Item 3. The shop is recent. The thirty years belongs to the cabinetmaker, not to the shop, and any sentence that lets a reader think otherwise is false. This needs the actual founding of the shop.',
            },
          ],
        },
        {
          q: 'What does it mean in practice that the shop is yours?',
          a: [
            'The cabinetry queue is set by our build schedule rather than by somebody else’s order book. When a date on site moves, the shop knows the same day.',
          ],
        },
        {
          q: 'Can you match existing millwork in an older house?',
          a: [
            'Yes. Matching a profile or a finish that is already in the house is ordinary work for a shop that makes one house at a time.',
          ],
        },
        {
          q: 'Is the cabinetry included in the build budget?',
          a: [
            'It is a line in the project budget, built from the completed drawings along with everything else. There is no separate quote and no square-foot figure.',
          ],
        },
      ],
    },
  ],
  cta: { heading: shared.ctaHeading, text: shared.ctaText },
};
