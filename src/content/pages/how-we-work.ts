import type { PageContent } from '../types';

// Copy: "How we work page: copy update", November 5, 2026. Second item in the header menu.
export const howWeWork: PageContent = {
  path: '/how-we-work/',
  meta: {
    title: 'How We Work | Gar Rector & Associates, Napa Valley',
    description:
      'How a Gar Rector & Associates custom build is planned, budgeted and run: five stages, direct principal involvement, and a lead foreman on site every day.',
  },
  hero: {
    h1: 'How we work',
    image: '/media/photos/hero-how-we-work.jpg',
    sub: 'A disciplined sequence built on architectural drawing fidelity, direct principal involvement, and dedicated site leadership.',
    trust: 'Building custom residences and estates in Napa Valley since 1991.',
    ctas: ['conversation'],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'Sequence, discipline, and direct accountability',
      body: [
        'A high-end custom home or estate build is one of the most complex capital endeavors a property owner undertakes. In Napa Valley, where difficult soils, steep slopes, strict agricultural protections, and severe fire codes intersect, success is not a matter of luck. It is the result of disciplined sequencing and experienced field leadership.',
        'At Gar Rector & Associates, we do not operate with layered corporate management or distant executives. We break every project into five distinct stages, ensuring clear division of responsibility between architectural coordination and daily trade execution from groundbreaking through occupancy.',
      ],
    },
    {
      type: 'prose',
      id: 'sequence',
      heading: 'The five-stage building sequence',
      subsections: [
        {
          heading: '1. Early architectural collaboration & site evaluation',
          body: [
            'Before heavy equipment moves onto your parcel, Gar Rector reviews schematic and permit drawings alongside your retained architect. We walk the physical site together, evaluating access routes, solar orientations, property setbacks, and subsurface conditions. Identifying structural constraints early allows the architectural team to solve engineering interfaces before construction schedules begin.',
          ],
        },
        {
          heading: '2. Scope definition & line-item budgeting',
          body: [
            'We build comprehensive, line-item budgets derived directly from completed architectural and structural engineering plans. Rather than presenting vague speculative allowances, we bid scopes to vetted local subcontractors who have worked with us for decades. You and your design team receive complete cost transparency and trade schedule dependencies before contracts are signed.',
          ],
        },
        {
          heading: '3. Principal oversight & design alignment',
          body: [
            'Gar Rector personally manages all design coordination, specialized trade selection, and structural milestones. When unexpected site conditions or concealed framing realities require a plan adjustment, Gar works directly with the architect to devise a field solution that preserves the proportions, light, and visual lines of the design.',
          ],
        },
        {
          heading: '4. Dedicated lead foreman on site every day',
          body: [
            'Every project receives one assigned lead foreman who remains on site full-time from excavation to the final punch list. Supported by our St. Helena office team, the lead foreman manages daily trades, enforces strict framing tolerances, maintains site safety, and keeps the job site clean and organized.',
          ],
        },
        {
          heading: '5. Commissioning, turnover & ongoing care',
          body: [
            'As finish trades complete their work, we execute an exhaustive commissioning process: balancing mechanical systems, verifying window operations, and completing fine punch-list details alongside the architect. Upon key turnover, owners receive complete warranty manuals, trade contacts, and as-built documentation. We remain directly accessible for post-occupancy maintenance for years to come.',
          ],
        },
      ],
    },
    {
      type: 'prose',
      heading: 'Why we limit active builds to five or six',
      body: [
        'Many contracting firms treat growth as their primary business metric, scaling project counts by adding layers of junior project managers. At Gar Rector & Associates, we have deliberately declined that model for thirty-five years.',
        'A truly boutique building experience cannot be delivered at scale. Limiting our active portfolio to five or six residences ensures that Gar personally walks your job site, answers your design calls, and maintains intimate knowledge of every foundation, frame, and millwork detail carrying his name.',
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'At what point in the design process should we involve Gar Rector & Associates?',
          a: [
            'The ideal time to involve us is during early schematic design or permit set development. Early builder collaboration allows us to evaluate site logistics, estimate preliminary structural costs, and identify long-lead materials before drawings are finalized.',
          ],
        },
        {
          q: 'How do you handle changes that arise during construction?',
          a: [
            'When field conditions or design refinements require changes, Gar reviews the adjustment directly with the architect and structural engineer. We document the scope, obtain written client approval, and update trade schedules before work proceeds.',
          ],
        },
        {
          q: 'Who is my primary contact during active construction?',
          a: [
            'You have direct access to Gar Rector for all design, scope, and budget decisions, while your dedicated lead foreman is available on site every working day to answer daily operational questions.',
          ],
        },
        {
          q: 'What happens after we move into the home?',
          a: [
            'We provide complete warranty documentation, conduct a formal walk-through at completion, and remain available for any warranty items, maintenance reviews, or future estate additions.',
          ],
        },
      ],
    },
  ],
  cta: {
    heading: 'Start a conversation',
    text: 'Whether you have an approved architectural drawing set or are currently evaluating site feasibility with an architect, we welcome the opportunity to discuss your plans.',
  },
};
