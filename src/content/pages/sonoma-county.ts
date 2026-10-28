import { business, permissionFlag, shared } from '../site';
import type { PageContent } from '../types';

export const sonomaCounty: PageContent = {
  path: '/sonoma-county-custom-home-builder/',
  meta: {
    title: 'Custom Home Builder Sonoma County | Healdsburg CA',
    description:
      'A St. Helena custom home builder working in Healdsburg, Santa Rosa and Glen Ellen for select projects, built from your architect’s drawings.',
  },
  eyebrow: 'Areas',
  review: [
    {
      kind: 'hold',
      text: 'The weakest page in the set and the easiest to rank. Recommendation: ship it short, as drafted, and treat the word-count band as a target for a later version. The one thing that changes this page is whatever the Bodega Bay permit was.',
    },
  ],
  hero: {
    h1: 'Custom home builder in Sonoma County',
    sub: 'A St. Helena builder working in Healdsburg, Santa Rosa and Glen Ellen, for a small number of projects at a time.',
    ctas: ['conversation'],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'We take Sonoma County work selectively',
      body: [
        'The office and the cabinet shop are in St. Helena, and most of our work is in Napa Valley. We build in Sonoma County for select projects, which is a real limit rather than a polite one. Five or six builds run at a time and Gar is on each site, so distance is a scheduling fact rather than a preference.',
        'In practice that means the work we take here is work worth the drive, and we will say so early if a project is better served by somebody closer.',
      ],
    },
    {
      type: 'places',
      heading: 'Where we build here',
      items: [
        { title: 'Healdsburg', flags: [{ kind: 'input', text: 'No project on record.' }] },
        { title: 'Santa Rosa', flags: [{ kind: 'input', text: 'No project on record.' }] },
        { title: 'Glen Ellen', flags: [{ kind: 'input', text: 'No project on record.' }] },
      ],
      after: [
        'There is permitted work on public record as far west as Bodega Bay, among the 25 permits in the firm’s name.',
      ],
      flags: [
        permissionFlag(
          'The Bodega Bay permit is the only Sonoma County evidence in the entire reference, and nothing is known about the project behind it. Finding out what it was would change this page more than any writing could.',
        ),
      ],
    },
    {
      type: 'offerings',
      heading: 'What we build',
      items: [
        {
          title: 'Custom home building',
          text: 'New homes built from your architect’s drawings, foundation through finish.',
          href: '/services/custom-home-building/',
        },
        {
          title: 'Winery and estate builds',
          text: 'Properties where the house is one building among several.',
          href: '/services/winery-estate-builds/',
        },
        {
          title: 'Remodeling',
          text: 'Houses rebuilt to the studs, and tear-down and rebuild.',
          href: '/services/luxury-home-remodeling/',
        },
        {
          title: 'Cabinetry and millwork',
          text: 'Made in our own shop in St. Helena, which travels.',
          href: '/services/custom-cabinetry/',
        },
      ],
    },
    {
      type: 'prose',
      heading: 'How we work',
      body: [
        shared.architect,
        'A budget is built line by line from completed architectural and engineering drawings, before anything starts on site. There is no estimate form and no automated quote.',
        'Gar is on the job site running the work, and the cabinetry and millwork for the house are made in our own shop rather than ordered in.',
      ],
    },
    {
      type: 'glance',
      rows: [
        { label: 'Towns served', value: 'Healdsburg, Santa Rosa, Glen Ellen, for select projects' },
        { label: 'Based in', value: `${business.street}, ${business.locality}, ${business.region} ${business.postalCode}` },
        { label: 'On record in Sonoma County', value: 'Permitted work as far west as Bodega Bay' },
        { label: 'Active capacity', value: 'Five or six builds at a time, across both counties' },
        {
          label: 'How the number gets built',
          value: 'A line-item budget developed from completed drawings, before work starts on site',
        },
        { label: 'License', value: 'California CSLB 664538, General Building (B)' },
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'Are you taking Sonoma County projects right now?',
          a: [
            'That depends on what is already running. Five or six builds go at a time across both counties, so the honest answer comes from a conversation rather than a page.',
          ],
        },
        {
          q: 'Why would I use a Napa Valley builder here?',
          a: [
            'For the same reasons anyone does: the owner runs the job on site, the cabinetry is made in house, and the build follows the drawings. If proximity matters more to you than those things, a local builder is the better call and we will tell you that.',
          ],
        },
        {
          q: 'Do you work with Sonoma County architects?',
          a: ['Yes. We build from drawings by the architect you retain, wherever they are based.'],
        },
        { q: 'What happens if I get in touch?', a: [shared.firstStep] },
      ],
    },
  ],
  cta: { heading: shared.ctaHeading, text: shared.ctaText },
};
