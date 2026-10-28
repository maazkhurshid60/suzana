import { areas, permissionFlag, projects, shared } from '../site';
import type { PageContent } from '../types';

export const home: PageContent = {
  path: '/',
  meta: {
    title: 'Gar Rector & Associates | Custom Home Builder & General Contractor, Napa Valley',
    description:
      'Gar Rector & Associates builds high-end custom homes in Napa Valley and Sonoma County from your architect’s drawings. Office and cabinet shop in St. Helena.',
  },
  hero: {
    h1: 'A Napa Valley builder, on site',
    sub: 'Gar Rector & Associates builds high-end custom homes in Napa Valley and Sonoma County, from the drawings your architect gives us.',
    ctas: ['conversation', 'work'],
    workHref: '#recent-work',
  },
  blocks: [
    {
      type: 'prose',
      heading: 'What people are usually deciding',
      body: [
        'Most people who get in touch already have a site and an architect. The question in front of them is who runs the job from there, and whether the person they meet first will be the person on the site a year later.',
        'Gar Rector is on the job site running the work. That is the whole arrangement, and it is why about ninety percent of the work comes by referral.',
      ],
    },
    {
      type: 'offerings',
      heading: 'What we build',
      items: [
        {
          title: 'Custom home building',
          text: 'Full-structure new homes built from your architect’s drawings, foundation through finish.',
          href: '/services/custom-home-building/',
        },
        {
          title: 'Winery and estate builds',
          text: 'Larger properties where the house is one building among several, and the site work is most of the first year.',
          href: '/services/winery-estate-builds/',
        },
        {
          title: 'Remodeling',
          text: 'Houses rebuilt to the studs on lots that already exist, which in this valley is most of what is left to build.',
          href: '/services/luxury-home-remodeling/',
        },
        {
          title: 'Cabinetry and millwork',
          text: 'Made in our own shop in St. Helena, on our own schedule.',
          href: '/services/custom-cabinetry/',
        },
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'Recent work',
      items: [
        {
          project: projects['quail-camp'],
          text: 'Four thousand square feet on raw land, with a timber frame barn, finished in under two years.',
        },
        {
          project: projects['contemporary-farmhouse'],
          text: 'Twenty-nine hundred square feet on a tear-down site two minutes from town.',
        },
        {
          project: projects['mt-veeder'],
          text: 'Twenty-nine hundred square feet on a hillside, down a narrow sloping driveway.',
        },
      ],
      cta: { label: 'See the work', href: '/services/custom-home-building/#recent-work' },
      flags: [permissionFlag('Written permission for each project named above. Nothing in this block publishes without it.')],
    },
    {
      type: 'prose',
      heading: 'How we work',
      body: [
        `${shared.architect} Where a detail is hard to build, we work it out with the design team rather than around them.`,
        'A budget is built line by line from completed architectural and engineering drawings, before anything starts on site. There is no estimate form and no automated quote.',
        'Five or six builds run at a time, with 20 to 25 staff plus subcontractors, three of them in the cabinet shop. That number is deliberate. The aim has never been more houses.',
      ],
    },
    {
      type: 'prose',
      heading: 'Where we build',
      body: [
        {
          text: 'St. Helena, Napa, Yountville, Calistoga, Oakville and Rutherford across Napa Valley. Healdsburg, Santa Rosa and Glen Ellen in Sonoma County for select projects.',
          links: areas,
        },
      ],
    },
  ],
  cta: { heading: shared.ctaHeading, text: shared.ctaText },
};
