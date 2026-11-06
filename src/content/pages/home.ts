import { permissionFlag, projects } from '../site';
import type { PageContent } from '../types';

// Copy: "Homepage: copy update (V2)", November 5, 2026.
export const home: PageContent = {
  path: '/',
  meta: {
    title: 'Gar Rector & Associates | Custom Home Builder & General Contractor, Napa Valley',
    description:
      'Gar Rector & Associates builds high-end custom homes in Napa Valley and Sonoma County from your architect’s drawings. Office and cabinet shop in St. Helena.',
  },
  hero: {
    h1: 'Custom homes and estates built directly from architectural drawings',
    sub: 'Gar Rector & Associates builds high-end custom residences across Napa Valley. We take on five or six homes at a time so that Gar Rector remains directly engaged on your project.',
    trust: 'Building in St. Helena and Napa Valley since 1991.',
    ctas: ['conversation', 'work'],
    workHref: '#recent-work',
  },
  blocks: [
    {
      type: 'prose',
      heading: 'A collaborative approach to architectural construction',
      body: [
        'Building an architecturally complex custom residence requires continuous alignment between the drawings, the field engineering, and the trades on site. From our offices in St. Helena, Gar Rector & Associates works in direct partnership with independent architecture firms and estate owners throughout Napa Valley.',
        'Gar coordinates structural problem-solving and design decisions directly with project architects, while our dedicated lead foremen direct daily site operations. We do not alter design intent. Our role is to navigate the physical constraints of the site and execute the drawings with structural discipline.',
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
      flags: [
        permissionFlag(
          'Live tiles held. The revised tiles need the project titles and architect names, and each links to a /work/ page that is not built yet.',
        ),
      ],
    },
    {
      type: 'offerings',
      heading: 'What we build',
      items: [
        {
          title: 'Custom Home Building',
          text: 'Ground-up residential construction for complex hillside and valley parcels, executed with strict drawing fidelity.',
          href: '/services/custom-home-building/',
        },
        {
          title: 'Luxury Home Remodeling',
          text: 'Full structural rebuilds, foundation re-engineering, and deep estate modernizations within existing zoning footprints.',
          href: '/services/luxury-home-remodeling/',
        },
        {
          title: 'Winery & Estate Builds',
          text: 'Multi-structure estate footprints, heavy timber framing, hospitality barns, and agricultural infrastructure coordination.',
          href: '/services/winery-estate-builds/',
        },
        {
          title: 'In-House Custom Millwork',
          text: 'Architectural cabinetry, wall paneling, and custom joinery built inside our own St. Helena workshop.',
          href: '/services/custom-cabinetry/',
        },
      ],
    },
    {
      type: 'prose',
      heading: 'Thirty-five years of building in Napa Valley',
      body: [
        'Gar Rector & Associates has built throughout Napa Valley since 1991. Supported by a permanent field crew of 20 to 25 tradespeople and our St. Helena custom millwork shop, we maintain a deliberate capacity cap of five to six active builds at any time.',
        'Managing five or six projects simultaneously gives our team the scale to secure top trade partners while ensuring that Gar personally visits active sites, reviews framing lines, and stays accessible to every architect and estate owner.',
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'Do you design houses, or do you build from an architect’s plans?',
          a: [
            'We build strictly from drawings prepared by your retained architect. Our focus is executing architectural drawings with structural precision, managing trades, and coordinating site logistics.',
          ],
        },
        {
          q: 'Who is actually running my project day to day?',
          a: [
            'A dedicated lead foreman is assigned exclusively to your site every working day. Gar Rector oversees design milestones, visits active jobs on rotation, and coordinates directly with you and your architect.',
          ],
        },
        {
          q: 'Where do you build?',
          a: [
            'We build throughout Napa Valley, including St. Helena, Napa, Yountville, Oakville, Rutherford, and Calistoga. We also accept select custom residential projects in Sonoma County.',
          ],
        },
        {
          q: 'Why do you limit your capacity to five or six active builds?',
          a: [
            'Because a bespoke, high-touch building experience cannot be delivered at scale. Limiting our project load ensures that Gar personally supervises structural details and remains directly accessible to every client.',
          ],
        },
      ],
    },
  ],
  cta: {
    heading: 'Start a conversation',
    text: 'Discuss your architectural drawings and site conditions directly with Gar Rector.',
  },
};
