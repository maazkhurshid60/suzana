// Converts Sanity documents into the shapes the components render. Pure functions, so the
// round trip (local content -> dashboard documents -> site) can be tested without a Sanity project.
import type { SanityImageSource } from '@sanity/image-url';
import type {
  Block,
  Business,
  ContactContent,
  Flag,
  ImageSlot,
  Link,
  PageContent,
  Para,
  Project,
  SiteChrome,
  Testimonial,
} from '@/content/types';
import { imageUrl } from './image';

export type SanityNote = { kind: Flag['kind']; text: string };
type SanityParagraph = { text: string; links?: Link[]; draft?: boolean };
type SanityPhoto = { label?: string; alt?: string; placeholderSrc?: string; image?: SanityImageSource & { asset?: unknown } };
type SanityProject = {
  _id: string;
  name: string;
  location: string;
  year: string;
  summary?: string;
  photo?: SanityPhoto;
  permissionOnFile?: boolean;
};
// Section shapes are validated by the Studio schema, so the mapper reads them loosely.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityBlock = { _type: string; [key: string]: any };
export type SanityPage = {
  path: string;
  eyebrow?: string;
  meta?: { title: string; description: string };
  hero?: Omit<PageContent['hero'], 'image'> & { reviewNotes?: SanityNote[]; backgroundImage?: SanityImageSource & { asset?: unknown } };
  blocks?: SanityBlock[];
  cta?: { heading?: string; text?: string };
  reviewNotes?: SanityNote[];
};
export type SanityChrome = {
  menu?: { label: string; href?: string; links?: Link[] }[];
  headerButton?: Link;
  showPhoneInHeader?: boolean;
  footerColumns?: { title: string; links?: Link[] }[];
  footerNote?: string;
  logo?: { alt?: string };
  logoAsset?: { url: string; width: number; height: number };
  heroVideoUrl?: string;
  buttonLabels?: Partial<SiteChrome['buttonLabels']>;
  notFound?: Partial<SiteChrome['notFound']>;
  reviewNotes?: SanityNote[];
};
export type SanityContact = {
  meta?: { title: string; description: string };
  h1?: string;
  sub?: string;
  heroImage?: SanityImageSource & { asset?: unknown };
  whatHappensHeading?: string;
  whatHappens?: string[];
  getInTouchHeading?: string;
  formHeading?: string;
  stages?: string[];
  directionsHeading?: string;
  reviewNotes?: SanityNote[];
  detailsNotes?: SanityNote[];
  formNotes?: SanityNote[];
  directionsNotes?: SanityNote[];
};

function stripUndefined<T extends object>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v != null && !k.startsWith('_'))) as Partial<T>;
}

const notes = (list?: SanityNote[]): Flag[] => (list ?? []).map(({ kind, text }) => ({ kind, text }));

const cleanLinks = (list?: Link[]): Link[] =>
  (list ?? []).filter((l) => l?.label && l?.href).map(({ label, href }) => ({ label, href }));

const para = (p: SanityParagraph): Para => {
  const links = cleanLinks(p.links);
  return links.length || p.draft ? { text: p.text, links: links.length ? links : undefined, draft: p.draft || undefined } : p.text;
};

const paras = (list?: SanityParagraph[]): Para[] => (list ?? []).filter((p) => p?.text).map(para);

/** An uploaded photo wins. Otherwise the placeholder, which never shows in the public build. */
function photo(slot?: SanityPhoto): ImageSlot | undefined {
  if (!slot || (!slot.label && !slot.image?.asset && !slot.placeholderSrc)) return undefined;
  const label = slot.label ?? '';
  if (slot.image?.asset) return { label, alt: slot.alt, src: imageUrl(slot.image) };
  if (slot.placeholderSrc) return { label, alt: slot.alt ?? '', src: slot.placeholderSrc, placeholder: true };
  return { label };
}

function project(doc: SanityProject): Project {
  return {
    id: doc._id.replace(/^project-/, ''),
    name: doc.name,
    location: doc.location,
    year: doc.year,
    summary: doc.summary,
    photo: photo(doc.photo),
    permissionOnFile: Boolean(doc.permissionOnFile),
  };
}

const link = (l?: Link) => (l?.label && l?.href ? { label: l.label, href: l.href } : undefined);

