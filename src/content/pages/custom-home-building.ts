import { permissionFlag, placeholderPhoto, projects, shared, testimonialFlag } from '../site';
import type { PageContent } from '../types';

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
    sub: 'High-end homes built from your architect’s drawings, run day to day by the builder whose name is on them.',
    trust:
      'Gar Rector & Associates has built in Napa Valley for more than thirty years, with 25 permitted projects on public record.',
    ctas: ['conversation'],
    flags: [
      {
        kind: 'input',
        text: 'Item 14. No “since” line goes in the hero until item 14 closes. Four sources give four answers.',
      },
    ],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'You have the drawings. The question is who builds them.',
      body: [
        'Most people who get in touch already have a site and an architect. What they are deciding is who runs the job from there.',
        'Three things are usually on their mind. Whether the person they meet first is the person who will be on site. Whether a drawing that is difficult to build gets built, or gets quietly simplified in the field. Whether the cabinetry and millwork arrive on a schedule somebody else controls.',
        'Gar Rector & Associates is set up so the answer to all three is the same. Gar runs the work. We build what the architect drew. The cabinetry is made in our own shop in St. Helena.',
      ],
    },
    {
      type: 'prose',
      heading: 'How we build',
      body: [
        'Every job comes down to who is on the site, how closely the build follows the drawings, and who makes the finish work.',
      ],
      subsections: [
        {
          heading: 'Gar runs the job',
          body: [
            'Gar Rector is on the job site running the work. The person you meet first is the person running your build, from groundbreaking through the final walkthrough. Five or six builds run at a time, which is the number that keeps that true.',
          ],
          flags: [
            {
              kind: 'input',
              text: 'Item 2. What a normal week looks like across live sites, and who the client and architect call when Gar is off site. This is the central claim of the brand and it currently has no operational detail behind it.',
            },
          ],
        },
        {
          heading: 'We build from your architect’s drawings',
          body: [
            `${shared.architect} Where a detail is hard to build, we work it out with the design team rather than around them.`,
            'That covers the awkward parts as well as the straightforward ones. A hillside site with a narrow approach, a tear-down inside city limits, a utility connection that sets the schedule: the drawings stay the architect’s, and the site conditions are ours to solve.',
          ],
        },
        {
          heading: 'Cabinetry and millwork from our own shop',
          body: [
            {
              text: 'Cabinetry, paneling and millwork are built in our own shop in St. Helena, by a three-person team led by a cabinetmaker with roughly thirty years at the bench. Gar bought the tools and built the shop out so the finish work runs on our schedule. One company, one standard, one calendar.',
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
          value: 'Owners and architects building high-end homes in Napa Valley, and in Sonoma County for select projects',
        },
        { label: 'Where we build', value: shared.whereWeBuild },
        {
          label: 'Active capacity',
          value: 'Five or six builds at a time. 20 to 25 staff plus subcontractors, three of them in the cabinet shop',
        },
        {
          label: 'Scope',
          value:
            'Full-structure residential construction, site work and infrastructure, coordination with your architect and engineer, cabinetry and millwork from our own shop',
        },
        { label: 'How the number gets built', value: shared.budget },
        {
          label: 'Timeline',
          flags: [{ kind: 'input', text: 'Item 4. Typical duration, first conversation to final walkthrough.' }],
        },
        { label: 'License', value: 'California CSLB 664538, General Building (B)' },
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'Recent work',
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
        permissionFlag('Written client permission for each of these three, and permission to name Scott Bechtle. Nothing above publishes without it.'),
        testimonialFlag('One written testimonial from an owner or architect, tied to a specific project and a specific thing Gar did. Zero exist on file.'),
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'Do you design the house, or build from an architect’s plans?',
          a: [
            'We build from your architect’s plans. Gar Rector & Associates is a builder, not a design firm, and the drawings stay the architect’s work. Our job is to solve what the site throws at those drawings without changing what they say.',
          ],
        },
        {
          q: 'How involved is Gar once construction starts?',
          a: [
            'Gar is on the job site running the work through the whole build. He coordinates the trades, walks the drawings against what is actually getting built, and resolves site conditions as they come up.',
          ],
          flags: [
            { kind: 'input', text: 'Item 2. One concrete week in his life, so this answer can say something a competitor cannot.' },
          ],
        },
        {
          q: 'What size and kind of homes do you build?',
          a: [
            'We build high-end custom homes across a wide range of sizes, from compact houses with real architectural interest to full estate properties. Recent builds run from twenty-seven hundred to four thousand square feet. Size matters less than whether the house is interesting to build.',
          ],
          flags: [
            {
              kind: 'decision',
              text: 'When item 4 closes, replace this size question with a process question and move the size answer into the body.',
            },
          ],
        },
        {
          q: 'How does budgeting work?',
          a: [
            'A budget gets built line by line from completed architectural and engineering drawings, before anything starts on site. That means the number becomes real once the drawings are far enough along to price accurately. We do not quote from a form or a square-foot figure.',
          ],
        },
        {
          q: 'Is the cabinetry really made in your shop?',
          a: [
            'Yes. Cabinetry, paneling and millwork are built in our shop in St. Helena by a three-person team. It means the finish work runs on our schedule and to the same standard as the framing around it.',
          ],
        },
        { q: 'What happens if I get in touch?', a: [shared.firstStep] },
      ],
    },
    { type: 'image', image: placeholderPhoto('vaulted-timber-interior.jpg', 'Interior frame from Contemporary Farmhouse') },
  ],
  cta: { heading: shared.ctaHeading, text: shared.ctaText },
};
