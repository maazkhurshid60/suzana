import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getBusiness, getChrome } from '@/lib/content';
import { CONVERSATION_HREF } from './Buttons';
import { Reveal } from './Reveal';

/** The closing invitation on every page: a statement on the ink, with the two ways to reach Gar. */
export async function CtaBand({ heading, text }: { heading: string; text: string }) {
  const [business, chrome] = await Promise.all([getBusiness(), getChrome()]);
  return (
    <section className="on-dark bg-ink text-paper">
      <Reveal className="mx-auto grid w-full max-w-site gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-24">
        <div>
          <p className="eyebrow !text-bronze-light">Inquiries</p>
          <h2 className="mt-8 text-[clamp(2.75rem,5.5vw,5rem)] font-light leading-[1.02] text-paper">{heading}</h2>
        </div>
        <div>
          <p className="max-w-md text-base leading-relaxed text-paper/70 md:text-lg">{text}</p>
          <div className="mt-10 flex flex-col items-start gap-6">
            <Link href={CONVERSATION_HREF} className="text-link text-paper hover:text-bronze-light">
              {chrome.buttonLabels.conversation}
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
            </Link>
            <a href={business.phoneHref} className="font-mono text-[12px] uppercase tracking-[0.18em] text-paper/60 transition-colors hover:text-paper">
              or call {business.phone}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
