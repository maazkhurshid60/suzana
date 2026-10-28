import { defineArrayMember, defineField, defineType } from 'sanity';
import { houseStyle } from '../copyRules';

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  fields: [
    defineField({ name: 'label', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'href',
      title: 'Address',
      type: 'string',
      description: 'A page on this site, like /services/custom-cabinetry/ or #recent-work.',
      validation: (r) => r.required(),
    }),
  ],
  preview: { select: { title: 'label', subtitle: 'href' } },
});

export const reviewNote = defineType({
  name: 'reviewNote',
  title: 'Review note',
  type: 'object',
  description:
    'Shown only in review mode, never on the website. On the free Sanity plan, published content can be read by anyone with the project ID, so keep sensitive detail in the copy document and point to it here.',
  fields: [
    defineField({
      name: 'kind',
      type: 'string',
      initialValue: 'input',
      options: {
        list: [
          { title: 'Client input needed', value: 'input' },
          { title: 'Draft for approval', value: 'draft' },
          { title: 'Decision needed', value: 'decision' },
          { title: 'Hold recommended', value: 'hold' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'text', type: 'text', rows: 3, validation: (r) => r.required() }),
  ],
  preview: { select: { title: 'text', subtitle: 'kind' } },
});

const reviewNotes = defineField({
  name: 'reviewNotes',
  title: 'Review notes',
  type: 'array',
  of: [defineArrayMember({ type: 'reviewNote' })],
});

export const paragraph = defineType({
  name: 'paragraph',
  title: 'Paragraph',
  type: 'object',
  fields: [
    defineField({ name: 'text', type: 'text', rows: 4, validation: (r) => [r.required(), houseStyle(r)] }),
    defineField({ name: 'links', title: 'Links after the paragraph', type: 'array', of: [defineArrayMember({ type: 'link' })] }),
    defineField({
      name: 'draft',
      title: 'Draft, waiting for approval',
      type: 'boolean',
      initialValue: false,
      description: 'Marks the paragraph in review mode. Untick once the client approves it.',
    }),
  ],
  preview: { select: { title: 'text', draft: 'draft' }, prepare: ({ title, draft }) => ({ title, subtitle: draft ? 'Draft' : undefined }) },
});

export const photoSlot = defineType({
  name: 'photoSlot',
  title: 'Photo',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'What photo goes here',
      type: 'string',
      description: 'Shown as a placeholder in review mode until a photo is uploaded.',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      description: 'No people in frame, no street numbers, no filenames naming the street or client.',
    }),
    defineField({
      name: 'alt',
      title: 'Description for screen readers',
      type: 'string',
      validation: (r) =>
        r.custom((alt, ctx) => {
          const parent = ctx.parent as { image?: unknown } | undefined;
          return parent?.image && !alt ? 'Describe the photo for visitors who cannot see it.' : true;
        }),
    }),
    defineField({
      name: 'placeholderSrc',
      title: 'Placeholder photo',
      type: 'string',
      readOnly: true,
      hidden: ({ value }) => !value,
      description:
        'A stand-in shown in review and preview until a real photo is uploaded above. Never shown on the public site. An uploaded photo always replaces it.',
    }),
  ],
  preview: { select: { title: 'label', media: 'image' } },
});

export const subsection = defineType({
  name: 'subsection',
  title: 'Subsection',
  type: 'object',
  fields: [
    defineField({ name: 'heading', type: 'string', validation: (r) => [r.required(), houseStyle(r)] }),
    defineField({ name: 'body', type: 'array', of: [defineArrayMember({ type: 'paragraph' })] }),
    reviewNotes,
    defineField({
      name: 'reviewOnly',
      title: 'Hide on the public site',
      type: 'boolean',
      initialValue: false,
      description: 'Keeps the subsection visible to reviewers only, for copy that has nothing behind it yet.',
    }),
  ],
  preview: { select: { title: 'heading' } },
});

export { reviewNotes };
