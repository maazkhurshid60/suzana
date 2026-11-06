import type { Metadata } from 'next';
import { ButtonLink } from '@/components/Buttons';
import { getBusiness, getChrome } from '@/lib/content';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

export default async function NotFound() {
  const [business, chrome] = await Promise.all([getBusiness(), getChrome()]);
  return (
    <section className="flex min-h-[80vh] items-center bg-paper px-5 pb-24 pt-[160px]">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-8 text-5xl font-light leading-[1.05] text-ink md:text-7xl">{chrome.notFound.heading}</h1>
        <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">{chrome.notFound.text}</p>
        <p className="mt-2 text-base text-muted md:text-lg">
          <a href={business.phoneHref} className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
            {business.phone}
          </a>
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <ButtonLink href="/">Back to the homepage</ButtonLink>
          <ButtonLink href="/contact/" variant="outline-dark" icon="up-right">
            {chrome.buttonLabels.conversation}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
