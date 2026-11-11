import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CtaBand } from '@/components/CtaBand';
import { Reveal } from '@/components/Reveal';
import { getProject, getProjects } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { hasPhoto, isPublishable } from '@/lib/review';

type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  const project = await getProject(slug);
  return project && isPublishable(project) ? project : null;
}

export async function generateMetadata({ params }: Props) {
  const project = await load((await params).slug);
  if (!project) return {};
  return pageMetadata({
    path: `/work/${project.slug}/`,
    meta: {
      title: `${project.name}, ${project.location}`,
      description: project.summary ?? `${project.name}, a custom home in ${project.location} built by Gar Rector & Associates.`,
    },
  });
}

/** One project: the name and its details, the main photo, the write-up and the gallery. */
export default async function ProjectPage({ params }: Props) {
  const project = await load((await params).slug);
  if (!project) notFound();

  const others = (await getProjects()).filter((p) => isPublishable(p) && p.slug);
  const next = others[(others.findIndex((p) => p.id === project.id) + 1) % others.length];
  const cover = hasPhoto(project.photo) ? project.photo : undefined;
  const details = [project.location, project.architect, project.kind, project.year].filter(Boolean);

  return (
    <>
      <section className="bg-paper pt-[84px]">
        <div className="mx-auto w-full max-w-site px-5 pt-12 md:px-10 md:pt-16">
          <Link href="/work/" className="eyebrow transition-colors hover:text-ink">
            Selected work
          </Link>
          <h1 className="mt-8 text-[clamp(2.75rem,6vw,5.5rem)] font-light leading-[1.02] text-ink">{project.name}</h1>
          <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[12px] uppercase tracking-[0.16em]">
            {details.map((d, i) => (
              <li key={d} className={i === 0 ? 'text-ink' : 'text-muted'}>
                {d}
              </li>
            ))}
          </ul>
          {cover?.src && (
            <div className="relative mt-12 aspect-[16/10] overflow-hidden bg-paper-deep md:aspect-[16/8]">
              <Image src={cover.src} alt={cover.alt ?? ''} fill priority sizes="(min-width: 1320px) 1240px, 100vw" className="hero-photo object-cover" />
            </div>
          )}
        </div>
      </section>

      {(project.summary || project.description?.length) && (
        <section className="bg-paper">
          <div className="mx-auto grid w-full max-w-site gap-10 px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <Reveal>
              <p className="eyebrow">The project</p>
              {project.summary && <p className="mt-7 font-heading text-[1.9rem] font-light leading-snug text-ink md:text-[2.3rem]">{project.summary}</p>}
            </Reveal>
            <Reveal className="lg:border-l lg:border-line lg:pl-14">
              {project.description?.map((para, i) => (
                <p key={i} className={`${i ? 'mt-6' : ''} text-base leading-[1.75] text-muted md:text-[17px]`}>
                  {para}
                </p>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {project.gallery?.length ? (
        <section className="bg-paper">
          <div className="mx-auto w-full max-w-site border-t border-line px-5 py-16 md:px-10 md:py-24">
            <p className="eyebrow">Gallery</p>
            {/* Every third photo runs full width, the rest sit in pairs, so the gallery reads like a monograph. */}
            <Reveal className="mt-10 grid gap-6 md:grid-cols-2">
              {project.gallery.map((photo, i) => {
                const wide = i % 3 === 0;
                return (
                  <figure key={photo.src} className={wide ? 'md:col-span-2' : ''}>
                    <div className={`relative overflow-hidden bg-paper-deep ${wide ? 'aspect-[16/10] md:aspect-[16/8]' : 'aspect-[4/5]'}`}>
                      <Image src={photo.src} alt={photo.alt ?? ''} fill sizes={wide ? '(min-width: 1320px) 1240px, 100vw' : '(min-width: 768px) 50vw, 100vw'} className="object-cover" />
                    </div>
                    {photo.caption && <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{photo.caption}</figcaption>}
                  </figure>
                );
              })}
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="bg-paper">
        <div className="mx-auto flex w-full max-w-site flex-col gap-8 border-t border-line px-5 py-14 md:flex-row md:items-center md:justify-between md:px-10">
          <Link href="/work/" className="text-link self-start text-ink hover:text-bronze">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            All work
          </Link>
          {next && next.id !== project.id && (
            <Link href={`/work/${next.slug}/`} className="group text-right">
              <span className="eyebrow">Next project</span>
              <span className="mt-3 flex items-center justify-end gap-4 font-heading text-[2rem] leading-tight text-ink transition-colors group-hover:text-bronze">
                {next.name}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={1.25} />
              </span>
            </Link>
          )}
        </div>
      </section>

      <CtaBand heading="Start a conversation" text="Discuss your architectural drawings and site conditions directly with Gar Rector." />
    </>
  );
}
