import { permissionFlag, projects } from '../site';
import type { PageContent } from '../types';

// Copy: "Winery and estate builds page: copy update (V2)", November 5, 2026.
export const wineryEstateBuilds: PageContent = {
  path: '/services/winery-estate-builds/',
  meta: {
    title: 'Winery & Estate Builder Napa Valley',
    description:
      'Estate-scale builds in Napa Valley where the house is one building among several. Site work and infrastructure first, built from your architect’s drawings.',
  },
  eyebrow: 'Services',
  hero: {
    h1: 'Winery and estate building in Napa Valley',
    image: '/media/photos/hero-estate-hills.jpg',
    sub: 'Structural execution, timber framing, and estate infrastructure built in direct partnership with architects.',
    trust: 'Building in St. Helena and throughout Napa Valley since 1991.',
    ctas: ['conversation'],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'Structural execution for complex estate footprints',
      body: [
        'Building a multi-structure estate or winery facility requires disciplined trade execution and unified site management. Large-scale properties demand seamless structural coordination across primary residences, guest quarters, timber-framed hospitality barns, and agricultural storage facilities.',
        'Gar Rector & Associates builds in direct partnership with client-retained architects. We execute complex structural drawings without altering design intent. From heavy timber assemblies and board-formed concrete to large-span structural steel, we manage the physical mechanics of the build directly on site.',
      ],
    },
    {
      type: 'image',
      image: { src: '/media/photos/vineyard-hills.jpg', label: 'Rolling vineyard hills in Napa Valley', alt: 'Rolling vineyard hills in Napa Valley' },
    },
    {
      type: 'prose',
      heading: 'How we build',
      body: [
        'Executing an estate footprint requires direct field supervision, specialized trade management, and unified trade sequencing.',
      ],
      subsections: [
        {
          heading: 'Heavy timber and steel framing',
          body: [
            'Estate builds frequently combine heavy timber trusses, exposed structural steel, and architectural concrete. We coordinate these complex structural assemblies on site, ensuring timber joinery aligns cleanly with structural steel frames and poured concrete foundations.',
          ],
        },
        {
          heading: 'Out-of-area architectural collaboration',
          body: [
            'We regularly build from drawings created by national and regional architecture firms. When complex site drawings demand exacting tolerances, Gar works directly alongside the design team to resolve field conditions while safeguarding the visual intent.',
          ],
        },
        {
          heading: 'Integrated in-house custom millwork',
          body: [
            {
              text: 'Multi-structure estates require extensive architectural millwork, paneling, and interior cabinetry. With over thirty years of experience on our shop team, we build custom cabinetry and architectural joinery directly inside our St. Helena workshop, ensuring precise tolerances across every building on the property.',
              links: [{ label: 'Custom Cabinetry', href: '/services/custom-cabinetry/' }],
            },
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
            'Direct collaboration with retained architects. Gar coordinates design and structural milestones; dedicated lead foremen run daily field operations.',
        },
        {
          label: 'Scope of work',
          value:
            'Primary residences, guest houses, agricultural structures, timber framing, site concrete, and in-house custom millwork.',
        },
        {
          label: 'Administrative support',
          value: 'Dedicated office team coordinating project administration, trade contracts, and client billing.',
        },
        {
          label: 'Build duration',
          flags: [{ kind: 'input', text: 'Typical duration range for an estate build, from groundbreaking to occupancy.' }],
        },
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'Selected estate builds',
      items: [
        {
          project: projects['quail-camp'],
          draft: true,
          text: 'Four thousand square feet on raw land, facing south over vineyard. Infrastructure and earthwork first, then the house and a timber frame barn, foundation through finish in under two years.',
        },
      ],
      flags: [
        permissionFlag(
          'Live card held. The revised cards need a title, completion year, square footage and credits for each project, and the Ehlers clearance.',
        ),
      ],
    },
    {
      type: 'prose',
      heading: 'Built on thirty-five years of local presence',
      body: [
        'Gar Rector & Associates has built estate properties throughout Napa Valley since 1991. With a permanent team of 20 to 25 field professionals and an in-house custom millwork shop, we maintain a deliberate scale that allows us to focus entirely on execution quality.',
        'This controlled volume ensures that Gar remains personally engaged on engineering decisions and architect collaboration throughout the build. You work directly with the builder whose name is on the company, backed by dedicated foremen and seasoned trade crews.',
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'How do you coordinate construction across multiple structures on an estate site?',
          a: [
            'We manage site logistics, trade scheduling, and structural sequences under a single unified plan. Gar Rector and our assigned lead foreman supervise field operations daily to keep primary residences, guest quarters, and agricultural builds cleanly aligned.',
          ],
        },
        {
          q: 'Do you manufacture structural timber framing and custom cabinetry in-house?',
          a: [
            'We build all architectural cabinetry, paneling, and interior millwork directly inside our St. Helena shop. For heavy structural timber framing, we source materials and manage layout, joinery, and field erection directly on site.',
          ],
        },
        {
          q: 'Can you collaborate with out-of-area or national architects on estate builds?',
          a: [
            'Yes. We regularly build from drawings created by out-of-area architects. We execute the structural engineering and design details as drawn, offering direct field communication to resolve site conditions without compromising design intent.',
          ],
        },
        {
          q: 'Who is on my estate site day to day?',
          a: [
            'A dedicated lead foreman is stationed on your site every working day to run trade operations and monitor framing tolerances. Gar Rector oversees major build milestones, visits active jobs on rotation, and coordinates engineering decisions directly with you and your architect.',
          ],
        },
      ],
    },
  ],
  cta: {
    heading: 'Start a conversation',
    text: 'If you are planning an estate or agricultural build in Napa Valley or Sonoma County, we welcome the opportunity to review your architectural drawings and site logistics.',
  },
};
