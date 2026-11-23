import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getBusiness, getChrome } from '@/lib/content';
import { CONVERSATION_HREF } from './Buttons';
import { Reveal } from './Reveal';

/** The closing invitation on every page: a statement on the ink, with the two ways to reach Gar. */
export async function CtaBand({ heading, text }: { heading: string; text: string }) {
  const [business, chrome] = await Promise.all([getBusiness(), getChrome()]);
  return (
    <section className="bg-paper px-3 pb-6 pt-4 md:px-5 lg:px-6">
      <Reveal className="on-dark mx-auto grid w-full gap-12 rounded-[28px] bg-ink px-6 py-20 text-paper md:rounded-[36px] md:px-14 md:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-24 lg:px-20">
        <div>
          <p className="eyebrow !text-bronze-light">Inquiries</p>
          <h2 className="mt-8 text-[clamp(2.75rem,5.5vw,5rem)] font-light leading-[1.02] text-paper">{heading}</h2>
        </div>
        <div>
          <p className="max-w-md text-base leading-relaxed text-paper/70 md:text-lg">{text}</p>
          <div className="mt-10 flex flex-col items-start gap-6">
            <Link href={CONVERSATION_HREF} className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-label text-sm font-semibold tracking-wide text-ink transition-colors hover:bg-white/90">
              {chrome.buttonLabels.conversation}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <a href={business.phoneHref} className="font-label text-sm tracking-wide text-paper/60 transition-colors hover:text-paper">
              or call {business.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
