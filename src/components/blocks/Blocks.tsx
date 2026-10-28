import Link from 'next/link';
import { ArrowUpRight, Plus, Quote } from 'lucide-react';
import type { Block } from '@/content/types';
import { hasPhoto, isPublishable, REVIEW_MODE } from '@/lib/review';
import { ButtonLink } from '../Buttons';
import { DraftChip, Flags } from '../Flags';
import { ImageFrame } from '../ImageFrame';
import { Paragraph } from '../Paragraph';
import { Reveal } from '../Reveal';
import { Section, SectionHeading, type Tone } from './Section';

type Props<T extends Block['type']> = { block: Extract<Block, { type: T }>; tone: Tone };

/** Heading on the left, body and subsections on the right. */
export function ProseBlock({ block, tone }: Props<'prose'>) {
  const subsections = block.subsections?.filter((s) => REVIEW_MODE || !s.reviewOnly);
  return (
    <Section id={block.id} tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <SectionHeading className="lg:sticky lg:top-32">{block.heading}</SectionHeading>
        </Reveal>
        <Reveal>
          {block.body?.map((para, i) => (
            <Paragraph
              key={i}
              para={para}
              className={`${i ? 'mt-5' : ''} text-base leading-relaxed text-neutral-600 md:text-lg`}
            />
          ))}
          {subsections?.length ? (
            <div className={`${block.body?.length ? 'mt-10' : ''} divide-y divide-neutral-200 border-y border-neutral-200`}>
              {subsections.map((sub) => (
                <div key={sub.heading} className="py-8">
                  <h3 className="font-heading text-2xl text-neutral-950 md:text-[28px]">{sub.heading}</h3>
                  {sub.body.map((para, i) => (
                    <Paragraph key={i} para={para} className="mt-3 text-base leading-relaxed text-neutral-600" />
                  ))}
                  <Flags flags={sub.flags} className="mt-4" />
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

/** The four services as linked cards. */
export function OfferingsBlock({ block, tone }: Props<'offerings'>) {
  return (
    <Section id={block.id} tone={tone}>
      <Reveal>
        <SectionHeading>{block.heading}</SectionHeading>
      </Reveal>
      <Reveal className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {block.items.map((item, idx) => (
          <Link
            key={item.href}
            href={item.href}
            className="group flex flex-col rounded-[22px] border border-neutral-200 bg-white p-7 transition-all hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-heading text-4xl text-neutral-300 transition-colors group-hover:text-neutral-400">
                0{idx + 1}
              </span>
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors group-hover:border-black group-hover:bg-black group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <h3 className="mt-8 font-heading text-2xl text-neutral-950">{item.title}</h3>
            {item.text && <p className="mt-3 flex-1 text-sm leading-relaxed text-neutral-600">{item.text}</p>}
          </Link>
        ))}
      </Reveal>
    </Section>
  );
}

/** Named projects, with an optional full-width photo beneath the heading. */
export function ProjectsBlock({ block, tone }: Props<'projects'>) {
  const items = block.items.filter((entry) => isPublishable(entry.project));
  if (!items.length && !hasPhoto(block.image) && !REVIEW_MODE) return null;
  const cols = items.length >= 3 ? 'lg:grid-cols-3' : items.length === 2 ? 'md:grid-cols-2' : 'max-w-3xl';
  return (
    <Section id={block.id} tone={tone}>
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading>{block.heading}</SectionHeading>
        {block.cta && (
          <div className="shrink-0">
            <ButtonLink href={block.cta.href} variant="outline-dark" icon="up-right">
              {block.cta.label}
            </ButtonLink>
          </div>
        )}
      </Reveal>
      {block.image && <ImageFrame image={block.image} className="mt-12 h-[320px] md:h-[520px]" />}
      {items.length > 0 && (
        <Reveal className={`mt-12 grid gap-5 ${cols}`}>
          {items.map(({ project, text, draft }, idx) => (
            <article
              key={project.id}
              className="flex flex-col overflow-hidden rounded-[22px] border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.3)]"
            >
              {hasPhoto(project.photo) && project.photo && <ImageFrame image={project.photo} className="h-56 rounded-none md:h-64" />}
              <div className="flex flex-1 flex-col p-7 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-label text-xs uppercase tracking-[0.22em] text-neutral-500">
                    {project.location}, {project.year}
                  </p>
                  <span className="font-heading text-3xl leading-none text-neutral-300">{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-3 font-heading text-3xl text-neutral-950">
                  {project.name}
                  {draft && <DraftChip />}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">{text ?? project.summary}</p>
                {!project.permissionOnFile && (
                  <Flags
                    flags={[{ kind: 'input', text: 'No written permission on file. Hidden on the public site until it is ticked in the dashboard.' }]}
                    className="mt-5"
                  />
                )}
              </div>
            </article>
          ))}
        </Reveal>
      )}
      <Flags flags={block.flags} className="mt-8 max-w-3xl" />
    </Section>
  );
}

/** Towns and regions. */
export function PlacesBlock({ block, tone }: Props<'places'>) {
  return (
    <Section id={block.id} tone={tone}>
      <Reveal>
        <SectionHeading>{block.heading}</SectionHeading>
      </Reveal>
      <Reveal className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-neutral-200 bg-neutral-200 sm:grid-cols-2">
        {block.items.map((place) => (
          <div key={place.title} className="flex flex-col bg-white p-7 md:p-8">
            <div className="flex items-center gap-3">
              <Plus className="h-4 w-4 text-neutral-400" />
              <h3 className="font-heading text-2xl text-neutral-950">{place.title}</h3>
            </div>
            {place.text && <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{place.text}</p>}
            {place.link && (
              <Link
                href={place.link.href}
                className="group mt-4 inline-flex items-center gap-1 self-start font-label text-[13px] font-semibold uppercase tracking-wide text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900"
              >
                {place.link.label}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            )}
            <Flags flags={place.flags} className="mt-4" />
          </div>
        ))}
      </Reveal>
      {block.after?.map((para, i) => (
        <Paragraph key={i} para={para} className="mt-8 max-w-3xl text-base leading-relaxed text-neutral-600 md:text-lg" />
      ))}
      <Flags flags={block.flags} className="mt-8 max-w-3xl" />
    </Section>
  );
}

/** The "At a glance" attribute box. Rows without a confirmed value appear in review mode only. */
export function GlanceBlock({ block, tone }: Props<'glance'>) {
  const rows = block.rows.filter((row) => row.value || REVIEW_MODE);
  return (
    <Section tone={tone}>
      <Reveal className="overflow-hidden rounded-[28px] bg-neutral-950 p-7 text-white md:p-12">
        <h2 className="text-3xl md:text-4xl">{block.heading ?? 'At a glance'}</h2>
        <dl className="mt-8 divide-y divide-white/10 border-t border-white/10">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-2 py-5 md:grid-cols-[260px_1fr] md:gap-10">
              <dt className="font-label text-xs uppercase tracking-[0.2em] text-neutral-400 md:pt-1">{row.label}</dt>
              <dd className="text-base leading-relaxed text-neutral-100">
                {row.value}
                <Flags flags={row.flags} className={row.value ? 'mt-3' : ''} />
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}

/** FAQs as native disclosure widgets. Unanswered questions appear in review mode only. */
export function FaqBlock({ block, tone }: Props<'faq'>) {
  const items = block.items.filter((item) => item.a?.length || REVIEW_MODE);
  return (
    <Section id="faq" tone={tone}>
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <SectionHeading className="lg:sticky lg:top-32">{block.heading}</SectionHeading>
        </Reveal>
        <Reveal className="divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map((item) => (
            <details
              key={item.q}
              open={REVIEW_MODE && !!item.flags?.length}
              className="group py-6 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <h3 className="font-heading text-xl leading-snug text-neutral-950 md:text-2xl">{item.q}</h3>
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-transform group-open:rotate-45">
                  <Plus className="h-4 w-4" />
                </span>
              </summary>
              {item.a?.map((para, i) => (
                <Paragraph key={i} para={para} className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-600" />
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
      <ImageFrame image={block.image} className="h-[320px] md:h-[560px]" />
    </Section>
  );
}

/** Client quotes. Only quotes with written permission on file reach the public site. */
export function TestimonialsBlock({ block, tone }: Props<'testimonials'>) {
  const items = block.items.filter(isPublishable);
  if (!items.length) return null;
  return (
    <Section id={block.id} tone={tone}>
      <Reveal>
        <SectionHeading>{block.heading}</SectionHeading>
      </Reveal>
      <Reveal className={`mt-12 grid gap-5 ${items.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : 'max-w-3xl'}`}>
        {items.map((t) => (
          <figure key={t.name + t.quote.slice(0, 20)} className="flex flex-col rounded-[22px] border border-neutral-200 bg-white p-8">
            <Quote className="h-8 w-8 text-neutral-300" strokeWidth={1} />
            <blockquote className="mt-5 flex-1 font-heading text-xl leading-snug text-neutral-800">“{t.quote}”</blockquote>
            <figcaption className="mt-7 border-t border-neutral-200 pt-5">
              <p className="font-label text-sm font-semibold text-neutral-900">{t.name}</p>
              {t.role && <p className="mt-1 font-label text-xs text-neutral-500">{t.role}</p>}
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
