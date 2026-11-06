import { placeholderPhoto } from '../site';
import type { PageContent } from '../types';

// Copy: "Custom millwork and cabinetry page: copy update", November 5, 2026.
// No cabinetmaker name and no shop DBA appear without written permission.
export const customCabinetry: PageContent = {
  path: '/services/custom-cabinetry/',
  meta: {
    title: 'Custom Cabinetry & Millwork, St. Helena | Napa Valley',
    description:
      'Cabinetry, paneling and millwork made in our own three-person shop in St. Helena, built to your architect’s drawings on the same calendar as the house.',
  },
  eyebrow: 'Services',
  hero: {
    h1: 'In-house custom millwork and architectural cabinetry',
    image: '/media/photos/hero-cabinet-shop.jpg',
    sub: 'Architectural cabinetry, paneling, and custom joinery built inside our St. Helena workshop for Gar Rector & Associates projects.',
    trust: 'Crafted in St. Helena since 1991. Over thirty years of millwork experience on the shop team.',
    ctas: ['conversation'],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'Cabinetry and millwork built under our own roof',
      body: [
        'In high-end architectural construction, cabinetry is not furniture delivered at the end of the job; it is a structural component of the interior architecture. Flush reveal profiles, continuous veneer sequences, integrated ceiling paneling, and hidden pivot doors leave no tolerance for third-party manufacturing errors.',
        'Gar Rector & Associates operates its own dedicated custom millwork shop in St. Helena. With more than thirty years of hands-on joinery experience on our team, we build custom cabinetry, architectural paneling, and specialty casework directly for our residences. Manufacturing in-house allows us to take raw field dimensions directly to the shop benches, eliminating third-party lead times and guaranteeing exact alignment with the framing.',
      ],
    },
    {
      type: 'prose',
      heading: 'How we craft',
      body: [
        'Every piece of architectural cabinetry begins with shop drawings coordinated directly between the architect and our lead cabinetmaker.',
      ],
      subsections: [
        {
          heading: 'Architectural joinery and veneer matching',
          body: [
            'We source hand-selected hardwoods, architectural veneers, and solid timber species to match specified interior palettes. From book-matched walnut kitchen elevations to rift-sawn white oak wall paneling, our craftsmen hand-fit every joint, face frame, and concealed hardware assembly.',
          ],
        },
        {
          heading: 'Direct field coordination',
          body: [
            'Because our cabinet shop is located twenty minutes from our job sites, our millworkers walk active framing alongside Gar and our lead foremen. Field dimensions are verified against physical drywall and concrete benchmarks before fabrication begins, preventing on-site shimming or visual compromises.',
          ],
        },
        {
          heading: 'Seamless trade integration',
          body: [
            'Integrated cabinetry often interfaces with concealed HVAC supply lines, architectural lighting channels, and structural steel embeds. By controlling both the house framing and the cabinet fabrication, we ensure mechanical trades and millwork installations fit cleanly together.',
          ],
        },
      ],
    },
    {
      type: 'glance',
      heading: 'Shop operations',
      rows: [
        { label: 'Shop location', value: '1401 Charter Oak Ave, St. Helena, CA 94574.' },
        { label: 'Shop capacity', value: 'Dedicated exclusively to active Gar Rector & Associates residential builds and estate projects.' },
        { label: 'Experience', value: 'Over thirty years of dedicated architectural joinery and custom cabinetry experience on the shop team.' },
        {
          label: 'Scope of work',
          value:
            'Custom kitchen cabinetry, primary bath vanities, architectural wall paneling, library casework, wine cellars, and hidden pivot doors.',
        },
        {
          label: 'Materials handled',
          value: 'Domestic hardwoods, European white oak, walnut, rift-cut veneers, architectural metals, and custom hand finishes.',
        },
        { label: 'Installation', value: 'Installed exclusively by our permanent in-house field carpenters and lead foremen.' },
        { label: 'Coordination', value: 'Direct review of architectural elevations and custom shop drawings with retained design teams.' },
      ],
    },
    {
      type: 'projects',
      id: 'recent-work',
      heading: 'Selected millwork installations',
      image: placeholderPhoto(
        'great-room-builtins.jpg',
        'Interiors. This page needs them more than any other, top of the shot list for the planned shoot.',
      ),
      items: [],
      flags: [
        {
          kind: 'input',
          text: 'Three millwork projects with road or landmark names, completion years and architect credits, and confirmation on whether the lead cabinetmaker can be named.',
        },
      ],
    },
    {
      type: 'prose',
      heading: 'Physical proof of craft in St. Helena',
      body: [
        'Operating an in-house cabinet shop is rare among custom home builders in Napa Valley. Most contractors subcontract millwork to distant production shops, leading to prolonged lead times, shipping damage, and awkward field trims when dimensions conflict.',
        'Gar Rector & Associates maintains its shop in St. Helena so that design decisions, timber selection, and bench fabrication happen in close proximity to our building sites. It is our physical guarantee of craftsmanship and accountability.',
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'Is the cabinetry really made in your own shop?',
          a: [
            'Yes. All custom architectural cabinetry, wall paneling, casework, and specialty interior doors for our builds are fabricated inside our workshop at 1401 Charter Oak Ave in St. Helena.',
          ],
        },
        {
          q: 'Do you build cabinetry for projects that Gar Rector & Associates is not general contracting?',
          a: [
            'Our shop capacity is reserved primarily for our own custom residential, remodeling, and estate builds to ensure dedicated scheduling and uncompromising quality control for our clients.',
          ],
        },
        {
          q: 'How do you work with an interior designer’s or architect’s millwork specifications?',
          a: [
            'We take the architect’s or designer’s design elevations and generate detailed shop drawings, material samples, and finish mockups for approval before milling raw lumber.',
          ],
        },
        {
          q: 'Who installs the custom cabinetry on site?',
          a: [
            'Installation is handled by our permanent finish carpenters and lead foremen, ensuring that every seam, reveal, and hardware component aligns perfectly with the completed structure.',
          ],
        },
      ],
    },
  ],
  cta: {
    heading: 'Start a conversation',
    text: 'If you are planning a custom home build or estate modernization that requires custom millwork and joinery, we welcome the opportunity to review your architectural drawings.',
  },
};
