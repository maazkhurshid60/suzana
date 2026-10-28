# Gar Rector & Associates website (Next.js)

Next.js 16 (App Router) + Tailwind, with a Sanity editing dashboard at `/admin`.
Rebuilt from the Readdy one-page export using *Gar Rector & Associates website copy, Pass 1*
as the source of truth for every word.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000, review mode
npm run build && npm start
```

## Pages

| URL | Starting content |
| --- | --- |
| `/` | `src/content/pages/home.ts` |
| `/services/custom-home-building/` | `custom-home-building.ts` |
| `/services/winery-estate-builds/` | `winery-estate-builds.ts` |
| `/services/luxury-home-remodeling/` | `luxury-home-remodeling.ts` |
| `/services/custom-cabinetry/` | `custom-cabinetry.ts` |
| `/napa-valley-custom-home-builder/` | `napa-valley.ts` |
| `/st-helena-custom-home-builder/` | `st-helena.ts` |
| `/sonoma-county-custom-home-builder/` | `sonoma-county.ts` |
| `/contact/` | `contact.ts` |

Not built, because the copy document leaves them unwritten until Gar's interview
(items 1, 2, 3, 4, 8, 10): Our Story (`/about/our-story/`), Gar Rector (`/about/gar-rector/`), FAQ (`/faq/`).
Once written they can be added from the dashboard with no code.

## The dashboard (`/admin`)

Editors can change everything on the site from the dashboard:

- **Projects**: add, edit and remove projects, with a photo and summary each. Add a project to any
  page's projects section and set its order there.
- **Pages**: edit every section of every page, reorder sections, add sections (text, service cards,
  projects, towns, at a glance, questions and answers, photos, testimonials), and create new pages.
  A new page works at the address it is given, with no code.
- **Testimonials**: add client quotes and place them on any page.
- **Contact page**: headings, text and the project-stage choices in the form.
- **Header and footer**: the menu (plain links and dropdowns, in any order), the header button,
  whether the phone number shows in the header, the footer link columns and footer note, the logo,
  the homepage film, the wording on shared buttons, and the page-not-found message.
- **Business details**: phone, email, address, hours and licence, used everywhere on the site.

Only the page layouts and the visual design need a developer. Everything a visitor reads, every
link and every photo is in the dashboard.

Guardrails from the copy document are built in:

- A project or testimonial appears on the public site only once **Written permission on file** is ticked.
- **Review notes** on any section show in review mode only and never reach the public site.
- Questions without an answer and "At a glance" rows without a value are hidden from the public site.
- **House style** is checked as editors type: an em dash, semicolon, exclamation point, the word
  "luxury", a price or a founding year shows a warning on the field before publishing.
- **Needs attention** (top of the sidebar) lists projects and testimonials without written
  permission, and every page that still has open review notes.
- **Open on site** (in a page's action menu) opens the published page in a new tab.

### Connecting it (one time)

Until a Sanity project is connected, the site runs from the files in `src/content` and `/admin`
shows these steps.

1. Create a free account and project at [sanity.io/manage](https://www.sanity.io/manage). Note the project ID.
2. In the project's **API** settings, add the site's address and `http://localhost:3000` as
   **CORS origins** with **Allow credentials** ticked.
3. Create `.env.local` (see `.env.example`) with `NEXT_PUBLIC_SANITY_PROJECT_ID=<your id>` and restart the site.
4. Copy the current content into the dashboard: `npx sanity login`, then `npm run seed-dashboard`.
   Safe to re-run: it replaces the same documents rather than duplicating them.
5. Invite editors from the project's **Members** page. They sign in at `/admin`.

### Publishing goes live

In development (`npm run dev`) every page load reads the dashboard fresh, so a published change
shows on the next refresh. Every build also starts fresh (`prebuild` clears the cached Sanity data,
which the host would otherwise carry over between deploys).

On the live site pages are cached and refresh at least hourly. For changes to go live within seconds, add a webhook
in the Sanity project's **API → Webhooks**:

- URL: `https://<site address>/api/revalidate/`
- Trigger on: create, update, delete. Dataset: `production`
- Secret: any long random string, also set as `SANITY_REVALIDATE_SECRET` on the host.

## Site modes

Set `NEXT_PUBLIC_SITE_MODE` in `.env.local` (local) or on the host:

| Mode | For | Shows |
| --- | --- | --- |
| `review` (default) | working through the copy document | every `[CLIENT INPUT]`, `[DRAFT]` and `[DECISION NEEDED]` flag inline, unanswered FAQs, empty rows and empty photo slots |
| `preview` | showing the client | a clean site: no flags, projects awaiting permission and placeholder photos included |
| `public` | launch | approved content only: no placeholders, no projects without permission |

Review and preview builds are `noindex` and `robots.txt` blocks everything, so neither can end up
in search results. The older `NEXT_PUBLIC_REVIEW_MODE=false` still means `public`.

**Placeholder photos** (`public/media/placeholders/`) are AI-generated stand-ins from the original
Readdy build, tagged "Placeholder photo" on screen. They are never shown in the public build. Replace
each with a real photo by uploading one in the dashboard, or by changing its `src` in `src/content`.

## Copy rules check

```bash
NEXT_PUBLIC_SITE_MODE=public npm run build && npm run check-copy
```

Fails on any em dash, semicolon, exclamation point, "luxury" in body copy, founding year
or dollar figure in the visible text of any page.

## Photos

Upload photos in the dashboard (project photo, or a photo slot in a page section). Without the
dashboard, drop a file in `public/media/` and add `src` and `alt` to the slot in `src/content`.
Rules from the document: no people in frame, no street numbers, no filenames naming the street or client.

## Navigation

- Every new page opens at the top. Links to a section (`#recent-work`) land on that section.
- A page skeleton shows while a page that was not prefetched is loading, and does not flash on
  instant navigations.

## Contact form

Posts to `/api/contact/`, which forwards JSON to `CONTACT_WEBHOOK_URL` (Formspree, Zapier,
Make or similar). Without it the form logs to the console in development and returns an
error in production, so set it before launch.

## Hosting

Deploy to Vercel or Netlify (the contact and revalidate routes need a Node runtime). Set the
environment variables from `.env.example` on the host.
