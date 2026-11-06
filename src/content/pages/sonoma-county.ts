import { permissionFlag } from '../site';
import type { PageContent } from '../types';

// Copy: "Sonoma County location page: copy update (V2)", November 5, 2026.
// Always "Sonoma County", never "Sonoma Valley".
export const sonomaCounty: PageContent = {
  path: '/sonoma-county-custom-home-builder/',
  meta: {
    title: 'Custom Home Builder Sonoma County | Healdsburg CA',
    description:
      'A St. Helena custom home builder working in Healdsburg, Santa Rosa and Glen Ellen for select projects, built from your architect’s drawings.',
  },
  eyebrow: 'Areas',
  hero: {
    h1: 'Custom home builder in Sonoma County',
    image: '/media/photos/hero-sonoma.jpg',
    sub: 'Custom home building and estate construction across Healdsburg, Santa Rosa, and Glen Ellen.',
    trust: 'Executing complex residential architecture and estate rebuilds since 1991.',
    ctas: ['conversation'],
  },
  blocks: [
    {
      type: 'prose',
      heading: 'Architectural residences across Sonoma County',
      body: [
        'While our headquarters and custom millwork shop are rooted in St. Helena, Gar Rector & Associates selectively accepts architecturally distinctive custom home and estate projects across Sonoma County. We focus on properties in Healdsburg, Santa Rosa, and Glen Ellen where clients demand direct builder engagement and uncompromising drawing execution.',
        'Sonoma County terrain presents unique structural considerations: expansive hillside slopes along the Mayacamas ridge, rural estate parcels with specialized septic and well infrastructure, and rigorous wildfire rebuilding codes overseen by Permit Sonoma. We manage these site logistics directly with client-retained architects to deliver residences built to the highest standard of durability.',
      ],
    },
    {
      type: 'image',
      image: { src: '/media/photos/sonoma-vineyard.jpg', label: 'A Sonoma County vineyard', alt: 'A Sonoma County vineyard' },
    },
    {
      type: 'prose',
      heading: 'Navigating Sonoma County site conditions',
      subsections: [
        {
          heading: 'Healdsburg & Russian River corridor',
          body: [
            'From contemporary vineyard estates in Healdsburg to modern retreats along the Russian River, we execute complex steel framing, board-formed concrete, and expansive architectural glass packages designed to integrate seamlessly into wine country settings.',
          ],
        },
        {
          heading: 'Glen Ellen & rural estate parcels',
          body: [
            'Building in Glen Ellen and rural Sonoma communities requires comprehensive site management: coordinating long private access roads, staging materials on constrained parcels, and balancing multi-structure estate footprints with agricultural and open-space easements.',
          ],
        },
        {
          heading: 'Permit Sonoma & WUI wildfire standards',
          body: [
            'Sonoma County maintains strict building regulations under Permit Sonoma, particularly across designated high-fire severity zones. We build with non-combustible exterior envelopes, ember-resistant assemblies, and heavy timber elements that comply fully with Chapter 7A codes while protecting architectural lines.',
          ],
        },
      ],
    },
    {
      type: 'glance',
      heading: 'Sonoma County operations',
      rows: [
        { label: 'Communities served', value: 'Healdsburg, Santa Rosa, Glen Ellen, and select rural Sonoma County sites.' },
        { label: 'Project criteria', value: 'Selective architecturally distinctive ground-up custom residences and estate rebuilds.' },
        {
          label: 'Active capacity',
          value: 'Five to six active builds at a time across our portfolio, ensuring direct principal oversight.',
        },
        { label: 'Building agency', value: 'Permit Sonoma (Sonoma County PRMD) and local municipal building departments.' },
        { label: 'Direct access', value: 'Discuss your drawings and site conditions directly with Gar Rector.' },
      ],
    },
    {
      // No Sonoma County project is cleared yet, so the section stays empty until one is.
      type: 'projects',
      id: 'recent-work',
      heading: 'Featured Sonoma County work',
      items: [],
      flags: [
        permissionFlag(
          'Three Sonoma County projects (Healdsburg, Glen Ellen, Santa Rosa) with titles, credits and written permission. The section stays hidden until one is added.',
        ),
      ],
    },
    {
      type: 'faq',
      heading: 'Frequently asked questions',
      items: [
        {
          q: 'What types of projects do you accept in Sonoma County?',
          a: [
            'We selectively accept architect-designed ground-up custom homes, complex hillside residences, and structural estate rebuilds in Healdsburg, Santa Rosa, and Glen Ellen that match our boutique project criteria.',
          ],
        },
        {
          q: 'How do you manage site logistics and oversight outside of Napa Valley?',
          a: [
            'Every project is assigned a dedicated lead foreman stationed on your site every single working day, while Gar Rector manages design coordination and visits active Sonoma County sites on a structured rotation.',
          ],
        },
        {
          q: 'Do you work with Permit Sonoma and local fire districts?',
          a: [
            'Yes. We work directly with Permit Sonoma and local fire protection districts to navigate building permits, environmental health requirements, and California WUI Chapter 7A wildfire codes.',
          ],
        },
        {
          q: 'Can our Sonoma County build incorporate your in-house custom millwork?',
          a: [
            'Yes. All custom cabinetry, architectural paneling, and interior casework are manufactured inside our St. Helena shop and transported and installed on-site by our permanent field carpenters.',
          ],
        },
      ],
    },
  ],
  cta: {
    heading: 'Start a conversation',
    text: 'If you are planning an architecturally significant custom build or estate rebuild in Sonoma County, we welcome the opportunity to review your drawings and site conditions.',
  },
};
