import { AlignLeft, CircleHelp, Hammer, ImageIcon, LayoutGrid, ListChecks, MapPin, Quote } from 'lucide-react';
import { defineArrayMember, defineField, defineType } from 'sanity';
import { houseStyle } from '../copyRules';
import { reviewNotes } from './objects';

const anchor = defineField({
  name: 'anchor',
  title: 'Anchor',
  type: 'string',
  description: 'Optional. Lets links jump to this section, like recent-work for #recent-work.',
});

const heading = defineField({ name: 'heading', type: 'string', validation: (r) => [r.required(), houseStyle(r)] });

const paragraphs = (name: string, title?: string) =>
  defineField({ name, title, type: 'array', of: [defineArrayMember({ type: 'paragraph' })] });

export const proseBlock = defineType({
  name: 'proseBlock',
  icon: AlignLeft,
  title: 'Text section',
  type: 'object',
  fields: [
    heading,
    anchor,
    paragraphs('body'),
    defineField({ name: 'subsections', type: 'array', of: [defineArrayMember({ type: 'subsection' })] }),
    reviewNotes,
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Text section' }) },
});

export const offeringsBlock = defineType({
  name: 'offeringsBlock',
  icon: LayoutGrid,
  title: 'Service cards',
  type: 'object',
  fields: [
    heading,
    anchor,
    defineField({
      name: 'items',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'offering',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'text', type: 'text', rows: 2, validation: houseStyle }),
            defineField({ name: 'href', title: 'Links to', type: 'string', validation: (r) => r.required() }),
          ],
        }),
      ],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Service cards' }) },
});

export const projectsBlock = defineType({
  name: 'projectsBlock',
  icon: Hammer,
  title: 'Projects',
  type: 'object',
  fields: [
    heading,
    anchor,
    defineField({ name: 'photo', title: 'Full-width photo under the heading', type: 'photoSlot' }),
    defineField({
      name: 'items',
      title: 'Projects to show',
      type: 'array',
      description: 'Projects without written permission on file are hidden from the public site.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'projectEntry',
          fields: [
            defineField({ name: 'project', type: 'reference', to: [{ type: 'project' }], validation: (r) => r.required() }),
            defineField({
              name: 'text',
              title: 'Description on this page',
              type: 'text',
              rows: 4,
              description: 'Leave empty to use the project’s own summary.',
              validation: houseStyle,
            }),
            defineField({ name: 'draft', title: 'Draft, waiting for approval', type: 'boolean', initialValue: false }),
          ],
          preview: { select: { title: 'project.name', subtitle: 'text', media: 'project.photo.image' } },
        }),
      ],
    }),
    defineField({ name: 'cta', title: 'Button', type: 'link' }),
    reviewNotes,
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Projects' }) },
});

export const placesBlock = defineType({
  name: 'placesBlock',
  icon: MapPin,
  title: 'Towns',
  type: 'object',
  fields: [
    heading,
    anchor,
    defineField({
      name: 'items',
      title: 'Towns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'place',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'text', type: 'text', rows: 2, validation: houseStyle }),
            defineField({ name: 'link', type: 'link' }),
            reviewNotes,
          ],
        }),
      ],
    }),
    paragraphs('after', 'Text after the towns'),
    reviewNotes,
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Towns' }) },
});

export const glanceBlock = defineType({
  name: 'glanceBlock',
  icon: ListChecks,
  title: 'At a glance',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', initialValue: 'At a glance', validation: houseStyle }),
    defineField({
      name: 'rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'glanceRow',
          fields: [
            defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
            defineField({
              name: 'value',
              type: 'text',
              rows: 2,
              description: 'Rows without a value are hidden from the public site.',
              validation: houseStyle,
            }),
            reviewNotes,
          ],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: 'At a glance' }) },
});

export const faqBlock = defineType({
  name: 'faqBlock',
  icon: CircleHelp,
  title: 'Questions and answers',
  type: 'object',
  fields: [
    defineField({ ...heading, initialValue: 'Frequently asked questions' }),
    defineField({
      name: 'items',
      title: 'Questions',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [
            defineField({ name: 'question', type: 'string', validation: (r) => [r.required(), houseStyle(r)] }),
            defineField({
              name: 'answer',
              type: 'array',
              of: [defineArrayMember({ type: 'paragraph' })],
              description: 'Questions without an answer are hidden from the public site.',
            }),
            reviewNotes,
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Questions and answers' }) },
});

export const imageBlock = defineType({
  name: 'imageBlock',
  icon: ImageIcon,
  title: 'Full-width photo',
  type: 'object',
  fields: [defineField({ name: 'photo', type: 'photoSlot' })],
  preview: { select: { title: 'photo.label', media: 'photo.image' }, prepare: ({ title, media }) => ({ title: title ?? 'Photo', subtitle: 'Full-width photo', media }) },
});

export const testimonialsBlock = defineType({
  name: 'testimonialsBlock',
  icon: Quote,
  title: 'Testimonials',
  type: 'object',
  fields: [
    heading,
    anchor,
    defineField({
      name: 'items',
      title: 'Testimonials',
      type: 'array',
      description: 'Testimonials without written permission on file are hidden from the public site.',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'testimonial' }] })],
    }),
  ],
  preview: { select: { title: 'heading' }, prepare: ({ title }) => ({ title, subtitle: 'Testimonials' }) },
});

export const pageBlocks = [
  'proseBlock',
  'offeringsBlock',
  'projectsBlock',
  'placesBlock',
  'glanceBlock',
  'faqBlock',
  'imageBlock',
  'testimonialsBlock',
].map((type) => defineArrayMember({ type }));
