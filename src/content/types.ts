// Content model for every page. Copy lives in src/content/pages as plain data so it can
// later move into a CMS without touching the components.

export type Link = { label: string; href: string };

/**
 * A flag carried over from the copy document ([CLIENT INPUT], [DRAFT], [DECISION NEEDED]).
 * Flags render only in review mode and never reach the public build.
 */
export type Flag = {
  kind: 'input' | 'draft' | 'decision' | 'hold';
  text: string;
};

/** A paragraph. `draft` marks copy the document holds for client approval. */
export type Para = string | { text: string; links?: Link[]; draft?: boolean };

/** A photo position from the document's image placement notes. Empty slots show only in review mode. */
export type ImageSlot = {
  label: string;
  src?: string;
  alt?: string;
  /** A stand-in photo until the real one arrives. Tagged on screen and never shown in the public build. */
  placeholder?: boolean;
};

export type Subsection = {
  heading: string;
  body: Para[];
  flags?: Flag[];
  /** Shown in review mode only. Used where the document says to cut a section if the page ships. */
  reviewOnly?: boolean;
};

export type Project = {
  id: string;
  name: string;
  location: string;
  year: string;
  /** Default description, used where a page does not write its own. */
  summary?: string;
  photo?: ImageSlot;
  /** Guardrail: a project without written client permission never appears on the public site. */
  permissionOnFile: boolean;
};

export type ProjectEntry = { project: Project; text?: string; draft?: boolean };

export type Testimonial = {
  quote: string;
  name: string;
  role?: string;
  /** Guardrail: a testimonial without written permission never appears on the public site. */
  permissionOnFile: boolean;
};

export type Business = {
  name: string;
  legalName: string;
  street: string;
  locality: string;
  region: string;
  postalCode: string;
  phone: string;
  phoneHref: string;
  email?: string;
  hours: string;
  weekends: string;
  license: string;
  siteUrl: string;
};

export type Block =
  | {
      type: 'prose';
      id?: string;
      heading: string;
      body?: Para[];
      subsections?: Subsection[];
      flags?: Flag[];
    }
  | {
      type: 'offerings';
      id?: string;
      heading: string;
      items: { title: string; text?: string; href: string }[];
    }
  | {
      type: 'projects';
      id?: string;
      heading: string;
      image?: ImageSlot;
      items: ProjectEntry[];
      flags?: Flag[];
      cta?: Link;
    }
  | {
      type: 'places';
      id?: string;
      heading: string;
      items: { title: string; text?: string; link?: Link; flags?: Flag[] }[];
      after?: Para[];
      flags?: Flag[];
    }
  | {
      type: 'glance';
      heading?: string;
      rows: { label: string; value?: string; flags?: Flag[] }[];
    }
  | {
      type: 'faq';
      heading: string;
      items: { q: string; a?: Para[]; flags?: Flag[] }[];
    }
  | { type: 'image'; image: ImageSlot }
  | { type: 'testimonials'; id?: string; heading: string; items: Testimonial[] };

export type HeroCta = 'conversation' | 'work';

export type PageContent = {
  path: string;
  meta: { title: string; description: string };
  eyebrow?: string;
  hero: {
    h1: string;
    sub: string;
    trust?: string;
    ctas: HeroCta[];
    /** Where "See the work" points on this page. */
    workHref?: string;
    flags?: Flag[];
  };
  /** Page-level notes from the document, such as a recommendation to hold the page. */
  review?: Flag[];
  blocks: Block[];
  cta: { heading: string; text: string };
};

/** A header menu entry: a single link, or a dropdown when it has `links`. */
export type MenuItem = { label: string; href?: string; links?: Link[] };

export type Logo = { src: string; alt: string; width: number; height: number };

/** Everything around the pages: header menu, footer, logo, homepage film and shared wording. */
export type SiteChrome = {
  menu: MenuItem[];
  headerButton: Link;
  showPhoneInHeader: boolean;
  footerColumns: { title: string; links: Link[] }[];
  footerNote: string;
  logo: Logo;
  heroVideo: string;
  buttonLabels: { conversation: string; work: string };
  notFound: { heading: string; text: string };
  flags?: Flag[];
};

export type ContactContent = {
  path: string;
  meta: { title: string; description: string };
  h1: string;
  sub: string;
  review?: Flag[];
  whatHappens: { heading: string; body: string[] };
  getInTouchHeading: string;
  detailsFlags?: Flag[];
  formHeading: string;
  formFlags?: Flag[];
  stages: string[];
  directionsHeading: string;
  directionsFlags?: Flag[];
};
