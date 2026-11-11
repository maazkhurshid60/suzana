import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Project } from '@/content/types';
import { hasPhoto } from '@/lib/review';

/** A project in the Our Work index: the photo as a tall plate, then where, when and what. */
export function ProjectTile({ project, index }: { project: Project; index: number }) {
  const href = project.slug ? `/work/${project.slug}/` : undefined;
  const photo = hasPhoto(project.photo) ? project.photo : undefined;
  const body = (
    <>
      <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
        {photo?.src && (
          <Image
            src={photo.src}
            alt={photo.alt ?? ''}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-[1.2s] group-hover:scale-[1.03]"
          />
        )}
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-6 border-t border-line pt-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-bronze">
          {project.location}
          {project.year ? `  ·  ${project.year}` : ''}
        </p>
        <span className="font-mono text-[11px] tracking-[0.2em] text-muted">{String(index + 1).padStart(2, '0')}</span>
      </div>
      <h2 className="mt-3 text-[1.9rem] leading-tight text-ink transition-colors group-hover:text-bronze">{project.name}</h2>
      {(project.architect || project.kind) && (
        <p className="mt-2 text-[15px] text-muted">{[project.kind, project.architect].filter(Boolean).join(' · ')}</p>
      )}
      {href && (
        <span className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink transition-all group-hover:gap-3.5 group-hover:text-bronze">
          View project
          <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
      )}
    </>
  );
  return href ? (
    <Link href={href} className="group block">
      {body}
    </Link>
  ) : (
    <article className="group">{body}</article>
  );
}
