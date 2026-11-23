import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CtaBand } from '@/components/CtaBand';
import { ProjectGallery } from '@/components/ProjectGallery';
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
  const specs = (
    [
      ['Architect', project.architect],
      ['Builder', 'Gar Rector & Associates'],
      ['Location', project.location],
      ['Completed', project.year],
    ] as [string, string | undefined][]
  ).filter((s): s is [string, string] => Boolean(s[1]));

  return (
    <>
      <section className="bg-paper pt-[86px]">
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
            <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-[28px] bg-paper-deep md:rounded-[36px] md:aspect-[16/8]">
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
            <div className="mt-10">
              <ProjectGallery photos={project.gallery} />
            </div>
          </div>
        </section>
      ) : null}

      {/* Project details, as on the Hobbs project pages. */}
      <section className="bg-paper">
        <dl className="mx-auto grid w-full max-w-site gap-x-10 gap-y-6 border-t border-line px-5 py-14 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
          {specs.map(([label, value]) => (
            <div key={label}>
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-bronze">{label}</dt>
              <dd className="mt-2 font-heading text-xl text-ink">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-paper">
        <div className="mx-auto flex w-full max-w-site flex-col gap-8 border-t border-line px-5 py-14 md:flex-row md:items-center md:justify-between md:px-10">
          <Link href="/work/" className="text-link self-start text-ink hover:text-bronze">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
            Our work
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
