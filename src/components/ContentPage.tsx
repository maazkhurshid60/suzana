import type { Block, PageContent } from '@/content/types';
import { getBusiness, getChrome } from '@/lib/content';
import { breadcrumbJsonLd, breadcrumbs, findMenuGroup } from '@/lib/navigation';
import { hasPhoto, isPublishable, REVIEW_MODE } from '@/lib/review';
import {
  FaqBlock,
  GlanceBlock,
  ImageBlock,
  OfferingsBlock,
  PlacesBlock,
  ProjectsBlock,
  ProseBlock,
  TestimonialsBlock,
} from './blocks/Blocks';
import type { Tone } from './blocks/Section';
import { CtaBand } from './CtaBand';
import { Flags } from './Flags';
import { HomeHero, PageHero } from './Heroes';
import { KeepExploring } from './KeepExploring';

/** Blocks that render nothing in the public build, so they do not take a background tone. */
function isEmpty(block: Block) {
  if (block.type === 'testimonials') return !block.items.some(isPublishable);
  if (REVIEW_MODE) return false;
  if (block.type === 'projects') return !block.items.some((e) => isPublishable(e.project)) && !hasPhoto(block.image);
  if (block.type === 'image') return !hasPhoto(block.image);
  return false;
}

function renderBlock(block: Block, tone: Tone, key: number) {
  switch (block.type) {
    case 'prose':
      return <ProseBlock key={key} block={block} tone={tone} />;
    case 'offerings':
      return <OfferingsBlock key={key} block={block} tone={tone} />;
    case 'projects':
      return <ProjectsBlock key={key} block={block} tone={tone} />;
    case 'places':
      return <PlacesBlock key={key} block={block} tone={tone} />;
    case 'glance':
      return <GlanceBlock key={key} block={block} tone={tone} />;
    case 'faq':
      return <FaqBlock key={key} block={block} tone={tone} />;
    case 'image':
      return <ImageBlock key={key} block={block} tone={tone} />;
    case 'testimonials':
      return <TestimonialsBlock key={key} block={block} tone={tone} />;
  }
}

export async function ContentPage({ page, variant = 'inner' }: { page: PageContent; variant?: 'home' | 'inner' }) {
  const [chrome, business] = await Promise.all([getChrome(), getBusiness()]);
  const visible = page.blocks.filter((block) => !isEmpty(block));
  const crumbs = breadcrumbs(chrome.menu, page.path, page.hero.h1, page.eyebrow);
  const group = findMenuGroup(chrome.menu, page.path);
  return (
    <>
      {variant === 'home' ? (
        <HomeHero hero={page.hero} labels={chrome.buttonLabels} video={chrome.heroVideo} />
      ) : (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs, business.siteUrl)) }} />
          <PageHero hero={page.hero} crumbs={crumbs} labels={chrome.buttonLabels} logo={chrome.logo} />
        </>
      )}
      {REVIEW_MODE && page.review?.length ? (
        <div className="bg-neutral-50 px-4 pb-6">
          <Flags flags={page.review} className="mx-auto max-w-3xl" />
        </div>
      ) : null}
      {visible.map((block, i) => renderBlock(block, i % 2 === 0 ? 'muted' : 'light', i))}
      {group && group.siblings.length > 0 && (
        <KeepExploring label={group.label} links={group.siblings} tone={visible.length % 2 === 0 ? 'muted' : 'light'} />
      )}
      <div className="h-10 bg-neutral-50 md:h-14" />
      <CtaBand heading={page.cta.heading} text={page.cta.text} />
    </>
  );
}