function block(b: SanityBlock): Block | null {
  const id = b.anchor || undefined;
  switch (b._type) {
    case 'proseBlock':
      return {
        type: 'prose',
        id,
        heading: b.heading,
        body: paras(b.body),
        subsections: (b.subsections ?? []).map((s: SanityBlock) => ({
          heading: s.heading,
          body: paras(s.body),
          flags: notes(s.reviewNotes),
          reviewOnly: Boolean(s.reviewOnly),
        })),
        flags: notes(b.reviewNotes),
      };
    case 'offeringsBlock':
      return {
        type: 'offerings',
        id,
        heading: b.heading,
        items: (b.items ?? []).map((i: SanityBlock) => ({ title: i.title, text: i.text, href: i.href })),
      };
    case 'projectsBlock':
      return {
        type: 'projects',
        id,
        heading: b.heading,
        image: photo(b.photo),
        items: (b.items ?? [])
          .filter((i: SanityBlock) => i.project)
          .map((i: SanityBlock) => ({ project: project(i.project), text: i.text, draft: Boolean(i.draft) })),
        cta: link(b.cta),
        flags: notes(b.reviewNotes),
      };
    case 'placesBlock':
      return {
        type: 'places',
        id,
        heading: b.heading,
        items: (b.items ?? []).map((i: SanityBlock) => ({
          title: i.title,
          text: i.text,
          link: link(i.link),
          flags: notes(i.reviewNotes),
        })),
        after: paras(b.after),
        flags: notes(b.reviewNotes),
      };
    case 'glanceBlock':
      return {
        type: 'glance',
        heading: b.heading,
        rows: (b.rows ?? []).map((r: SanityBlock) => ({ label: r.label, value: r.value, flags: notes(r.reviewNotes) })),
      };
    case 'faqBlock':
      return {
        type: 'faq',
        heading: b.heading,
        items: (b.items ?? []).map((i: SanityBlock) => ({ q: i.question, a: paras(i.answer), flags: notes(i.reviewNotes) })),
      };
    case 'imageBlock': {
      const image = photo(b.photo);
      return image ? { type: 'image', image } : null;
    }
    case 'testimonialsBlock':
      return {
        type: 'testimonials',
        id,
        heading: b.heading,
        items: (b.items ?? []).filter(Boolean).map(
          (t: SanityBlock): Testimonial => ({ quote: t.quote, name: t.name, role: t.role, permissionOnFile: Boolean(t.permissionOnFile) }),
        ),
      };
    default:
      return null;
  }
}

export function mapPage(doc: SanityPage): PageContent {
  return {
    path: doc.path,
    meta: doc.meta ?? { title: doc.hero?.h1 ?? '', description: doc.hero?.sub ?? '' },
    eyebrow: doc.eyebrow,
    hero: {
      h1: doc.hero?.h1 ?? '',
      sub: doc.hero?.sub ?? '',
      trust: doc.hero?.trust,
      ctas: doc.hero?.ctas?.length ? doc.hero.ctas : ['conversation'],
      workHref: doc.hero?.workHref,
      image: doc.hero?.backgroundImage?.asset ? imageUrl(doc.hero.backgroundImage, 2400) : undefined,
      flags: notes(doc.hero?.reviewNotes),
    },
    review: notes(doc.reviewNotes),
    blocks: (doc.blocks ?? []).map(block).filter((b): b is Block => b !== null),
    cta: {
      heading: doc.cta?.heading ?? 'Talk to Gar about your project',
      text: doc.cta?.text ?? '',
    },
  };
}

/** Business details, falling back field by field to the defaults. */
export function mapBusiness(doc: Partial<Business>, fallback: Business): Business {
  const phone = doc.phone ?? fallback.phone;
  return {
    ...fallback,
    ...stripUndefined(doc),
    phone,
    phoneHref: `tel:+1${phone.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '')}`,
    siteUrl: fallback.siteUrl,
  };
}

/** Header and footer, falling back field by field to the defaults so a half-filled document still renders. */
export function mapChrome(doc: SanityChrome, fallback: SiteChrome): SiteChrome {
  const menu = (doc.menu ?? [])
    .filter((m) => m?.label)
    .map((m) => (m.links?.length ? { label: m.label, links: cleanLinks(m.links) } : { label: m.label, href: m.href ?? '/' }));
  const footerColumns = (doc.footerColumns ?? []).filter((c) => c?.title).map((c) => ({ title: c.title, links: cleanLinks(c.links) }));
  return {
    menu: menu.length ? menu : fallback.menu,
    headerButton: link(doc.headerButton) ?? fallback.headerButton,
    showPhoneInHeader: doc.showPhoneInHeader ?? fallback.showPhoneInHeader,
    footerColumns: footerColumns.length ? footerColumns : fallback.footerColumns,
    footerNote: doc.footerNote ?? fallback.footerNote,
    logo: doc.logoAsset?.url
      ? { src: doc.logoAsset.url, alt: doc.logo?.alt ?? fallback.logo.alt, width: doc.logoAsset.width, height: doc.logoAsset.height }
      : fallback.logo,
    heroVideo: doc.heroVideoUrl ?? fallback.heroVideo,
    buttonLabels: { ...fallback.buttonLabels, ...stripUndefined(doc.buttonLabels ?? {}) },
    notFound: { ...fallback.notFound, ...stripUndefined(doc.notFound ?? {}) },
    flags: doc.reviewNotes ? notes(doc.reviewNotes) : fallback.flags,
  };
}

export function mapContact(doc: SanityContact, fallback: ContactContent): ContactContent {
  return {
    ...fallback,
    meta: doc.meta ?? fallback.meta,
    h1: doc.h1 ?? fallback.h1,
    sub: doc.sub ?? fallback.sub,
    heroImage: doc.heroImage?.asset ? imageUrl(doc.heroImage, 2400) : fallback.heroImage,
    review: notes(doc.reviewNotes),
    whatHappens: {
      heading: doc.whatHappensHeading ?? fallback.whatHappens.heading,
      body: doc.whatHappens?.length ? doc.whatHappens : fallback.whatHappens.body,
    },
    getInTouchHeading: doc.getInTouchHeading ?? fallback.getInTouchHeading,
    detailsFlags: notes(doc.detailsNotes),
    formHeading: doc.formHeading ?? fallback.formHeading,
    formFlags: notes(doc.formNotes),
    stages: doc.stages?.length ? doc.stages : fallback.stages,
    directionsHeading: doc.directionsHeading ?? fallback.directionsHeading,
    directionsFlags: notes(doc.directionsNotes),
  };
}
