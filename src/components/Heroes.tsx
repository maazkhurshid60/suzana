import Image from 'next/image';
import Link from 'next/link';
import type { Link as NavLink, PageContent, SiteChrome } from '@/content/types';
import type { Crumb } from '@/lib/navigation';
import { ButtonLink, CONVERSATION_HREF } from './Buttons';
import { Flags } from './Flags';
import { HeroVideo } from './HeroVideo';

type Hero = PageContent['hero'];
type Labels = SiteChrome['buttonLabels'];

function HeroCtas({ hero, labels, onDark }: { hero: Hero; labels: Labels; onDark: boolean }) {
  if (!hero.ctas.length) return null;
  return (
    <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
      {hero.ctas.map((cta) =>
        cta === 'conversation' ? (
          <ButtonLink key={cta} href={CONVERSATION_HREF} variant={onDark ? 'light' : 'dark'}>
            {labels.conversation}
          </ButtonLink>
        ) : (
          <ButtonLink key={cta} href={hero.workHref ?? '#recent-work'} variant={onDark ? 'outline-light' : 'outline-dark'} icon="up-right">
            {labels.work}
          </ButtonLink>
        ),
      )}
    </div>
  );
}

/** Homepage: the film fills the screen, the header floats over it, the towns run along the foot. */
export function HomeHero({ hero, labels, video, places = [] }: { hero: Hero; labels: Labels; video: string; places?: NavLink[] }) {
  return (
    <section className="on-dark relative isolate flex min-h-[640px] flex-col bg-ink text-white h-[100svh]">
      {/* The built-in film has a still frame to show while it loads. A film uploaded in the dashboard starts on black. */}
      <HeroVideo src={video} poster={video === '/media/hero.mp4' ? '/media/hero-poster.jpg' : undefined} />
      <div className="absolute inset-0 -z-0 bg-gradient-to-t from-black/75 via-black/25 to-black/45" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-site flex-1 flex-col justify-end px-5 pb-24 pt-32 md:px-10 md:pb-28">
        {hero.trust && <p className="eyebrow !text-white/80">{hero.trust}</p>}
        <h1 className="mt-6 max-w-5xl text-[clamp(2.6rem,6.2vw,5.6rem)] font-light leading-[1.02] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.35)]">
          {hero.h1}
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">{hero.sub}</p>
        <HeroCtas hero={hero} labels={labels} onDark />
      </div>

      {places.length > 0 && (
        <nav aria-label="Areas" className="relative z-10 border-t border-white/15">
          <ul className="mx-auto flex max-w-site flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/70 md:px-10">
            {places.map((place, i) => (
              <li key={place.href} className="flex items-center gap-3">
                {i > 0 && <span aria-hidden="true">·</span>}
                <Link href={place.href} className="transition-colors hover:text-white">
                  {place.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <Flags flags={hero.flags} className="relative z-10 mx-auto mb-4 max-w-3xl" />
    </section>
  );
}

/** Inner pages: the title set on the paper, the photograph beside it with a caption, like a plate in a monograph. */
export function PageHero({
  hero,
  crumbs,
  labels,
  logo,
}: {
  hero: Hero;
  crumbs: Crumb[];
  labels: Labels;
  logo: SiteChrome['logo'];
}) {
  const caption = crumbs.slice(1).map((c) => c.label).join('  ·  ');
  return (
    <section className="bg-paper pt-[84px]">
      <div className="mx-auto grid w-full max-w-site gap-12 px-5 pb-16 pt-12 md:px-10 md:pb-16 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
        <div>
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-8 text-[clamp(2.75rem,5.6vw,5.25rem)] font-light leading-[1.02] text-ink">{hero.h1}</h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">{hero.sub}</p>
          {hero.trust && (
            <p className="mt-8 flex max-w-xl items-start gap-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] text-ink/70">
              <span className="mt-[0.6em] h-px w-7 shrink-0 bg-bronze" aria-hidden="true" />
              {hero.trust}
            </p>
          )}
          <HeroCtas hero={hero} labels={labels} onDark={false} />
        </div>

        <figure>
          {hero.image ? (
            <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep lg:aspect-auto lg:h-[clamp(420px,calc(100svh-240px),640px)]">
              <Image src={hero.image} alt="" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="hero-photo object-cover" />
            </div>
          ) : (
            // No photo yet: the logo's building drawing stands in, faint, like an elevation sketch.
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden border border-line bg-paper-deep lg:aspect-auto lg:h-[clamp(420px,calc(100svh-240px),640px)]">
              <Image src={logo.src} alt="" width={logo.width} height={logo.height} className="w-3/4 opacity-[0.12]" />
            </div>
          )}
          {caption && (
            <figcaption className="mt-4 flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span>{caption}</span>
              <span>Gar Rector &amp; Associates</span>
            </figcaption>
          )}
        </figure>
      </div>
      <Flags flags={hero.flags} className="mx-auto mb-6 max-w-3xl px-5" />
    </section>
  );
}

function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-bronze">
        <li aria-hidden="true" className="h-px w-7 bg-bronze/70" />
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.label + i} className="flex items-center gap-3">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="transition-colors hover:text-ink">
                  {crumb.label}
                </Link>
              ) : (
                <span className={last ? 'text-ink/70' : undefined} aria-current={last ? 'page' : undefined}>
                  {crumb.label}
                </span>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
