import { FileText, Hammer, MessageSquareQuote } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { pageBlocks } from './blocks';
import { houseStyle } from '../copyRules';
import { reviewNotes } from './objects';

const permissionOnFile = defineField({
  name: 'permissionOnFile',
  title: 'Written permission on file',
  type: 'boolean',
  initialValue: false,
  description: 'Required before this appears on the public site. Tick only once the written permission is filed.',
});

const seo = defineField({
  name: 'meta',
  title: 'Search engine listing',
  type: 'object',
  group: 'seo',
  fields: [
    // Length is advice (Google cuts long titles off), so it warns rather than blocking Publish.
    defineField({ name: 'title', type: 'string', validation: (r) => [r.required(), r.max(70).warning()] }),
    defineField({ name: 'description', type: 'text', rows: 3, validation: (r) => [r.required(), r.max(170).warning()] }),
  ],
});

export const page = defineType({
  name: 'page',
  icon: FileText,
  title: 'Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'Search' },
    { name: 'review', title: 'Review' },
  ],
  fields: [
    defineField({
      name: 'path',
      title: 'Page address',
      type: 'string',
      group: 'content',
      description: 'Starts and ends with a slash, like /services/custom-cabinetry/. Use / for the homepage.',
      validation: (r) =>
        r
          .required()
          .regex(/^\/([a-z0-9-]+\/)*$/, { name: 'address' })
          .custom((path) => (path === '/contact/' || path?.startsWith('/admin') || path?.startsWith('/api') ? 'This address is reserved.' : true)),
    }),
    defineField({ name: 'eyebrow', title: 'Small label above the title', type: 'string', group: 'content' }),
    defineField({
      name: 'hero',
      title: 'Top of page',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'h1', title: 'Main title', type: 'string', validation: (r) => [r.required(), houseStyle(r)] }),
        defineField({ name: 'sub', title: 'Sub-headline', type: 'text', rows: 2, validation: (r) => [r.required(), houseStyle(r)] }),
        defineField({ name: 'trust', title: 'Trust line', type: 'text', rows: 2, validation: houseStyle }),
        defineField({
          name: 'backgroundImage',
          title: 'Background photo',
          type: 'image',
          options: { hotspot: true },
          description: 'Shown behind the title, darkened so the text stays readable. Wide photos work best. Set the focus point to keep the subject in view.',
        }),
        defineField({
          name: 'ctas',
          title: 'Buttons',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          options: {
            list: [
              { title: 'Start a conversation', value: 'conversation' },
              { title: 'See the work', value: 'work' },
            ],
          },
          initialValue: ['conversation'],
        }),
        defineField({
          name: 'workHref',
          title: '“See the work” goes to',
          type: 'string',
          initialValue: '#recent-work',
          hidden: ({ parent }) => !parent?.ctas?.includes('work'),
        }),
        reviewNotes,
      ],
    }),
    defineField({ name: 'blocks', title: 'Sections', type: 'array', group: 'content', of: pageBlocks }),
    defineField({
      name: 'cta',
      title: 'Closing call to action',
      type: 'object',
      group: 'content',
      fields: [
        defineField({ name: 'heading', type: 'string', initialValue: 'Talk to Gar about your project', validation: houseStyle }),
        defineField({
          name: 'text',
          type: 'text',
          rows: 2,
          initialValue: 'Bring your site and your drawings, however far along they are. The first step is a conversation, not a quote.',
          validation: houseStyle,
        }),
      ],
    }),
    seo,
    defineField({ ...reviewNotes, title: 'Page review notes', group: 'review' }),
  ],
  orderings: [{ title: 'Address', name: 'pathAsc', by: [{ field: 'path', direction: 'asc' }] }],
  preview: { select: { title: 'hero.h1', subtitle: 'path' } },
});

export const project = defineType({
  name: 'project',
  icon: Hammer,
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Town', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'year', type: 'string', validation: (r) => r.required().regex(/^\d{4}$/, { name: 'year' }) }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 4,
      description: 'Used on any page that lists the project without writing its own description.',
      validation: houseStyle,
    }),
    defineField({ name: 'photo', type: 'photoSlot' }),
    permissionOnFile,
    reviewNotes,
  ],
  preview: {
    select: { title: 'name', location: 'location', year: 'year', ok: 'permissionOnFile', media: 'photo.image' },
    prepare: ({ title, location, year, ok, media }) => ({
      title,
      subtitle: `${location}, ${year}${ok ? '' : ' · no permission on file'}`,
      media,
    }),
  },
});

