import { permissionFlag, placeholderPhoto, projects } from '../site';
import type { PageContent } from '../types';

// Copy: "Luxury home remodeling page: copy update (V2)", November 5, 2026.
export const luxuryHomeRemodeling: PageContent = {
  path: '/services/luxury-home-remodeling/',
  meta: {
    title: 'Luxury Home Remodeling Napa Valley',
    description:
      'Whole-house remodels and rebuilds to the studs in Napa Valley, run on site by Gar Rector and built from your architect’s drawings.',
  },
  eyebrow: 'Services',
  hero: {
    h1: 'Luxury home remodeling in Napa Valley',
    image: '/media/photos/hero-remodeling.jpg',
    sub: 'Full structural rebuilds, footprint transformations, and estate modernizations executed in direct partnership with architects.',
    trust: 'Building in St. Helena and throughout Napa Valley since 1991.',
    ctas: ['conversation'],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'Rebuilding within established residential footprints',
      body: [
        'In Napa Valley, unbuilt land is rare. Strict agricultural zoning, hillside slope restrictions, and county parcel boundaries mean that expanding outward is rarely an option. For significant estate properties, a major remodel is almost always a full structural rebuild: taking an existing structure down to the framing or foundation to create an entirely modern home within the legally permitted footprint.',
        'Gar Rector & Associates specializes in these complex transformations. Working directly from architectural drawings, we re-engineer structural loads for open spans, integrate expansive architectural glass, and update building assemblies to strict Wildland-Urban Interface (WUI) standards without sacrificing design intent.',
      ],
    },
    {
      type: 'prose',
      heading: 'How we build',
      body: [
        'A major structural remodel demands continuous collaboration between design coordination, engineering tolerances, and daily trade discipline.',
      ],
      subsections: [
        {
          heading: 'Foundation and structural re-engineering',
          body: [
            'Modern architectural plans often demand open spatial layouts, high ceilings, and floor-to-ceiling glass that original valley structures were never engineered to carry. Gar collaborates directly with your architect and structural engineer to set structural steel frames, underpin foundations, and resolve unexpected framing constraints discovered inside existing walls.',
          ],
        },
        {
          heading: 'Dedicated lead foreman on site',
          body: [
            'Every project is assigned a dedicated lead foreman who remains on the job site every working day. Supported by our St. Helena office team, the lead foreman manages specialized subcontractors, directs demolition and framing crews, enforces clean job-site protocols, and maintains project momentum with quiet discipline.',
          ],
        },
        {
          heading: 'In-house millwork and architectural joinery',
          body: [
            {
              text: 'Deep residential transformations require custom interior alignment across cabinetry, ceiling planes, and wall paneling. Our in-house St. Helena custom millwork shop builds architectural cabinetry, paneling, and interior detail directly for our projects, ensuring exact joinery tolerances and eliminating third-party lead time bottlenecks.',
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
            'Direct collaboration with retained architects. Gar coordinates design and engineering milestones; dedicated lead foremen run daily field operations.',
        },
        {
          label: 'Scope of work',
          value:
            'Full structural rebuilds, foundation underpinning, structural steel retrofit, WUI fire compliance, and in-house custom millwork.',
        },
        {
          label: 'Administrative support',
          value: 'Dedicated office team coordinating project administration, trade contracts, and client billing.',
        },
        {
          label: 'Build duration',
          flags: [{ kind: 'input', text: 'Typical duration range for a structural rebuild, from demolition to occupancy.' }],
        },
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'Selected rebuild projects',
      image: placeholderPhoto(
        'contemporary-stone-house.jpg',
        'Bondi Beach House exterior, full width. Originals needed, the existing gallery is screenshots.',
      ),
      items: [
        {
          project: projects.bondi,
          draft: true,
          text: 'Twenty-seven hundred square feet. A 1970s tract home on a street of them, turned into a contemporary Australian beach house for owners who wanted that and wanted it on a tight budget. Open concept, pool at the back, morning sun on the front and sunset at the pool.',
        },
        {
          project: projects['contemporary-farmhouse'],
          draft: true,
          text: 'Not a remodel in the end. The existing house on the site could not be saved, so it came down and twenty-nine hundred square feet of new construction went up in its place, through City of St. Helena review and PG&E coordination. Architect: Scott Bechtle.',
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
        'Gar Rector & Associates has built and rebuilt residences across Napa Valley since 1991. With a permanent team of 20 to 25 field professionals and our own custom millwork shop, we deliberately cap our active projects at five or six at any given time.',
        'This controlled volume ensures that Gar remains personally engaged on engineering decisions and architect collaboration throughout the build. You work directly with the builder whose name is on the company, backed by dedicated foremen and seasoned trade crews.',
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'What is the difference between a remodel and a full rebuild in Napa Valley?',
          a: [
            'Because buildable land is scarce, high-end remodels in Napa Valley typically involve stripping a home to its foundation or framing, re-engineering structural loads, and completely rebuilding the residence within the grandfathered footprint to meet modern architectural standards and county building codes.',
          ],
        },
        {
          q: 'Do you take on small cosmetic remodels or single-room updates?',
          a: [
            'We focus exclusively on full-structure rebuilds, major architectural modernizations, and deep estate transformations built directly from formal architectural and engineering drawings.',
          ],
        },
        {
          q: 'Who oversees my remodel job site day to day?',
          a: [
            'A dedicated lead foreman is stationed on your site every working day to direct subcontractors and enforce framing tolerances. Gar Rector oversees structural milestones, visits active projects on rotation, and coordinates engineering solutions directly with your architect.',
          ],
        },
        {
          q: 'How do you handle initial project budgeting on a complex rebuild?',
          a: [
            'Budgets are developed through line-item estimates derived from completed architectural and structural engineering drawings. This establishes defined scopes and cost transparency before demolition begins.',
          ],
        },
      ],
    },
  ],
  cta: {
    heading: 'Start a conversation',
    text: 'If you are planning a structural rebuild or deep residential transformation in Napa Valley or Sonoma County, we welcome the opportunity to review your architectural drawings and site conditions.',
  },
};
