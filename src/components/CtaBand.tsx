import { getBusiness, getChrome } from '@/lib/content';
import { ButtonLink, CONVERSATION_HREF } from './Buttons';
import { Reveal } from './Reveal';

export async function CtaBand({ heading, text }: { heading: string; text: string }) {
  const [business, chrome] = await Promise.all([getBusiness(), getChrome()]);
  return (
    <section className="bg-neutral-50 px-3 pb-10 md:px-5 md:pb-14 lg:px-6">
      <div className="mx-auto overflow-hidden rounded-[28px] bg-neutral-950 md:rounded-[36px]">
        <Reveal className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center md:py-28">
          <h2 className="text-4xl leading-[1.05] text-white md:text-5xl lg:text-[58px]">{heading}</h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-300 md:text-lg">{text}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <ButtonLink href={CONVERSATION_HREF} variant="light">
              {chrome.buttonLabels.conversation}
            </ButtonLink>
            <a
              href={business.phoneHref}
              className="font-label text-sm font-semibold tracking-wide text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              or call {business.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