export const testimonial = defineType({
  name: 'testimonial',
  icon: MessageSquareQuote,
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'quote', type: 'text', rows: 4, validation: (r) => r.required() }),
    defineField({ name: 'name', title: 'Who said it', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Owner or architect, and which project', type: 'string' }),
    permissionOnFile,
  ],
  preview: { select: { title: 'name', subtitle: 'quote' } },
});

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Business details',
  type: 'document',
  description: 'Shown in the header, footer, contact page and search engine data. Only the Charter Oak address publishes.',
  fields: [
    defineField({ name: 'legalName', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'street', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'locality', title: 'Town', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'region', title: 'State', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'postalCode', title: 'ZIP code', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'phone', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'email', type: 'string', validation: (r) => r.email() }),
    defineField({ name: 'hours', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'weekends', type: 'string' }),
    defineField({ name: 'license', type: 'string', validation: (r) => r.required() }),
  ],
  preview: { prepare: () => ({ title: 'Business details' }) },
});

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'seo', title: 'Search' },
    { name: 'review', title: 'Review' },
  ],
  fields: [
    defineField({ name: 'h1', title: 'Main title', type: 'string', group: 'content', validation: (r) => [r.required(), houseStyle(r)] }),
    defineField({ name: 'sub', title: 'Sub-headline', type: 'string', group: 'content', validation: houseStyle }),
    defineField({
      name: 'heroImage',
      title: 'Background photo',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description: 'Shown behind the title, darkened so the text stays readable.',
    }),
    defineField({ name: 'whatHappensHeading', type: 'string', group: 'content' }),
    defineField({ name: 'whatHappens', type: 'array', group: 'content', of: [defineArrayMember({ type: 'text', validation: houseStyle })] }),
    defineField({ name: 'getInTouchHeading', type: 'string', group: 'content' }),
    defineField({ name: 'formHeading', type: 'string', group: 'content' }),
    defineField({
      name: 'stages',
      title: 'Project stage choices in the form',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({ name: 'directionsHeading', type: 'string', group: 'content' }),
    seo,
    defineField({ ...reviewNotes, title: 'Notes at the top of the page', group: 'review' }),
    defineField({ ...reviewNotes, name: 'detailsNotes', title: 'Notes under the contact details', group: 'review' }),
    defineField({ ...reviewNotes, name: 'formNotes', title: 'Notes under the form', group: 'review' }),
    defineField({ ...reviewNotes, name: 'directionsNotes', title: 'Notes on directions', group: 'review' }),
  ],
  preview: { prepare: () => ({ title: 'Contact page' }) },
});

const linkList = (name: string, title: string) =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'link' })] });

export const siteChrome = defineType({
  name: 'siteChrome',
  title: 'Header and footer',
  type: 'document',
  groups: [
    { name: 'header', title: 'Header', default: true },
    { name: 'footer', title: 'Footer' },
    { name: 'brand', title: 'Logo and film' },
    { name: 'wording', title: 'Shared wording' },
    { name: 'review', title: 'Review' },
  ],
  fields: [
    defineField({
      name: 'menu',
      title: 'Menu',
      type: 'array',
      group: 'header',
      description:
        'Left to right. On wide screens the first half of the items sits left of the logo and the rest on the right. An item with links becomes a dropdown. An item with only an address is a plain link.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'menuItem',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'href',
              title: 'Address (for a plain link)',
              type: 'string',
              hidden: ({ parent }) => Boolean(parent?.links?.length),
            }),
            linkList('links', 'Dropdown links'),
          ],
          validation: (r) =>
            r.custom((item: { href?: string; links?: unknown[] } | undefined) =>
              item?.href || item?.links?.length ? true : 'Give the item an address, or add dropdown links.',
            ),
          preview: {
            select: { title: 'label', href: 'href', links: 'links' },
            prepare: ({ title, href, links }) => ({ title, subtitle: links?.length ? `Dropdown, ${links.length} links` : href }),
          },
        }),
      ],
      validation: (r) => r.max(7),
    }),
    defineField({ name: 'headerButton', title: 'Header button', type: 'link', group: 'header' }),
    defineField({ name: 'showPhoneInHeader', title: 'Show the phone number in the header', type: 'boolean', group: 'header', initialValue: true }),
    defineField({
      name: 'footerColumns',
      title: 'Footer link columns',
      type: 'array',
      group: 'footer',
      description: 'The business name, address, phone, hours and licence come from Business details.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [defineField({ name: 'title', type: 'string', validation: (r) => r.required() }), linkList('links', 'Links')],
          preview: { select: { title: 'title' } },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({ name: 'footerNote', title: 'Small text, bottom right of the footer', type: 'string', group: 'footer', validation: houseStyle }),
    defineField({
      name: 'logo',
      type: 'image',
      group: 'brand',
      description: 'Dark logo on a transparent background. The footer shows it reversed to white.',
      fields: [defineField({ name: 'alt', title: 'Description for screen readers', type: 'string' })],
    }),
    defineField({
      name: 'heroVideo',
      title: 'Homepage film',
      type: 'file',
      group: 'brand',
      options: { accept: 'video/mp4' },
      description: 'MP4, muted, ideally under 15 MB. Plays behind the homepage headline.',
    }),
    defineField({
      name: 'buttonLabels',
      title: 'Button wording',
      type: 'object',
      group: 'wording',
      fields: [
        defineField({ name: 'conversation', title: 'Button that goes to the contact page', type: 'string', validation: houseStyle }),
        defineField({ name: 'work', title: 'Button that goes to the projects', type: 'string', validation: houseStyle }),
      ],
    }),
    defineField({
      name: 'notFound',
      title: 'Page-not-found message',
      type: 'object',
      group: 'wording',
      fields: [
        defineField({ name: 'heading', type: 'string', validation: houseStyle }),
        defineField({ name: 'text', type: 'text', rows: 2, validation: houseStyle }),
      ],
    }),
    defineField({ ...reviewNotes, title: 'Notes shown in the footer', group: 'review' }),
  ],
  preview: { prepare: () => ({ title: 'Header and footer' }) },
});
