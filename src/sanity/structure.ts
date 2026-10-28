import type { StructureResolver } from 'sanity/structure';
import {
  Building2,
  CircleAlert,
  FileText,
  Hammer,
  Mail,
  MessageSquareQuote,
  NotebookPen,
  PanelsTopLeft,
  ShieldAlert,
} from 'lucide-react';

// Any review note, at any depth of a page. Nested lists are flattened first and filtered after,
// because flattening leaves a null for every section without notes, and count() would count those.
const PAGE_HAS_NOTES = `_type == "page" && (
  count(reviewNotes[defined(text)]) > 0 ||
  count(hero.reviewNotes[defined(text)]) > 0 ||
  count((blocks[].reviewNotes[])[defined(text)]) > 0 ||
  count((blocks[].subsections[].reviewNotes[])[defined(text)]) > 0 ||
  count((blocks[].items[].reviewNotes[])[defined(text)]) > 0 ||
  count((blocks[].rows[].reviewNotes[])[defined(text)]) > 0
)`;

/** The dashboard sidebar, in the order an editor reaches for things. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Gar Rector & Associates')
    .items([
      S.listItem()
        .title('Needs attention')
        .icon(CircleAlert)
        .child(
          S.list()
            .title('Needs attention')
            .items([
              S.listItem()
                .title('Projects without written permission')
                .icon(ShieldAlert)
                .child(
                  S.documentList()
                    .title('Hidden from the public site until permission is on file')
                    .schemaType('project')
                    .filter('_type == "project" && permissionOnFile != true'),
                ),
              S.listItem()
                .title('Testimonials without written permission')
                .icon(ShieldAlert)
                .child(
                  S.documentList()
                    .title('Hidden from the public site until permission is on file')
                    .schemaType('testimonial')
                    .filter('_type == "testimonial" && permissionOnFile != true'),
                ),
              S.listItem()
                .title('Pages with open review notes')
                .icon(NotebookPen)
                .child(S.documentList().title('Pages with open review notes').schemaType('page').filter(PAGE_HAS_NOTES)),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Projects')
        .icon(Hammer)
        .child(S.documentTypeList('project').title('Projects').defaultOrdering([{ field: 'year', direction: 'desc' }])),
      S.listItem()
        .title('Pages')
        .icon(FileText)
        .child(S.documentTypeList('page').title('Pages').defaultOrdering([{ field: 'path', direction: 'asc' }])),
      S.listItem().title('Testimonials').icon(MessageSquareQuote).child(S.documentTypeList('testimonial').title('Testimonials')),
      S.divider(),
      S.listItem()
        .title('Contact page')
        .icon(Mail)
        .child(S.document().schemaType('contactPage').documentId('contactPage').title('Contact page')),
      S.listItem()
        .title('Header and footer')
        .icon(PanelsTopLeft)
        .child(S.document().schemaType('siteChrome').documentId('siteChrome').title('Header and footer')),
      S.listItem()
        .title('Business details')
        .icon(Building2)
        .child(S.document().schemaType('siteSettings').documentId('siteSettings').title('Business details')),
    ]);
