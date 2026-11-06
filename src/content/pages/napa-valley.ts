import { permissionFlag, projects } from '../site';
import type { PageContent } from '../types';

// Copy: "Napa Valley location page: copy update (V2)", November 5, 2026.
// Regional building constraints only. Service build mechanics and the shop belong on the service pages.
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
    sub: 'Executing complex residential architecture across St. Helena, Yountville, Oakville, Rutherford, Calistoga, and Napa.',
    trust: 'Building throughout Napa Valley since 1991.',
    ctas: ['conversation'],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'Local building realities across Napa Valley',
      body: [
        'Building a custom residence in Napa Valley requires navigating rigorous geographical, environmental, and municipal constraints. Success on these sites demands practical familiarity with local soils, drainage basins, microclimates, and regional building departments.',
        'Gar Rector & Associates brings thirty-five years of hands-on local experience to valley building sites. We understand how Napa County Agricultural Preserve regulations restrict residential footprints, how steep hillside parcels require deep pier foundations, and how Chapter 7A fire codes dictate exterior envelope assemblies. We resolve these local conditions directly on site alongside your design team.',
      ],
    },
    {
      type: 'image',
      image: {
        src: '/media/photos/napa-valley-floor.jpg',
        label: 'Vineyard rows on the Napa Valley floor, with the hills behind',
        alt: 'Vineyard rows on the Napa Valley floor, with the hills behind',
      },
    },
    {
      type: 'prose',
      heading: 'Serving communities throughout Napa Valley',
      body: ['From our headquarters in St. Helena, we manage active custom builds across every major jurisdiction in the valley.'],
      subsections: [
        {
          heading: 'Valley floor towns & estate parcels',
          body: [
            'We build across St. Helena, Napa, Yountville, Oakville, Rutherford, and Calistoga. Whether managing tight municipal setbacks and historic preservation guidelines in town or coordinating expansive residential estates bounded by active vineyards, we orchestrate site logistics, utility connections, and material staging to maintain smooth construction progress.',
          ],
        },
        {
          heading: 'Hillside foundations & agricultural terrain',
          body: [
            'Building along the Mayacamas or Vaca mountain ranges requires specialized structural engineering. We execute complex drilled-pier foundations, grade beams, and extensive concrete retaining walls to secure residences to steep topography. On agricultural parcels, we coordinate build envelopes to strictly honor farm easements, root-zone protections, and groundwater management guidelines.',
          ],
        },
        {
          heading: 'Napa County WUI Chapter 7A fire compliance',
          body: [
            'Napa County enforces rigorous Wildland-Urban Interface (WUI) standards. We build with non-combustible cladding, fire-rated roof assemblies, specialized ember-resistant venting, structural steel, and dual-pane tempered glass. Our continuous working relationship with Napa County Planning, Building & Environmental Services keeps local inspections running smoothly.',
          ],
        },
      ],
    },
    {
      type: 'glance',
      heading: 'Regional operations',
      rows: [
        {
          label: 'Primary towns served',
          value: 'St. Helena, Napa, Yountville, Calistoga, Oakville, and Rutherford. Select projects in Sonoma County.',
        },
        { label: 'Local headquarters', value: '1401 Charter Oak Ave, St. Helena, CA 94574.' },
        {
          label: 'Active valley capacity',
          value: 'Five to six active builds at a time across the valley, protecting personal oversight on every site.',
        },
        {
          label: 'Core services',
          value:
            'Custom Home Building, Luxury Home Remodeling (Structural Rebuilds), Winery & Estate Builds, and In-House Custom Millwork.',
        },
        { label: 'Direct access', value: 'Discuss your drawings and site conditions directly with Gar Rector.' },
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'Featured Napa Valley work',
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
      flags: [
        permissionFlag(
          'Live cards held. The revised cards need a title and credits (architect, interior designer, lead foreman) for each project.',
        ),
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'What is your service coverage within Napa Valley?',
          a: [
            'We build throughout Napa Valley, including St. Helena, Napa, Yountville, Oakville, Rutherford, and Calistoga. We also accept select custom residential projects in Sonoma County, including Healdsburg, Santa Rosa, and Glen Ellen.',
          ],
        },
        {
          q: 'How do you handle Napa County zoning and building permit processes?',
          a: [
            'We review architectural drawing sets against local Napa County building, environmental health, and agricultural preserve regulations during pre-construction. We work directly with your architect and local county inspectors to navigate approvals cleanly.',
          ],
        },
        {
          q: 'What experience do you have building in designated WUI fire zones?',
          a: [
            'We have built on hillside and rural parcels designated as high-fire zones for thirty-five years. We routinely execute structural steel framing, fire-resistant exterior cladding, ember-resistant venting, and fire-rated assemblies required under California Chapter 7A codes.',
          ],
        },
        {
          q: 'How do initial site evaluations and project discussions work?',
          a: [
            'Gar Rector meets directly with property owners and architects on-site to evaluate parcel topography, solar exposure, access roads, utilities, and preliminary architectural drawings before formal estimation begins.',
          ],
        },
      ],
    },
  ],
  cta: {
    heading: 'Start a conversation',
    text: 'If you are planning a custom residence or estate build in Napa Valley, we welcome the opportunity to review your architectural drawings and site conditions.',
  },
};
