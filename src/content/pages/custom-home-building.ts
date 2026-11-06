import { permissionFlag, placeholderPhoto, projects } from '../site';
import type { PageContent } from '../types';

// Copy: "Custom home building page: copy update (V2)", November 5, 2026.
export const customHomeBuilding: PageContent = {
  path: '/services/custom-home-building/',
  meta: {
    title: 'Custom Home Builder Napa Valley | General Contractor',
    description:
      'High-end custom homes in Napa Valley built from your architect’s drawings, run on site by Gar Rector. Cabinetry and millwork from our own St. Helena shop.',
  },
  eyebrow: 'Services',
  hero: {
    h1: 'Custom home building in Napa Valley',
    image: '/media/photos/hero-custom-home.jpg',
    sub: 'Residential construction executed in direct collaboration with architects and estate owners.',
    trust: 'Building in St. Helena and throughout Napa Valley since 1991.',
    ctas: ['conversation'],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'Construction grounded in architectural drawings',
      body: [
        'In Napa Valley, unbuilt land is rare. Most ground-up residential builds require tearing down an existing structure or navigating severe hillside topography, strict agricultural boundaries, and tight setbacks. These parcels demand a builder who understands how to execute drawings without compromising details or improvising in the field.',
        'Gar Rector & Associates builds in direct partnership with independent architecture firms and property owners. Our role is never to alter the design intent, but to navigate the physical constraints of the site and construct the home precisely as drawn. We deliberately limit our capacity to five or six active builds, ensuring every foundation, steel frame, and custom assembly receives the focus and technical oversight it demands.',
      ],
    },
    {
      type: 'prose',
      heading: 'How we build',
      body: [
        'A successful build requires a disciplined division of responsibility between design coordination, site logistics, and daily field execution.',
      ],
      subsections: [
        {
          heading: 'Early architectural collaboration',
          body: [
            'We review drawing sets alongside client-retained architects early in the process to evaluate structural tolerances, site logistics, and trade sequencing. When complex site conditions or engineering interfaces present unexpected challenges, Gar works directly with the design team to develop practical field solutions that protect the architecture’s visual lines and spatial flow.',
          ],
        },
        {
          heading: 'Principal oversight on design decisions',
          body: [
            'Gar Rector manages design coordination, trade partner selection, and key structural milestones. Rather than handing a project off to a junior manager, Gar stays actively involved on site, reviewing framing lines, structural steel connections, and finish interfaces alongside the design team. When strategic decisions or plan adjustments arise, architects and owners work directly with Gar.',
          ],
        },
        {
          heading: 'Dedicated lead foremen on site',
          body: [
            'Every project is assigned a dedicated lead foreman who remains on the job site every working day from ground-breaking through the final punch list. Supported by our St. Helena office staff, the lead foreman directs specialized trade crews, enforces site standards, and maintains the build sequence so work moves forward with quiet discipline.',
          ],
        },
      ],
    },
    {
      type: 'glance',
      heading: 'Project operations',
      rows: [
        {
          label: 'Locations served',
          value: 'St. Helena, Napa, Yountville, Calistoga, Oakville, and Rutherford. Select projects in Sonoma County.',
        },
        { label: 'Active capacity', value: 'Five to six active builds at a time, protecting personal oversight across every site.' },
        {
          label: 'Working arrangement',
          value:
            'Direct collaboration with retained architects. Gar oversees design and structural milestones; dedicated lead foremen run daily field operations.',
        },
        {
          label: 'Scope of work',
          value:
            'Ground-up custom residences, complex hillside foundations, structural steel, timber framing, and complete site coordination.',
        },
        {
          label: 'Administrative support',
          value: 'Dedicated office team coordinating project administration, trade contracts, and client billing.',
        },
        {
          label: 'Build duration',
          flags: [{ kind: 'input', text: 'Typical duration range from groundbreaking to occupancy.' }],
        },
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'Selected custom residences',
      image: placeholderPhoto('vineyard-estate.jpg', 'Quail Camp aerial with the vineyard rows, full width'),
      items: [
        {
          project: projects['quail-camp'],
          draft: true,
          text: 'Four thousand square feet on raw land in the heart of St. Helena, facing south over vineyard. We put in the infrastructure and the earthwork that made the site buildable, then built the house and a timber frame barn from foundation through finish in under two years, through COVID. The great room leads to the pool, and the barn is built for parties.',
        },
        {
          project: projects['contemporary-farmhouse'],
          draft: true,
          text: 'Twenty-nine hundred square feet of new construction on a tear-down site two minutes from town, built through City of St. Helena review and PG&E coordination. Vaulted ceilings, open plan, great room and kitchen leading to the pool, and a fence line that makes it feel a long way from the street. Architect: Scott Bechtle.',
        },
        {
          project: projects['mt-veeder'],
          draft: true,
          text: 'Twenty-nine hundred square feet on a hillside, down a narrow sloping driveway, with enough earthwork to make the site buildable before anything got framed. East-facing, with morning sun on the pergola.',
        },
      ],
      flags: [
        permissionFlag(
          'Live cards held. The revised cards need a title, completion year, square footage and credits (architect, interior designer, lead foreman) for each project.',
        ),
      ],
    },
    {
      type: 'prose',
      heading: 'Built on thirty-five years of local presence',
      body: [
        'Gar Rector & Associates has built custom residences throughout Napa Valley since 1991. With a permanent field crew of 20 to 25 tradespeople, we maintain a deliberate scale that allows us to focus entirely on the quality and execution of our projects rather than increasing volume.',
        'This controlled capacity ensures that Gar remains personally engaged on design details and architect communication throughout construction. You work directly with the builder whose name is on the company, backed by seasoned trade crews who understand custom architectural tolerances.',
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'Do you provide architectural design, or do you build from an architect’s plans?',
          a: [
            'We build strictly from drawings prepared by your retained architect. Our focus is executing the design with structural discipline, coordinating specialized trades, and managing site logistics alongside the design team.',
          ],
        },
        {
          q: 'Who manages my job site day to day?',
          a: [
            'A dedicated lead foreman is stationed on your site every working day to run trade operations and monitor framing tolerances. Gar Rector oversees major build milestones, visits active jobs on a regular rotation, and handles all structural and design coordination directly with you and your architect.',
          ],
        },
        {
          q: 'How do you handle initial project budgeting?',
          a: [
            'Budgets are developed through line-item estimates derived from completed architectural and structural drawings. This establishes defined scopes and cost transparency before breaking ground.',
          ],
        },
        {
          q: 'Why do you limit your active capacity to five or six builds?',
          a: [
            'Limiting our active work is a deliberate decision. It ensures that Gar personally stays involved in design decisions and that our field foremen and office staff have the focus needed to maintain exacting quality across every project.',
          ],
        },
      ],
    },
    { type: 'image', image: placeholderPhoto('vaulted-timber-interior.jpg', 'Interior frame from Contemporary Farmhouse') },
  ],
  cta: {
    heading: 'Start a conversation',
    text: 'If you are planning a custom build in Napa Valley or Sonoma County, we welcome the opportunity to review your architectural drawings and site conditions.',
  },
};
