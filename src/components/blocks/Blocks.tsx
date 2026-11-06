import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';
import type { Block, ProjectEntry } from '@/content/types';
import { hasPhoto, isPublishable, REVIEW_MODE } from '@/lib/review';
import { DraftChip, Flags } from '../Flags';
import { ImageFrame } from '../ImageFrame';
import { Paragraph } from '../Paragraph';
import { Reveal } from '../Reveal';
import { Section, SectionHeading, SectionNumber, type Tone } from './Section';

// n is the section's position on the page, set as a drawing note above its heading.
type Props<T extends Block['type']> = { block: Extract<Block, { type: T }>; tone: Tone; n?: number };

const body = 'text-base leading-[1.75] text-muted md:text-[17px]';

/** Heading on the left, body on the right. Subsections read as numbered notes divided by hairlines. */
export function ProseBlock({ block, tone, n }: Props<'prose'>) {
  const subsections = block.subsections?.filter((s) => REVIEW_MODE || !s.reviewOnly);
  return (
    <Section id={block.id} tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionNumber n={n} className="mb-7" />
          <SectionHeading>{block.heading}</SectionHeading>
        </Reveal>
        <Reveal>
          {block.body?.map((para, i) => (
            <Paragraph key={i} para={para} className={`${i ? 'mt-6' : ''} ${i === 0 && subsections?.length ? 'font-heading text-2xl leading-snug text-ink md:text-[1.75rem]' : body}`} />
          ))}
          {subsections?.length ? (
            <div className={`${block.body?.length ? 'mt-14' : ''} border-t border-line`}>
              {subsections.map((sub, i) => (
                <div key={sub.heading} className="grid gap-3 border-b border-line py-9 md:grid-cols-[72px_1fr] md:gap-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bronze md:pt-2.5">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-[1.6rem] leading-tight text-ink md:text-[1.9rem]">{sub.heading.replace(/^\d+\.\s*/, '')}</h3>
                    {sub.body.map((para, j) => (
                      <Paragraph key={j} para={para} className={`mt-4 ${body}`} />
                    ))}
                    <Flags flags={sub.flags} className="mt-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          <Flags flags={block.flags} className="mt-6" />
        </Reveal>
      </div>
    </Section>
  );
}

/** The services, as a ruled index of four. */
export function OfferingsBlock({ block, tone, n }: Props<'offerings'>) {
  return (
    <Section id={block.id} tone={tone}>
      <Reveal>
        <SectionNumber n={n} className="mb-7" />
        <SectionHeading>{block.heading}</SectionHeading>
      </Reveal>
      {/* The 1px gaps show the line colour behind, drawing hairlines between the cells. */}
      <Reveal className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {block.items.map((item, idx) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col bg-paper p-7 transition-colors duration-300 hover:bg-paper-deep md:p-8"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bronze">{String(idx + 1).padStart(2, '0')}</span>
            <h3 className="mt-6 text-[1.75rem] leading-tight text-ink">{item.title}</h3>
            {item.text && <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{item.text}</p>}
            <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-all group-hover:gap-3.5 group-hover:text-bronze">
              Explore
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </span>
          </Link>
        ))}
      </Reveal>
    </Section>
  );
}

function ProjectCard({ entry, idx, lead }: { entry: ProjectEntry; idx: number; lead?: boolean }) {
  const { project, text, draft } = entry;
  return (
    <article className="group">
      {hasPhoto(project.photo) && project.photo && (
        <ImageFrame
          image={project.photo}
          className={`${lead ? 'aspect-[4/3]' : 'aspect-[16/10]'} [&_img]:transition-transform [&_img]:duration-[1.2s] group-hover:[&_img]:scale-[1.03]`}
        />
      )}
      <div className="mt-6 flex items-baseline justify-between gap-6 border-t border-line pt-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bronze">
          {project.location}
          {project.year ? `  ·  ${project.year}` : ''}
        </p>
        <span className="font-mono text-[11px] tracking-[0.2em] text-muted">{String(idx + 1).padStart(2, '0')}</span>
      </div>
      <h3 className={`mt-3 leading-tight text-ink ${lead ? 'text-[2.1rem] md:text-[2.6rem]' : 'text-[1.7rem]'}`}>
        {project.name}
        {draft && <DraftChip />}
      </h3>
      {(text ?? project.summary) && <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">{text ?? project.summary}</p>}
      {!project.permissionOnFile && (
        <Flags
          flags={[{ kind: 'input', text: 'No written permission on file. Hidden on the public site until it is ticked in the dashboard.' }]}
          className="mt-5"
        />
      )}
    </article>
  );
}

/** Named projects: one lead plate and the rest beside it, like a monograph spread. */
export function ProjectsBlock({ block, tone, n }: Props<'projects'>) {
  const items = block.items.filter((entry) => isPublishable(entry.project));
  if (!items.length && !hasPhoto(block.image) && !REVIEW_MODE) return null;
  const [lead, ...rest] = items;
  return (
    <Section id={block.id} tone={tone}>
      <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionNumber n={n} className="mb-7" />
          <SectionHeading>{block.heading}</SectionHeading>
        </div>
        {block.cta && (
          <Link href={block.cta.href} className="text-link shrink-0 self-start text-ink hover:text-bronze md:self-auto">
            {block.cta.label}
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </Link>
        )}
      </Reveal>
      {block.image && <ImageFrame image={block.image} className="mt-14 aspect-[16/9] md:aspect-[21/9]" />}
      {lead && (
        <Reveal className={`mt-14 grid gap-14 ${rest.length ? 'lg:grid-cols-12 lg:gap-12' : ''}`}>
          <div className={rest.length ? 'lg:col-span-7' : 'max-w-4xl'}>
            <ProjectCard entry={lead} idx={0} lead />
          </div>
          {rest.length > 0 && (
            <div className="grid gap-14 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-12">
              {rest.map((entry, i) => (
                <ProjectCard key={entry.project.id} entry={entry} idx={i + 1} />
              ))}
            </div>
          )}
        </Reveal>
      )}
      <Flags flags={block.flags} className="mt-8 max-w-3xl" />
    </Section>
  );
}

/** Towns and regions, as a ruled list. */
export function PlacesBlock({ block, tone, n }: Props<'places'>) {
  return (
    <Section id={block.id} tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <SectionNumber n={n} className="mb-7" />
          <SectionHeading>{block.heading}</SectionHeading>
        </Reveal>
        <Reveal className="border-t border-line">
          {block.items.map((place) => (
            <div key={place.title} className="border-b border-line py-8">
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-[1.75rem] leading-tight text-ink">{place.title}</h3>
                {place.link && (
                  <Link href={place.link.href} className="text-link shrink-0 text-ink hover:text-bronze">
                    {place.link.label}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </Link>
                )}
              </div>
              {place.text && <p className={`mt-3 ${body}`}>{place.text}</p>}
              <Flags flags={place.flags} className="mt-4" />
            </div>
          ))}
          {block.after?.map((para, i) => (
            <Paragraph key={i} para={para} className={`mt-8 ${body}`} />
          ))}
          <Flags flags={block.flags} className="mt-8" />
        </Reveal>
      </div>
    </Section>
  );
}

/** The operations table, set like the title block of a drawing. Rows without a confirmed value appear in review mode only. */
export function GlanceBlock({ block, n }: Props<'glance'>) {
  const rows = block.rows.filter((row) => row.value || REVIEW_MODE);
  return (
    <Section tone="deep">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <SectionNumber n={n} className="mb-7" />
          <SectionHeading>{block.heading ?? 'At a glance'}</SectionHeading>
        </Reveal>
        <Reveal>
          <dl className="border-t border-ink/80">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-2 border-b border-line py-6 md:grid-cols-[220px_1fr] md:gap-10">
                <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-bronze md:pt-1">{row.label}</dt>
                <dd className="text-base leading-relaxed text-ink md:text-[17px]">
                  {row.value}
                  <Flags flags={row.flags} className={row.value ? 'mt-3' : ''} />
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

/** FAQs as native disclosure widgets. Unanswered questions appear in review mode only. */
export function FaqBlock({ block, tone, n }: Props<'faq'>) {
  const items = block.items.filter((item) => item.a?.length || REVIEW_MODE);
  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <SectionNumber n={n} className="mb-7" />
          <SectionHeading>{block.heading}</SectionHeading>
        </Reveal>
        <Reveal className="border-t border-line">
          {items.map((item) => (
            <details
              key={item.q}
              open={REVIEW_MODE && !!item.flags?.length}
              className="group border-b border-line py-7 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-8">
                <h3 className="text-[1.4rem] leading-snug text-ink transition-colors group-hover:text-bronze md:text-[1.6rem]">{item.q}</h3>
                <Plus className="mt-2 h-4 w-4 shrink-0 text-bronze transition-transform duration-300 group-open:rotate-45" strokeWidth={1.5} />
              </summary>
              {item.a?.map((para, i) => (
                <Paragraph key={i} para={para} className={`mt-4 max-w-2xl ${body}`} />
              ))}
              <Flags flags={item.flags} className="mt-4" />
            </details>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}

export function ImageBlock({ block, tone }: Props<'image'>) {
  if (!hasPhoto(block.image) && !REVIEW_MODE) return null;
  return (
    <Section tone={tone}>
      <ImageFrame image={block.image} className="aspect-[16/10] md:aspect-[21/9]" />
    </Section>
  );
}

/** Client quotes. Only quotes with written permission on file reach the public site. */
export function TestimonialsBlock({ block, tone, n }: Props<'testimonials'>) {
  const items = block.items.filter(isPublishable);
  if (!items.length) return null;
  return (
    <Section id={block.id} tone={tone}>
      <Reveal>
        <SectionNumber n={n} className="mb-7" />
        <SectionHeading>{block.heading}</SectionHeading>
      </Reveal>
      <Reveal className={`mt-14 grid gap-12 border-t border-line pt-12 ${items.length > 1 ? 'md:grid-cols-2' : 'max-w-3xl'}`}>
        {items.map((t) => (
          <figure key={t.name + t.quote.slice(0, 20)} className="flex flex-col">
            <blockquote className="font-heading text-[1.75rem] font-light leading-snug text-ink">“{t.quote}”</blockquote>
            <figcaption className="mt-7 font-mono text-[11px] uppercase tracking-[0.2em] text-bronze">
              {t.name}
              {t.role && <span className="text-muted">  ·  {t.role}</span>}
            </figcaption>
            {!t.permissionOnFile && (
              <Flags flags={[{ kind: 'input', text: 'No written permission on file. Hidden on the public site.' }]} className="mt-5" />
            )}
          </figure>
        ))}
      </Reveal>
    </Section>
  );
}
