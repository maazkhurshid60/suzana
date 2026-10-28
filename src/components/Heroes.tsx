import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { PageContent, SiteChrome } from '@/content/types';
import type { Crumb } from '@/lib/navigation';
import { ButtonLink, CONVERSATION_HREF } from './Buttons';
import { Flags } from './Flags';
import { HeroVideo } from './HeroVideo';

type Hero = PageContent['hero'];
type Labels = SiteChrome['buttonLabels'];

function HeroCtas({ hero, labels, onDark }: { hero: Hero; labels: Labels; onDark: boolean }) {
  return (
    <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
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

/** Homepage hero over the background film. */
export function HomeHero({ hero, labels, video }: { hero: Hero; labels: Labels; video: string }) {
  return (
    <section className="relative bg-neutral-50 px-3 pb-10 pt-[90px] md:px-5 md:pb-14 lg:px-6">
      <div className="relative mx-auto w-full overflow-hidden rounded-[28px] bg-neutral-950 md:rounded-[36px]">
        <HeroVideo src={video} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/25" />
        <div className="relative z-10 mx-auto flex min-h-[min(78vh,820px)] w-full max-w-5xl flex-col items-center justify-center px-5 py-24 text-center md:py-36">
          <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-light leading-[1.02] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)]">
            {hero.h1}
          </h1>
          <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.45)] md:text-lg">
            {hero.sub}
          </p>
          <div className="flex justify-center">
            <HeroCtas hero={hero} labels={labels} onDark />
          </div>
        </div>
      </div>
      <Flags flags={hero.flags} className="mx-auto mt-4 max-w-3xl" />
    </section>
  );
}

/** Inner page hero. */
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
  return (
    <section className="relative bg-neutral-50 px-3 pb-10 pt-[90px] md:px-5 md:pb-14 lg:px-6">
      <div className="relative mx-auto w-full overflow-hidden rounded-[28px] bg-neutral-950 md:rounded-[36px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.10),transparent_55%)]" />
        <div className="blueprint-grid absolute inset-0" aria-hidden="true" />
        {/* The logo's building drawing, reversed and faint, as an architectural motif. The frame
            crops off the lettering beneath it so it reads as a line drawing, not a watermark. */}
        <div
          className="pointer-events-none absolute -right-[4%] top-1/2 hidden w-[44%] max-w-[620px] -translate-y-1/2 select-none overflow-hidden opacity-[0.07] md:block"
          style={{ aspectRatio: `${logo.width} / ${Math.round(logo.height * 0.8)}` }}
          aria-hidden="true"
        >
          <Image src={logo.src} alt="" width={logo.width} height={logo.height} className="w-full invert" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:py-32">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="max-w-4xl text-[clamp(2.5rem,6vw,5.25rem)] font-light leading-[1.04] text-white">{hero.h1}</h1>
          <p className="mt-7 max-w-2xl text-base font-light leading-relaxed text-white/80 md:text-lg">{hero.sub}</p>
          {hero.trust && (
            <p className="mt-6 max-w-2xl border-l border-white/25 pl-5 font-heading text-xl italic leading-snug text-white/75">
              {hero.trust}
            </p>
          )}
          <HeroCtas hero={hero} labels={labels} onDark />
        </div>
      </div>
      <Flags flags={hero.flags} className="mx-auto mt-4 max-w-3xl" />
    </section>
  );
}

function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 font-label text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
        {crumbs.map((crumb, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={crumb.label + i} className="flex items-center gap-2">
              {crumb.href && !last ? (
                <Link href={crumb.href} className="transition-colors hover:text-white">
                  {crumb.label}
                </Link>
              ) : (
                <span className={last ? 'text-neutral-300' : undefined} aria-current={last ? 'page' : undefined}>
                  {crumb.label}
                </span>
              )}
              {!last && <ChevronRight className="h-3 w-3 text-neutral-700" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
