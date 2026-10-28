import { permissionFlag, placeholderPhoto, projects, shared, testimonialFlag } from '../site';
import type { PageContent } from '../types';

export const luxuryHomeRemodeling: PageContent = {
  path: '/services/luxury-home-remodeling/',
  meta: {
    title: 'Luxury Home Remodeling Napa Valley',
    description:
      'Whole-house remodels and rebuilds to the studs in Napa Valley, run on site by Gar Rector and built from your architect’s drawings.',
  },
  eyebrow: 'Services',
  hero: {
    h1: 'Home remodeling in Napa Valley',
    sub: 'Houses rebuilt to the studs, by the builder who runs the job on site.',
    ctas: ['conversation'],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'Most of what is worth building here is already standing',
      body: [
        'A good deal of our work starts with a house somebody already owns, or one they are about to buy because of where it sits. The lot is right, the house is not, and the question is how far down to take it.',
        'That decision sets everything after it. A house taken back to the studs is a different project from one where the structure stays and the plan changes, and the budget, the permit path and the schedule all follow from which one it is.',
      ],
    },
    {
      type: 'prose',
      heading: 'How we approach it',
      subsections: [
        {
          heading: 'We find out what the house actually is first',
          body: [
            'An existing house hides things. What is behind the walls, what the original framing will carry, what was added later and how. Opening it up is the only way to know, and it is better to know before the drawings are final than halfway through the build.',
          ],
        },
        {
          heading: 'We build from your architect’s drawings',
          body: [
            'We build from drawings by the architect you retain. On a remodel that means working with the design team on the places where the existing structure and the new plan disagree, rather than solving it quietly in the field.',
          ],
        },
        {
          heading: 'Cabinetry and millwork from our own shop',
          body: [
            {
              text: 'On a remodel the finish work is most of what the owner sees, and it is also where schedules usually slip. Ours is built in our own shop in St. Helena by a three-person team, which means it runs on our calendar.',
              links: [{ label: 'Custom Cabinetry', href: '/services/custom-cabinetry/' }],
            },
          ],
        },
        {
          heading: 'It is still Gar on the site',
          body: [
            'A remodel generates more decisions per week than a new build, because the house keeps producing surprises. Gar is on the job site running the work, which is how those get resolved the same day rather than the following week.',
          ],
        },
      ],
    },
    {
      type: 'glance',
      rows: [
        {
          label: 'Who it is for',
          value: 'Owners and architects remodeling high-end homes in Napa Valley, and in Sonoma County for select projects',
        },
        { label: 'Where we build', value: shared.whereWeBuild },
        {
          label: 'Scope',
          value: 'Whole-house remodels, rebuilds to the studs, additions, cabinetry and millwork from our own shop',
        },
        { label: 'Also in scope', value: 'Tear-down and rebuild, where the existing house is not worth keeping' },
        { label: 'How the number gets built', value: shared.budget },
        { label: 'Timeline', flags: [{ kind: 'input', text: 'Item 4. Typical remodel duration.' }] },
        { label: 'License', value: 'California CSLB 664538, General Building (B)' },
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'Recent work',
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
        permissionFlag('Written permission for both projects, and to name Scott Bechtle.'),
        testimonialFlag(
          'One written testimonial, ideally from the Bondi owners. A remodel buyer is buying trust in a way a new-build buyer is not, and this page feels the absence more than the others do.',
        ),
        {
          kind: 'decision',
          text: 'Whether the Contemporary Farmhouse belongs here at all. Running it on both this page and Custom Home Building weakens both. Recommendation: it stays on Custom Home Building and this page gets a second remodel instead.',
        },
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'How do I know whether to remodel or rebuild?',
          a: [
            'Usually you do not, until somebody has looked at the house properly. What the structure will carry, what the permit path looks like and what the existing plan is fighting all feed into it. That conversation happens before drawings are final, with you and your architect.',
          ],
        },
        {
          q: 'Can you work on a house I have not bought yet?',
          a: ['Yes. Walking a house before an offer is a sensible use of an hour, and it is a conversation rather than a job.'],
        },
        {
          q: 'Do you take on single rooms, like a kitchen?',
          a: [
            'Our work is whole-house, and that is where we are useful. A single-room project is usually better served by a builder set up for it, and we will say so.',
          ],
        },
        {
          q: 'Will the cabinetry match the rest of the house?',
          a: [
            'It is built in our shop to the drawings for your house, so matching an existing millwork detail or a new one is the same job. The three-person team that builds it works on our schedule rather than a supplier’s.',
          ],
        },
        {
          q: 'How does budgeting work when nobody knows what is behind the walls?',
          a: [
            'A budget gets built line by line from completed architectural and engineering drawings. On a remodel that budget carries the known unknowns openly rather than burying them, and the figure tightens as the house gets opened up. We do not quote from a square-foot figure.',
          ],
        },
        {
          q: 'What happens if I get in touch?',
          a: [
            'You talk to Gar, and then you walk the house with him. There is no estimate form and no automated quote. If the project is not a fit, he will say so and point you somewhere better.',
          ],
        },
      ],
    },
  ],
  cta: {
    heading: shared.ctaHeading,
    text: 'Bring the house and your drawings, however far along they are. The first step is a conversation, not a quote.',
  },
};
