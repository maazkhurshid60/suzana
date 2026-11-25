import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Hammer, Home, Layers, MapPin, Mountain, Plus, type LucideIcon } from 'lucide-react';
import type { Block, PageContent, Project, SiteChrome } from '@/content/types';
import { getProjects } from '@/lib/content';
import { hasPhoto, isPublishable } from '@/lib/review';
import { FaqBlock, TestimonialsBlock } from '../blocks/Blocks';
import { CONVERSATION_HREF } from '../Buttons';
import { Paragraph } from '../Paragraph';
import { Reveal } from '../Reveal';
import { StackedProjects, type StackCard } from './StackedProjects';

/**
 * The homepage in the section order of the original Readdy design:
 * moving banner, about, what we do, gallery, signature projects, approach, (FAQ), contact.
 * Every word comes from the homepage in the dashboard and every photo from Gar's own projects.
 */

type Of<T extends Block['type']> = Extract<Block, { type: T }>;

/** "A collaborative approach to architectural construction" → plain first half, italic second half, as in Readdy's headings. */
function SplitHeading({ text, dark = false }: { text: string; dark?: boolean }) {
  const words = text.split(' ');
  const cut = words.length > 3 ? Math.ceil(words.length / 2) : words.length;
  const rest = words.slice(cut).join(' ');
  return (
    <h2 className={`text-4xl leading-[1.05] md:text-5xl lg:text-[54px] ${dark ? 'text-white' : 'text-ink'}`}>
      {words.slice(0, cut).join(' ')}
      {rest && <span className={`block italic ${dark ? 'text-white/55' : 'text-ink/50'}`}>{rest}</span>}
    </h2>
  );
}

function Label({ n, text, dark = false }: { n: number; text: string; dark?: boolean }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className={`font-label text-xs font-medium uppercase tracking-[0.28em] ${dark ? 'text-white/50' : 'text-muted'}`}>
        {String(n).padStart(2, '0')} · {text}
      </span>
      <span className={`h-px w-10 ${dark ? 'bg-white/20' : 'bg-ink/20'}`} />
    </div>
  );
}

const pill = 'group inline-flex items-center gap-2 whitespace-nowrap rounded-full px-7 py-3.5 font-label text-sm font-semibold tracking-wide transition-colors';
const wrap = 'mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8';
const photoOf = (p?: Project) => (p && hasPhoto(p.photo) && p.photo?.src ? p.photo : undefined);

function Marquee({ words }: { words: string[] }) {
  if (!words.length) return null;
  const row = [...words, ...words];
  return (
    <div className="relative overflow-hidden border-y border-line bg-paper py-7" aria-hidden="true">
      <div className="marquee-track flex w-max items-center gap-12">
        {row.map((w, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-heading text-xl italic text-ink/40 md:text-2xl">{w}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-ink/20" />
          </span>
        ))}
      </div>
    </div>
  );
}

