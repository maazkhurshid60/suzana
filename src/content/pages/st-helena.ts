import { permissionFlag, projects } from '../site';
import type { PageContent } from '../types';

// Copy: "St. Helena location page: copy update (V2)", November 5, 2026.
// St. Helena municipal constraints only. Generic build mechanics belong on the service pages.
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
    image: '/media/photos/hero-st-helena.jpg',
    sub: 'Executing architecturally significant custom homes and estate rebuilds from our headquarters on Charter Oak Avenue.',
    trust: 'Based in St. Helena since 1991.',
    ctas: ['conversation'],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'Building within St. Helena’s municipal and historic fabric',
      body: [
        'Constructing a custom home within St. Helena requires specialized familiarity with the city’s unique municipal standards. Projects in town balance exacting modern architecture with historic preservation guidelines, strict lot coverage limits, protected native oak ordinances, and tight neighborhood setbacks.',
        'Gar Rector & Associates has operated in St. Helena for thirty-five years. Our permanent offices and custom millwork shop sit at 1401 Charter Oak Ave, placing our leadership and shop craftsmen minutes from every active job site in town. We coordinate directly with the City of St. Helena Planning and Building Department to resolve physical site and utility constraints cleanly.',
      ],
    },
    {
      type: 'prose',
      heading: 'St. Helena site realities and municipal coordination',
      subsections: [
        {
          heading: 'Tight in-town setbacks & lot boundaries',
          body: [
            'Residential parcels in St. Helena often leave narrow margins between property boundaries and neighboring historic homes. We stage materials, sequence heavy equipment, and protect mature trees to execute complex framing and concrete pours without disrupting adjacent properties.',
          ],
        },
        {
          heading: 'Historic district review & design compliance',
          body: [
            'When building or rebuilding within St. Helena’s established residential corridors, exterior elevations must meet strict city design standards. We collaborate with client-retained architects to execute approved architectural drawings, ensuring exterior cladding, roof profiles, and window systems satisfy municipal requirements.',
          ],
        },
        {
          heading: 'Minutes from active sites',
          body: [
            'Because our headquarters and millwork facility are in St. Helena, Gar Rector and our project foremen maintain constant presence across town builds. We review site dimensions, coordinate municipal utility tie-ins, and inspect framing details in person every working day.',
          ],
        },
      ],
    },
    {
      type: 'glance',
      heading: 'St. Helena operations',
      rows: [
        { label: 'Office & shop address', value: '1401 Charter Oak Ave, St. Helena, CA 94574.' },
        { label: 'Active capacity', value: 'Five to six active builds at a time across the valley, ensuring direct principal oversight.' },
        { label: 'Core services in town', value: 'Ground-Up Custom Homes, Full Structural Rebuilds, and In-House Custom Millwork.' },
        { label: 'Municipal jurisdiction', value: 'City of St. Helena Planning & Building Department and Napa County PBES.' },
        { label: 'Direct access', value: 'Discuss your drawings and site conditions directly with Gar Rector.' },
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'Featured St. Helena work',
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
        permissionFlag('Live cards held. The revised cards need a title and credits (architect, interior designer, lead foreman) for each project.'),
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'How do you handle City of St. Helena building permit approvals?',
          a: [
            'We review drawing sets against St. Helena municipal codes, tree protection rules, and zoning setbacks during pre-construction, working directly with your architect and city building officials to clear permit reviews cleanly.',
          ],
        },
        {
          q: 'Where is your office and millwork shop located?',
          a: [
            'Our headquarters and custom cabinetry shop are located at 1401 Charter Oak Ave in St. Helena, minutes from local residential building sites.',
          ],
        },
        {
          q: 'Do you build on both in-town lots and hillside parcels around St. Helena?',
          a: [
            // The copy has an em dash here, which the house style rules out. A comma reads the same.
            'Yes. We build throughout the city limits, from tight downtown residential lots along the valley floor to complex hillside estate parcels in the surrounding foothills.',
          ],
        },
        {
          q: 'Who oversees my St. Helena build site day to day?',
          a: [
            'A dedicated lead foreman is stationed on your site every working day, while Gar Rector manages design milestones and visits active St. Helena projects on a daily rotation.',
          ],
        },
      ],
    },
  ],
  cta: {
    heading: 'Start a conversation',
    text: 'If you are planning a custom build or structural rebuild in St. Helena, we welcome the opportunity to review your architectural drawings and site logistics.',
  },
};
