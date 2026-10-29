import { business, permissionFlag, shared } from '../site';
import type { PageContent } from '../types';

export const napaValley: PageContent = {
  path: '/napa-valley-custom-home-builder/',
  meta: {
    title: 'Custom Home Builder Napa Valley | Luxury Home Builder Napa CA',
    description:
      'High-end custom home builder in Napa Valley, building in St. Helena, Napa, Yountville, Calistoga, Oakville and Rutherford. 25 permitted projects on public record.',
  },
  eyebrow: 'Areas',
  hero: {
    h1: 'Custom home builder in Napa Valley',
    image: '/media/photos/hero-napa-valley.jpg',
    sub: 'Gar Rector & Associates builds in St. Helena, Napa, Yountville, Calistoga, Oakville and Rutherford, with 25 permitted projects on public record.',
    ctas: ['conversation', 'work'],
    workHref: '#recent-work',
  },
  blocks: [
    {
      type: 'prose',
      heading: 'Where we work in the valley',
      body: [
        {
          text: 'The shop and the office are on Charter Oak Avenue in St. Helena, and most of our work sits within a short drive of it. St. Helena, Napa, Yountville, Calistoga, Oakville and Rutherford. Sonoma County for select projects.',
          links: [{ label: 'Sonoma County', href: '/sonoma-county-custom-home-builder/' }],
        },
        'Being close matters more than it sounds. Gar is on the job site running the work, across five or six builds at a time, and that is a different proposition when the sites are twenty minutes apart than when they are not.',
      ],
    },
    {
      type: 'image',
      image: { src: '/media/photos/napa-valley-floor.jpg', label: 'Vineyard rows on the Napa Valley floor, with the hills behind', alt: 'Vineyard rows on the Napa Valley floor, with the hills behind' },
    },
    {
      type: 'prose',
      id: 'recent-work',
      heading: 'What building here actually involves',
      subsections: [
        {
          heading: 'The site usually decides the first year',
          body: [
            {
              draft: true,
              text: 'The builds we take on tend to sit on ground that needs work before it will take a house. At Quail Camp Estate in St. Helena, a blank site on raw land, all the infrastructure went in and enough earth moved to make it buildable before the foundation. On Mt. Veeder Road in Napa, the build site is at the bottom of a narrow sloping driveway on a hillside, and the earthwork came first there too.',
            },
          ],
        },
        {
          heading: 'In town is its own problem',
          body: [
            {
              draft: true,
              text: 'Inside city limits the constraints change. The Contemporary Farmhouse on Sylvaner Avenue in St. Helena was a tear-down two minutes from town, built through City of St. Helena review and PG&E coordination, on a lot with neighbours on every side. The house that came out of it feels secluded, which was the point.',
            },
          ],
        },
        {
          heading: 'Most of what is left is rebuilding',
          body: [
            {
              draft: true,
              text: 'A good deal of the work in the valley now starts with a house that already exists on a lot worth having. Bondi Beach House on Sylvaner was a 1970s tract home that became a contemporary Australian beach house.',
              links: [{ label: 'Luxury Home Remodeling', href: '/services/luxury-home-remodeling/' }],
            },
          ],
        },
      ],
      flags: [
        permissionFlag('Written permission for all four projects named on this page.'),
        {
          kind: 'decision',
          text: 'Whether street names publish at all (Mt. Veeder Road, Sylvaner Avenue). See the same decision on the St. Helena page.',
        },
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
          text: 'Houses rebuilt to the studs, and tear-down and rebuild where the existing house is not worth keeping.',
          href: '/services/luxury-home-remodeling/',
        },
        {
          title: 'Cabinetry and millwork',
          text: 'Made in our own shop in St. Helena.',
          href: '/services/custom-cabinetry/',
        },
      ],
    },
    {
      type: 'places',
      heading: 'Towns',
      items: [
        {
          title: 'St. Helena',
          text: 'Where the office and the cabinet shop are, and where most of our recent work has been.',
          link: { label: 'St. Helena', href: '/st-helena-custom-home-builder/' },
        },
        { title: 'Napa', text: 'Hillside builds on the western slopes, including Mt. Veeder.' },
        {
          title: 'Yountville, Oakville and Rutherford',
          text: 'Smaller towns along the valley floor, mostly estate properties and rebuilds on existing lots.',
        },
        { title: 'Calistoga', text: 'The north end of the valley.' },
      ],
      flags: [
        {
          kind: 'input',
          text: 'Yountville, Calistoga, Oakville and Rutherford have no project on record between them. Each entry says only what can be said. One named build in any of these towns would do more for this page than another paragraph.',
        },
      ],
    },
    {
      type: 'glance',
      rows: [
        { label: 'Based in', value: `${business.street}, ${business.locality}, ${business.region} ${business.postalCode}` },
        { label: 'Towns served', value: 'St. Helena, Napa, Yountville, Calistoga, Oakville, Rutherford' },
        { label: 'Also serving', value: 'Healdsburg, Santa Rosa and Glen Ellen in Sonoma County, for select projects' },
        { label: 'On record', value: '25 permitted projects' },
        {
          label: 'Active capacity',
          value: 'Five or six builds at a time. 20 to 25 staff plus subcontractors, three in the cabinet shop',
        },
        { label: 'License', value: 'California CSLB 664538, General Building (B)' },
        { label: 'Hours', value: `${business.hours}. ${business.weekends}` },
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'Do you build outside Napa County?',
          a: [
            'Yes, for select projects, mostly in Sonoma County around Healdsburg, Santa Rosa and Glen Ellen. There is also permitted work on record as far out as Bodega Bay.',
          ],
        },
        {
          q: 'How many projects do you run at once?',
          a: ['Five or six. That number is a choice rather than a ceiling, and it exists so Gar can be on each site.'],
        },
        {
          q: 'Do you work with architects from outside the valley?',
          a: ['Yes. We build from drawings by the architect you retain, wherever they are based.'],
          flags: [
            {
              kind: 'input',
              text: 'Item 16. The architect relationship list, and permission to name two or three. Naming local firms would make this answer worth reading.',
            },
          ],
        },
        { q: 'What happens if I get in touch?', a: [shared.firstStep] },
      ],
    },
  ],
  cta: { heading: shared.ctaHeading, text: shared.ctaText },
};
