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

/** Homepage: the film in a rounded card under the header, the words centred over it, the towns along the foot. */
export function HomeHero({ hero, labels, video, places = [] }: { hero: Hero; labels: Labels; video: string; places?: NavLink[] }) {
  return (
    <section className="bg-paper px-3 pb-10 pt-[98px] md:px-5 md:pb-14 md:pt-[106px] lg:px-6">
      <div className="on-dark relative isolate flex min-h-[600px] max-h-[900px] flex-col overflow-hidden rounded-[28px] bg-ink text-white h-[calc(100svh-130px)] md:rounded-[36px]">
        {/* The built-in film has a still frame to show while it loads. A film uploaded in the dashboard starts on black. */}
        <HeroVideo src={video} poster={video === '/media/hero.mp4' ? '/media/hero-poster.jpg' : undefined} />
        <div className="absolute inset-0 -z-0 bg-gradient-to-b from-black/55 via-black/45 to-black/30" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 py-20 text-center">
          {hero.trust && (
            <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-5 py-2 font-label text-[11px] uppercase tracking-[0.28em] text-white/90 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
              {hero.trust}
            </p>
          )}
          <h1 className="mt-8 text-[clamp(2.6rem,6.5vw,5.75rem)] font-light leading-[1.02] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
            {hero.h1}
          </h1>
          <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-white/85 md:text-lg">{hero.sub}</p>
          {hero.ctas.length > 0 && (
            <div className="flex justify-center [&>div]:items-center">
              <HeroCtas hero={hero} labels={labels} onDark />
            </div>
          )}
        </div>

        {places.length > 0 && (
          <nav aria-label="Areas" className="relative z-10 pb-6">
            <ul className="mx-auto flex max-w-site flex-wrap items-center justify-center gap-2 px-5">
              {places.map((place) => (
                <li key={place.href}>
                  <Link
                    href={place.href}
                    className="inline-flex rounded-full border border-white/20 bg-black/25 px-4 py-2 font-label text-[11px] uppercase tracking-[0.2em] text-white/85 backdrop-blur-sm transition-colors hover:border-white/60 hover:text-white"
                  >
                    {place.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <Flags flags={hero.flags} className="relative z-10 mx-auto mb-4 max-w-3xl" />
      </div>
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
    <section className="bg-paper pt-[86px]">
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
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-paper-deep lg:aspect-auto lg:h-[clamp(420px,calc(100svh-240px),640px)]">
              <Image src={hero.image} alt="" fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="hero-photo object-cover" />
            </div>
          ) : (
            // No photo yet: the logo's building drawing stands in, faint, like an elevation sketch.
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[28px] border border-line bg-paper-deep lg:aspect-auto lg:h-[clamp(420px,calc(100svh-240px),640px)]">
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
