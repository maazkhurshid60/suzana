// Builds the dashboard documents from the local content (src/content). Pure, so the import can be
// tested without a Sanity project. Used by seed-sanity.ts.
import { contact, pages } from '../src/content/pages';
import { business, chrome, projects } from '../src/content/site';
import type { Block, Flag, ImageSlot, Link, PageContent, Para } from '../src/content/types';

let n = 0;
const key = () => `k${(n++).toString(36)}${Math.random().toString(36).slice(2, 8)}`;
const withKey = <T extends object>(obj: T) => ({ _key: key(), ...obj });

// On Sanity's free plan the dataset is public: anyone with the project ID can read published
// documents. Review notes therefore go in as neutral pointers to the copy document's open items,
// and the internal detail stays in the (private) copy document.
const pointers: Record<Flag['kind'], string> = {
  input: 'Client input needed',
  draft: 'Draft waiting for approval',
  decision: 'Decision needed',
  hold: 'Publishing recommendation',
};
export const publicNote = (f: Flag) => {
  const item = f.text.match(/^Items? \d+(?:(?:, | and )\d+)*/)?.[0];
  return `${item ? `${pointers[f.kind]}, ${item.toLowerCase()}` : pointers[f.kind]}. See the copy document.`;
};
const notes = (flags?: Flag[]) => {
  const unique = [...new Map((flags ?? []).map((f) => [publicNote(f), f])).values()];
  return unique.map((f) => withKey({ _type: 'reviewNote', kind: f.kind, text: publicNote(f) }));
};
const links = (list?: Link[]) => (list ?? []).map((l) => withKey({ _type: 'link', label: l.label, href: l.href }));
const paragraph = (p: Para) =>
  typeof p === 'string'
    ? withKey({ _type: 'paragraph', text: p, draft: false })
    : withKey({ _type: 'paragraph', text: p.text, links: links(p.links), draft: Boolean(p.draft) });
const paragraphs = (list?: Para[]) => (list ?? []).map(paragraph);
// Real photos are uploaded in the dashboard. Placeholders travel as a path to the file in public/media.
const photo = (slot?: ImageSlot) =>
  slot ? { _type: 'photoSlot', label: slot.label, placeholderSrc: slot.placeholder ? slot.src : undefined } : undefined;
// Document IDs use dashes, never dots: in Sanity a dot puts a document on a private path that the
// public website cannot read.
const projectRef = (id: string) => ({ _type: 'reference', _ref: `project-${id}` });

function block(b: Block) {
  const anchor = 'id' in b ? b.id : undefined;
  switch (b.type) {
    case 'prose':
      return withKey({
        _type: 'proseBlock',
        heading: b.heading,
        anchor,
        body: paragraphs(b.body),
        subsections: (b.subsections ?? []).map((s) =>
          withKey({ _type: 'subsection', heading: s.heading, body: paragraphs(s.body), reviewNotes: notes(s.flags), reviewOnly: Boolean(s.reviewOnly) }),
        ),
        reviewNotes: notes(b.flags),
      });
    case 'offerings':
      return withKey({
        _type: 'offeringsBlock',
        heading: b.heading,
        anchor,
        items: b.items.map((i) => withKey({ _type: 'offering', title: i.title, text: i.text, href: i.href })),
      });
    case 'projects':
      return withKey({
        _type: 'projectsBlock',
        heading: b.heading,
        anchor,
        photo: photo(b.image),
        items: b.items.map((i) => withKey({ _type: 'projectEntry', project: projectRef(i.project.id), text: i.text, draft: Boolean(i.draft) })),
        cta: b.cta ? { _type: 'link', ...b.cta } : undefined,
        reviewNotes: notes(b.flags),
      });
    case 'places':
      return withKey({
        _type: 'placesBlock',
        heading: b.heading,
        anchor,
        items: b.items.map((i) =>
          withKey({ _type: 'place', title: i.title, text: i.text, link: i.link ? { _type: 'link', ...i.link } : undefined, reviewNotes: notes(i.flags) }),
        ),
        after: paragraphs(b.after),
        reviewNotes: notes(b.flags),
      });
    case 'glance':
      return withKey({
        _type: 'glanceBlock',
        heading: b.heading,
        rows: b.rows.map((r) => withKey({ _type: 'glanceRow', label: r.label, value: r.value, reviewNotes: notes(r.flags) })),
      });
    case 'faq':
      return withKey({
        _type: 'faqBlock',
        heading: b.heading,
        items: b.items.map((i) => withKey({ _type: 'faq', question: i.q, answer: paragraphs(i.a), reviewNotes: notes(i.flags) })),
      });
    case 'image':
      return withKey({ _type: 'imageBlock', photo: photo(b.image) });
    case 'testimonials':
      return null; // No testimonials exist on file yet (copy document item 6).
  }
}

export function pageDoc(page: PageContent) {
  const id = page.path === '/' ? 'home' : page.path.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  return {
    _id: `page-${id}`,
    _type: 'page',
    path: page.path,
    eyebrow: page.eyebrow,
    hero: { ...page.hero, flags: undefined, reviewNotes: notes(page.hero.flags) },
    blocks: page.blocks.map(block).filter(Boolean),
    cta: page.cta,
    meta: page.meta,
    reviewNotes: notes(page.review),
  };
}

export function buildDocuments() {
  const docs: Record<string, unknown>[] = [];

  docs.push({
    _id: 'siteSettings',
    _type: 'siteSettings',
    legalName: business.legalName,
    street: business.street,
    locality: business.locality,
    region: business.region,
    postalCode: business.postalCode,
    phone: business.phone,
    hours: business.hours,
    weekends: business.weekends,
    license: business.license,
  });

  // Logo and homepage film stay as the files in public/media until replaced in the dashboard.
  docs.push({
    _id: 'siteChrome',
    _type: 'siteChrome',
    menu: chrome.menu.map((m) => withKey({ _type: 'menuItem', label: m.label, href: m.href, links: links(m.links) })),
    headerButton: { _type: 'link', ...chrome.headerButton },
    showPhoneInHeader: chrome.showPhoneInHeader,
    footerColumns: chrome.footerColumns.map((c) => withKey({ _type: 'footerColumn', title: c.title, links: links(c.links) })),
    footerNote: chrome.footerNote,
    buttonLabels: chrome.buttonLabels,
    notFound: chrome.notFound,
    reviewNotes: notes(chrome.flags),
  });

  for (const p of Object.values(projects)) {
    docs.push({
      _id: `project-${p.id}`,
      _type: 'project',
      name: p.name,
      location: p.location,
      year: p.year,
      // Only the label: placeholder photos stay in the code, and real photos are uploaded in the dashboard.
      photo: photo(p.photo),
      permissionOnFile: p.permissionOnFile,
      reviewNotes: notes([{ kind: 'input', text: 'Item 5. Written client permission needed before this project publishes.' }]),
    });
  }

  for (const page of Object.values(pages)) docs.push(pageDoc(page));

  docs.push({
    _id: 'contactPage',
    _type: 'contactPage',
    meta: contact.meta,
    h1: contact.h1,
    sub: contact.sub,
    whatHappensHeading: contact.whatHappens.heading,
    whatHappens: contact.whatHappens.body,
    getInTouchHeading: contact.getInTouchHeading,
    formHeading: contact.formHeading,
    stages: contact.stages,
    directionsHeading: contact.directionsHeading,
    reviewNotes: notes(contact.review),
    detailsNotes: notes(contact.detailsFlags),
    formNotes: notes(contact.formFlags),
    directionsNotes: notes(contact.directionsFlags),
  });

    return docs;
}
