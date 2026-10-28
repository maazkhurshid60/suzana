import { business, permissionFlag, projects, shared } from '../site';
import type { PageContent } from '../types';

export const stHelena: PageContent = {
  path: '/st-helena-custom-home-builder/',
  meta: {
    title: 'Custom Home Builder St. Helena CA',
    description:
      'Custom home builder based on Charter Oak Avenue in St. Helena, with our office and cabinet shop in town. Quail Camp Estate, Contemporary Farmhouse and Bondi Beach House.',
  },
  eyebrow: 'Areas',
  review: [
    {
      kind: 'hold',
      text: 'Yelp currently shows the business as CLOSED. That fix comes before this page is worth publishing. A location page pointing at a profile that says closed is worse than no location page.',
    },
  ],
  hero: {
    h1: 'Custom home builder in St. Helena',
    sub: 'The office and the cabinet shop are on Charter Oak Avenue. Most of what we have built recently is within a few minutes of them.',
    ctas: ['conversation', 'work'],
    workHref: '#recent-work',
  },
  blocks: [
    {
      type: 'prose',
      heading: 'We are based here',
      body: [
        'Gar Rector & Associates works out of Charter Oak Avenue in St. Helena, and the cabinet shop is here too. That is not a sales point so much as the reason the arrangement works. Gar is on the job site running the work across five or six builds at a time, and in a town this size that means the drive between two of them is a few minutes.',
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'What we have built in St. Helena',
      items: [
        {
          project: projects['quail-camp'],
          draft: true,
          text: 'Four thousand square feet on raw land off a side road in the heart of town, facing south over vineyard. The infrastructure and the earthwork went in first, then the house and a timber frame barn, foundation through finish in under two years, through COVID. The great room opens to the pool and the barn was built for gatherings.',
        },
        {
          project: projects['contemporary-farmhouse'],
          draft: true,
          text: 'Twenty-nine hundred square feet of new construction on Sylvaner, a tear-down two minutes from town, taken through City of St. Helena review and PG&E coordination. Vaulted ceilings, open plan, a pool at the back and a fence line that makes a lot in town feel a long way from it. Architect: Scott Bechtle.',
        },
        {
          project: projects.bondi,
          draft: true,
          text: 'Twenty-seven hundred square feet on Sylvaner. A 1970s tract home turned into a contemporary Australian beach house, on a tight budget, for owners who knew exactly what they wanted.',
        },
      ],
      flags: [
        permissionFlag('Written permission for all three. This page names more projects than any other and is correspondingly the most blocked.'),
        {
          kind: 'decision',
          text: 'Whether street names publish at all. House numbers do not, per the image rule. Street names alone still narrow a house down in a town this size, and “Sylvaner Residence” already appears on the current placeholder homepage. The copy can drop to “in town” and “a few streets apart” with no loss.',
        },
      ],
    },
    {
      type: 'prose',
      heading: 'Building inside the city',
      body: [
        'Work inside St. Helena runs on a different set of constraints from work on open land. Lots are tight, neighbours are close, and the review and utility paths take the time they take. The Contemporary Farmhouse went through City of St. Helena review and PG&E coordination, and that sequencing is a real part of the schedule rather than a formality at the start of it.',
      ],
      flags: [
        {
          kind: 'input',
          text: 'Item 4. This section is thin and it is the most useful section on the page. What the firm has learned about the St. Helena permit path, in Gar’s or Michael’s words, would be worth more here than anything else that could be added.',
        },
      ],
    },
    {
      type: 'offerings',
      heading: 'What we build',
      items: [
        { title: 'Custom home building', href: '/services/custom-home-building/' },
        { title: 'Winery and estate builds', href: '/services/winery-estate-builds/' },
        { title: 'Remodeling', href: '/services/luxury-home-remodeling/' },
        { title: 'Cabinetry and millwork', text: 'Made here in St. Helena.', href: '/services/custom-cabinetry/' },
      ],
    },
    {
      type: 'glance',
      rows: [
        { label: 'Address', value: `${business.street}, ${business.locality}, ${business.region} ${business.postalCode}` },
        { label: 'Phone', value: business.phone },
        { label: 'Hours', value: `${business.hours}. ${business.weekends}` },
        { label: 'The shop', value: 'Cabinetry and millwork, three people, in St. Helena' },
        { label: 'Recent builds here', value: 'Quail Camp Estate, Contemporary Farmhouse, Bondi Beach House' },
        {
          label: 'Also serving',
          value: 'Napa, Yountville, Calistoga, Oakville, Rutherford, and Sonoma County for select projects',
        },
        { label: 'License', value: 'California CSLB 664538, General Building (B)' },
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'Can I come and see the cabinet shop?',
          flags: [
            {
              kind: 'input',
              text: 'Items 3 and 10. This is the obvious question for a local page and nobody has ruled on it. A yes is a genuinely strong answer for a buyer deciding between builders.',
            },
          ],
        },
        {
          q: 'Do you build outside St. Helena?',
          a: [
            {
              text: 'Yes, across Napa Valley and into Sonoma County for select projects.',
              links: [
                { label: 'Napa Valley', href: '/napa-valley-custom-home-builder/' },
                { label: 'Sonoma County', href: '/sonoma-county-custom-home-builder/' },
              ],
            },
          ],
        },
        { q: 'How much of your work is referral?', a: ['About ninety percent of it.'] },
        { q: 'What happens if I get in touch?', a: [shared.firstStep] },
      ],
    },
  ],
  cta: { heading: shared.ctaHeading, text: shared.ctaText },
};
