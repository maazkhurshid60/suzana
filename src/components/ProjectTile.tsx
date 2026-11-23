import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/content/types';
import { hasPhoto } from '@/lib/review';

/**
 * A project in the Our Work index. "wide" runs the full width as a feature plate,
 * "half" sits in a pair, "tall" is a portrait plate three to a row (name and town only). Name on the left, town on the right, architect under the name.
 */
export function ProjectTile({ project, wide = false, tall = false, priority = false }: { project: Project; wide?: boolean; tall?: boolean; priority?: boolean }) {
  const href = project.slug ? `/work/${project.slug}/` : undefined;
  const photo = hasPhoto(project.photo) ? project.photo : undefined;
  const credit = tall ? undefined : project.architect ?? project.kind;
  const body = (
    <>
      <div className={`relative overflow-hidden rounded-[24px] bg-paper-deep ${wide ? 'aspect-[4/3] md:aspect-[16/8]' : tall ? 'aspect-[4/5]' : 'aspect-[4/3] md:aspect-[5/4]'}`}>
        {photo?.src && (
          <Image
            src={photo.src}
            alt={photo.alt ?? ''}
            fill
            priority={priority}
            sizes={wide ? '(min-width: 1320px) 1240px, 100vw' : tall ? '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw' : '(min-width: 768px) 50vw, 100vw'}
            className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.025]"
          />
        )}
      </div>
      <div className="mt-5 flex flex-col gap-2 border-t border-line pt-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <h3 className={`${wide ? 'text-[clamp(2.1rem,3.6vw,3.25rem)]' : tall ? 'text-[1.6rem]' : 'text-[clamp(1.75rem,2.4vw,2.25rem)]'} font-light leading-tight text-ink transition-colors group-hover:text-bronze`}>
          {project.name}
        </h3>
        <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{project.location}</p>
      </div>
      {credit && (
        <p className="mt-3 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-bronze">
          <span aria-hidden className="h-px w-6 bg-bronze" />
          {credit}
        </p>
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
