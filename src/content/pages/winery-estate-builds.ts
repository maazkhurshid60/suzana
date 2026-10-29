import { permissionFlag, projects, shared } from '../site';
import type { PageContent } from '../types';

export const wineryEstateBuilds: PageContent = {
  path: '/services/winery-estate-builds/',
  meta: {
    title: 'Winery & Estate Builder Napa Valley',
    description:
      'Estate-scale builds in Napa Valley where the house is one building among several. Site work and infrastructure first, built from your architect’s drawings.',
  },
  eyebrow: 'Services',
  review: [
    {
      kind: 'hold',
      text: 'This is the one page in the set whose positioning runs ahead of its proof. Recommendation: hold this page until a named winery or estate property is cleared (the Ehlers Estate, or a ruling on Erosion Tap Room). If it must ship, the operating-property section is cut, which the public build already does.',
    },
  ],
  hero: {
    h1: 'Winery and estate builds in Napa Valley',
    image: '/media/photos/hero-estate-hills.jpg',
    sub: 'Properties where the house is one building among several, and the ground comes before the framing.',
    ctas: ['conversation'],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'An estate is a site before it is a house',
      body: [
        'On a property of this size, the first year is rarely about the house. It is access, grading, drainage, utilities and the order in which buildings have to go up. A main residence, a guest house, a barn and a pool do not get built in parallel on a hillside, and the sequence is decided long before anyone pours a foundation.',
        'That work does not photograph well and it is most of what separates a build that lands on schedule from one that does not.',
      ],
    },
    {
      type: 'image',
      image: { src: '/media/photos/vineyard-hills.jpg', label: 'Rolling vineyard hills in Napa Valley', alt: 'Rolling vineyard hills in Napa Valley' },
    },
    {
      type: 'prose',
      heading: 'What this usually involves',
      subsections: [
        {
          heading: 'Site work and infrastructure',
          body: [
            {
              draft: true,
              text: 'Raw land needs everything brought to it. At Quail Camp Estate in St. Helena we put in the infrastructure on a blank site and moved enough earth to make it buildable, then built the house and a timber frame barn from foundation through finish in under two years. On Mt. Veeder, the build site sat at the bottom of a narrow sloping driveway and the earthwork came first again.',
            },
          ],
          flags: [
            {
              kind: 'input',
              text: 'Item 13. Did your own crews do the earthwork at Quail Camp and Mt. Veeder, or was it subbed? The answer changes whether this section says “we” or “we coordinate”.',
            },
          ],
        },
        {
          heading: 'More than one building',
          body: [
            'Estate properties carry outbuildings, and they are not an afterthought on the schedule. The Quail Camp barn is a timber frame structure built for gatherings, with the great room of the house leading out to the pool and the vineyard behind it.',
          ],
          flags: [
            {
              kind: 'input',
              text: 'Item 12. Is timber frame a dedicated crew and a standing capability, or occasional work taken as it comes? The old Services page claims the firm specialises in timber frame construction, which appears in no call recording.',
            },
          ],
        },
        {
          heading: 'Working around a property that is already operating',
          reviewOnly: true,
          body: [
            'On a working property, construction has to fit around what is already happening on the land. Harvest does not move for a building schedule.',
          ],
          flags: [
            {
              kind: 'input',
              text: 'This section currently has nothing behind it. Has the firm built on an operating winery property, and can it be named? This is the single input that decides whether this page can exist as positioned. Hidden from the public build until it is answered.',
            },
          ],
        },
        {
          heading: 'Cabinetry and millwork from our own shop',
          body: [
            {
              text: 'The interior finish work on a house this size is a long schedule in its own right. Ours is made in our own shop in St. Helena, which takes one dependency out of the critical path.',
              links: [{ label: 'Custom Cabinetry', href: '/services/custom-cabinetry/' }],
            },
          ],
        },
      ],
    },
    {
      type: 'glance',
      rows: [
        {
          label: 'Who it is for',
          value: 'Owners and architects building estate-scale properties in Napa Valley, and in Sonoma County for select projects',
        },
        { label: 'Where we build', value: shared.whereWeBuild },
        {
          label: 'Scope',
          value:
            'Site work and infrastructure, main residence, outbuildings, timber frame structures, cabinetry and millwork from our own shop',
        },
        { label: 'Active capacity', value: 'Five or six builds at a time. 20 to 25 staff plus subcontractors' },
        { label: 'How the number gets built', value: shared.budget },
        {
          label: 'Timeline',
          flags: [
            { kind: 'input', text: 'Item 4. Quail Camp ran under two years on raw land, which is the only duration on record.' },
          ],
        },
        { label: 'License', value: 'California CSLB 664538, General Building (B)' },
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'Recent work',
      items: [
        {
          project: projects['quail-camp'],
          draft: true,
          text: 'Four thousand square feet on raw land, facing south over vineyard. Infrastructure and earthwork first, then the house and a timber frame barn, foundation through finish in under two years.',
        },
      ],
      flags: [
        permissionFlag(
          'This page can currently name one project, and it is the same project the Custom Home Building page leads with. Two or three more at this scale, with permission, is what makes the page credible.',
        ),
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'Do you build the winery buildings as well as the residence?',
          flags: [
            {
              kind: 'input',
              text: 'Unanswerable from the record. The one winery-adjacent project on file is a 2019 renovation of tap room and brewery spaces, and whether commercial winery work is in scope has been parked rather than decided.',
            },
          ],
        },
        {
          q: 'How do you handle a hillside or exposed site?',
          a: [
            'Exposed sites change what gets built and in what order. Access, grading and drainage come first, and material choices get made against the conditions of that particular site rather than a standard specification. Those decisions sit with your architect and engineer, and we build to what they draw.',
          ],
        },
        {
          q: 'Who is running a build this size day to day?',
          a: [
            'Gar is on the job site running the work, as he is on every build. Five or six projects run at a time, and that limit exists so that stays true on the larger ones.',
          ],
        },
        {
          q: 'How does budgeting work on a project with several buildings?',
          a: [
            'A budget gets built line by line from completed architectural and engineering drawings, before anything starts on site. On a multi-building property that means the number firms up as each structure’s drawings do. We do not quote from a square-foot figure.',
          ],
        },
        {
          q: 'Do you work with the architect we have already retained?',
          a: [
            'Yes, and that is the normal arrangement. We build from your architect’s drawings. We do not sell architectural services and we do not redraw the design.',
          ],
        },
      ],
    },
  ],
  cta: { heading: shared.ctaHeading, text: shared.ctaText },
};
