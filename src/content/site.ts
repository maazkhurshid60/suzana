import type { Business, Flag, Link, Project, SiteChrome } from './types';

// Name, address and phone. Only the Charter Oak address publishes, anywhere (guardrail 3).
export const business: Business = {
  name: 'Gar Rector & Associates',
  legalName: 'Gar Rector & Associates, Inc.',
  street: '1401 Charter Oak Ave',
  locality: 'St. Helena',
  region: 'CA',
  postalCode: '94574',
  phone: '(707) 963-8700',
  phoneHref: 'tel:+17079638700',
  hours: 'Monday to Friday, 7:00am to 5:00pm',
  weekends: 'Weekends, please call',
  license: 'California CSLB 664538, General Building (B)',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://garrectorassociates.com',
};

export const licenseFlag: Flag = {
  kind: 'input',
  text: 'Item 9. CSLB verification of 664538 and renewal status. Archived meta shows an expiry of 12/31/2025.',
};

export const services: Link[] = [
  { label: 'Custom Home Building', href: '/services/custom-home-building/' },
  { label: 'Winery & Estate Builds', href: '/services/winery-estate-builds/' },
  { label: 'Luxury Home Remodeling', href: '/services/luxury-home-remodeling/' },
  { label: 'Custom Cabinetry', href: '/services/custom-cabinetry/' },
];

export const areas: Link[] = [
  { label: 'Napa Valley', href: '/napa-valley-custom-home-builder/' },
  { label: 'St. Helena', href: '/st-helena-custom-home-builder/' },
  { label: 'Sonoma County', href: '/sonoma-county-custom-home-builder/' },
];

// Every project starts without written permission on file (copy document item 5).
// Projects without permission are hidden from the public build.
// Photos are placeholders until the 2023 shoot originals arrive. They show in review and preview
// builds with a "Placeholder photo" tag and never in the public build.
const placeholder = (file: string, label: string) => ({
  label,
  src: `/media/placeholders/${file}`,
  alt: 'Placeholder photo, not this project',
  placeholder: true,
});

export const projects = {
  'quail-camp': {
    id: 'quail-camp',
    name: 'Quail Camp Estate',
    location: 'St. Helena',
    year: '2023',
    photo: placeholder('vineyard-estate.jpg', 'Quail Camp Estate exterior'),
    permissionOnFile: false,
  },
  'contemporary-farmhouse': {
    id: 'contemporary-farmhouse',
    name: 'Contemporary Farmhouse',
    location: 'St. Helena',
    year: '2026',
    photo: placeholder('timber-gable-entry.jpg', 'Contemporary Farmhouse exterior'),
    permissionOnFile: false,
  },
  'mt-veeder': {
    id: 'mt-veeder',
    name: 'Mt. Veeder Modern',
    location: 'Napa',
    year: '2026',
    photo: placeholder('hillside-modern.jpg', 'Mt. Veeder Modern exterior'),
    permissionOnFile: false,
  },
  bondi: {
    id: 'bondi',
    name: 'Bondi Beach House',
    location: 'St. Helena',
    year: '2024',
    photo: placeholder('contemporary-stone-house.jpg', 'Bondi Beach House exterior'),
    permissionOnFile: false,
  },
} satisfies Record<string, Project>;

export const placeholderPhoto = placeholder;

// Shared lines that repeat across pages, kept identical on purpose.
export const shared = {
  ctaHeading: 'Talk to Gar about your project',
  ctaText:
    'Bring your site and your drawings, however far along they are. The first step is a conversation, not a quote.',
  firstStep:
    'You talk to Gar, and then you walk the site with him. There is no estimate form and no automated quote. If the project is not a fit, he will say so and point you somewhere better.',
  architect:
    'We build from drawings by the architect you retain. We do not sell architectural services and we do not redraw the design.',
  budget:
    'A line-item budget developed from completed architectural and engineering drawings, before work starts on site',
  whereWeBuild:
    'St. Helena, Napa, Yountville, Calistoga, Oakville, Rutherford. Healdsburg, Santa Rosa and Glen Ellen for select projects',
};

export const permissionFlag = (what: string): Flag => ({ kind: 'input', text: `Item 5. ${what}` });

export const testimonialFlag = (what: string): Flag => ({ kind: 'input', text: `Item 6. ${what}` });

// Header, footer and shared wording. Editable in the dashboard under "Header and footer".
export const chrome: SiteChrome = {
  menu: [
    { label: 'Services', links: services },
    { label: 'Areas', links: areas },
    { label: 'Contact', href: '/contact/' },
  ],
  headerButton: { label: 'Start a conversation', href: '/contact/' },
  showPhoneInHeader: true,
  footerColumns: [
    { title: 'Services', links: services },
    { title: 'Areas', links: areas },
    { title: 'Get in touch', links: [{ label: 'Contact', href: '/contact/' }] },
  ],
  footerNote: 'St. Helena, Napa Valley',
  logo: { src: '/media/logo.webp', alt: 'Gar Rector & Associates', width: 1152, height: 632 },
  heroVideo: '/media/hero.mp4',
  buttonLabels: { conversation: 'Start a conversation', work: 'See the work' },
  notFound: {
    heading: 'This page is not here',
    text: 'It may have moved when the site was rebuilt. The homepage has everything, or give us a call.',
  },
  flags: [licenseFlag],
};