function About({ block, photo, n }: { block: Of<'prose'>; photo?: Project['photo']; n: number }) {
  return (
    <section id="about" className="bg-paper py-20 md:py-28">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20`}>
        <Reveal>
          <Label n={n} text="About us" />
          <SplitHeading text={block.heading} />
          {block.body?.map((p, i) => <Paragraph key={i} para={p} className={`${i ? 'mt-4' : 'mt-7 md:text-lg'} text-base leading-relaxed text-muted`} />)}
          <Link href="/how-we-work/" className={`${pill} mt-9 bg-ink text-white hover:bg-ink-soft`}>
            How we work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
        {photo?.src && (
          <Reveal className="relative">
            <div className="relative h-[420px] overflow-hidden rounded-[28px] md:h-[560px]">
              <Image src={photo.src} alt={photo.alt ?? ''} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-4 py-2 backdrop-blur-sm md:left-6 md:top-6">
              <MapPin className="h-4 w-4 text-white" />
              <span className="font-label text-xs font-medium tracking-wide text-white">St. Helena, CA</span>
            </div>
            <Link href="/work/" className={`${pill} absolute bottom-5 right-5 bg-white px-6 py-3 text-ink hover:bg-white/90 md:bottom-6 md:right-6`}>
              Our work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        )}
      </div>
    </section>
  );
}

const icons: LucideIcon[] = [Home, Layers, Mountain, Hammer];

function Services({ block, n }: { block: Of<'offerings'>; n: number }) {
  return (
    <section id="services" className="bg-paper-deep py-20 md:py-28">
      <div className={wrap}>
        <Reveal>
          <Label n={n} text="What we do" />
          <SplitHeading text={block.heading} />
        </Reveal>
        <Reveal className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex flex-col rounded-[22px] border border-line bg-paper p-7 transition-all hover:-translate-y-1 hover:shadow-[0_18px_50px_-24px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ink/20 text-ink/70 transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.25} />
                  </span>
                  <span className="font-heading text-4xl text-ink/15">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-7 font-heading text-2xl text-ink">{item.title}</h3>
                {item.text && <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{item.text}</p>}
                <span className="mt-6 inline-flex items-center gap-2 font-label text-[13px] font-semibold uppercase tracking-wide text-ink">
                  Learn more
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

/** Readdy's bento: one large photo, two smaller ones and two plain figure panels. Only real photos and real figures. */
function Gallery({ projects, n }: { projects: Project[]; n: number }) {
  const withPhotos = projects.filter((p) => photoOf(p));
  if (withPhotos.length < 3) return null;
  const [big, a, b] = withPhotos;
  const fact = (figure: string, small: string) => (
    <div className="flex flex-col justify-center rounded-[22px] border border-line bg-paper-deep p-6 md:p-8">
      <p className="font-heading text-5xl text-ink md:text-6xl">{figure}</p>
      <p className="mt-2 font-label text-sm text-muted">{small}</p>
    </div>
  );
  return (
    <section id="gallery" className="bg-paper py-20 md:py-28">
      <div className={wrap}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Label n={n} text="The gallery" />
            <SplitHeading text="A selection of our work" />
          </div>
          <Link href="/work/" className={`${pill} shrink-0 self-start border border-ink/25 px-6 py-3 text-ink hover:border-ink hover:bg-ink hover:text-white md:self-auto`}>
            View all projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <Reveal className="mt-12 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-4 md:gap-5">
          <Link href={big.slug ? `/work/${big.slug}/` : '/work/'} className="group relative col-span-2 row-span-2 overflow-hidden rounded-[28px]" aria-label={big.name}>
            <Image src={photoOf(big)!.src!} alt={photoOf(big)!.alt ?? ''} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/35 px-4 py-2 backdrop-blur-sm">
              <Plus className="h-3.5 w-3.5 text-white" />
              <span className="font-label text-xs font-medium text-white">Featured</span>
            </span>
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-label text-xs uppercase tracking-[0.2em] text-white/70">{big.location}</p>
              <p className="mt-1 font-heading text-3xl text-white">{big.name}</p>
            </div>
          </Link>
          {fact('Since 1991', 'Building in Napa Valley')}
          <Link href={a.slug ? `/work/${a.slug}/` : '/work/'} className="group relative overflow-hidden rounded-[22px]" aria-label={a.name}>
            <Image src={photoOf(a)!.src!} alt={photoOf(a)!.alt ?? ''} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 font-heading text-xl text-white">{a.name}</p>
          </Link>
          {fact('5–6', 'Active builds at a time')}
          <Link href={b.slug ? `/work/${b.slug}/` : '/work/'} className="group relative overflow-hidden rounded-[22px]" aria-label={b.name}>
            <Image src={photoOf(b)!.src!} alt={photoOf(b)!.alt ?? ''} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover transition-transform duration-[1400ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <p className="absolute bottom-4 left-4 right-4 font-heading text-xl text-white">{b.name}</p>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function Projects({ block, n }: { block: Of<'projects'>; n: number }) {
  const cards: StackCard[] = block.items
    .filter((e) => isPublishable(e.project) && photoOf(e.project))
    .map(({ project, text }) => ({
      id: project.id,
      name: project.name,
      meta: [project.kind, project.year, project.location].filter(Boolean).join(' · '),
      text: text ?? project.summary,
      src: photoOf(project)!.src!,
      alt: photoOf(project)!.alt ?? '',
      href: project.slug ? `/work/${project.slug}/` : undefined,
    }));
  if (!cards.length) return null;
  return (
    <section id="projects" className="bg-paper-deep py-20 md:py-28">
      <div className={wrap}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Label n={n} text="Signature projects" />
            <SplitHeading text={block.heading === 'Recent work' ? 'Recent work across the valley' : block.heading} />
          </div>
          <Link href={CONVERSATION_HREF} className={`${pill} shrink-0 self-start bg-ink px-6 py-3 text-white hover:bg-ink-soft md:self-auto`}>
            Start a conversation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="mt-12">
          <StackedProjects cards={cards} />
        </div>
      </div>
    </section>
  );
}

function Approach({ block, photo, n }: { block: Of<'prose'>; photo?: Project['photo']; n: number }) {
  return (
    <section id="approach" className="on-dark bg-ink py-20 text-white md:py-28">
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-2 lg:gap-20`}>
        {photo?.src && (
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative h-[420px] overflow-hidden rounded-[28px] md:h-[560px]">
              <Image src={photo.src} alt={photo.alt ?? ''} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-[22px] bg-white px-8 py-7 text-ink sm:block md:-left-8">
              <p className="font-heading text-3xl italic">Since 1991</p>
              <p className="mt-1 font-label text-xs uppercase tracking-[0.2em] text-muted">St. Helena · Napa Valley</p>
            </div>
          </Reveal>
        )}
        <Reveal className="order-1 lg:order-2">
          <Label n={n} text="Our approach" dark />
          <SplitHeading text={block.heading} dark />
          {block.body?.map((p, i) => <Paragraph key={i} para={p} className={`${i ? 'mt-4' : 'mt-7 md:text-lg'} text-base leading-relaxed text-white/70`} />)}
          {block.subsections?.length ? (
            <ul className="mt-9 space-y-6">
              {block.subsections.map((s) => (
                <li key={s.heading} className="border-b border-white/10 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="font-heading text-xl text-white">{s.heading.replace(/^\d+\.\s*/, '')}</h3>
                  {s.body.map((p, i) => <Paragraph key={i} para={p} className="mt-1 text-sm leading-relaxed text-white/60" />)}
                </li>
              ))}
            </ul>
          ) : null}
          <Link href={CONVERSATION_HREF} className={`${pill} mt-10 bg-white text-ink hover:bg-white/90`}>
            Begin your project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export async function ReaddyHome({ page, chrome }: { page: PageContent; chrome: SiteChrome }) {
  const all = (await getProjects()).filter(isPublishable);
  // Fullest galleries first, so the gallery and photos lead with the best-documented homes.
  const ranked = [...all].sort((a, b) => (b.gallery?.length ?? 0) - (a.gallery?.length ?? 0));
  const prose = page.blocks.filter((b): b is Of<'prose'> => b.type === 'prose');
  const offerings = page.blocks.find((b): b is Of<'offerings'> => b.type === 'offerings');
  const projects = page.blocks.find((b): b is Of<'projects'> => b.type === 'projects');
  const faq = page.blocks.find((b): b is Of<'faq'> => b.type === 'faq');
  const testimonials = page.blocks.find((b): b is Of<'testimonials'> => b.type === 'testimonials');
  const areas = chrome.menu.find((m) => m.label === 'Areas')?.links ?? [];
  const marquee = [...(offerings?.items.map((i) => i.title) ?? []), ...areas.map((a) => a.label)];

  let n = 0;
  return (
    <>
      <Marquee words={marquee} />
      {prose[0] && <About block={prose[0]} photo={photoOf(ranked[1]) ?? photoOf(ranked[0])} n={++n} />}
      {offerings && <Services block={offerings} n={++n} />}
      <Gallery projects={ranked} n={++n} />
      {projects && <Projects block={projects} n={++n} />}
      {prose[1] && <Approach block={prose[1]} photo={photoOf(ranked[3]) ?? photoOf(ranked[0])} n={++n} />}
      {testimonials && testimonials.items.some(isPublishable) && <TestimonialsBlock block={testimonials} tone="light" n={++n} />}
      {faq && <FaqBlock block={faq} tone="light" n={++n} />}
    </>
  );
}
