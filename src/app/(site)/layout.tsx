import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { MobileActionBar } from '@/components/MobileActionBar';
import { ReviewBanner } from '@/components/Flags';
import { Navbar } from '@/components/Navbar';
import { NavigationSkeleton } from '@/components/NavigationSkeleton';
import { ScrollToTop } from '@/components/ScrollToTop';
import { business as localBusiness } from '@/content/site';
import { getBusiness, getChrome } from '@/lib/content';
import { INDEXABLE } from '@/lib/review';
import './globals.css';

// Render on every request so dashboard changes show on the next page load.
export const dynamic = 'force-dynamic';

const heading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
});

// Self-hosted so body text looks the same on every device. Helvetica Neue is missing on Windows
// and Android, where visitors would otherwise see Arial.
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(localBusiness.siteUrl),
  title: { default: localBusiness.name, template: `%s | ${localBusiness.name}` },
  // Review and preview builds carry unapproved copy, so keep them out of search results.
  robots: INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: '#0a0a0a' };

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [business, chrome] = await Promise.all([getBusiness(), getChrome()]);

  // Only the Charter Oak address appears here. The Elmshaven legal address never goes into schema.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    name: business.legalName,
    url: business.siteUrl,
    logo: chrome.logo.src.startsWith('http') ? chrome.logo.src : `${business.siteUrl}${chrome.logo.src}`,
    telephone: business.phoneHref.replace('tel:', ''),
    ...(business.email ? { email: business.email } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      addressLocality: business.locality,
      addressRegion: business.region,
      postalCode: business.postalCode,
      addressCountry: 'US',
    },
    areaServed: ['Napa Valley, CA', 'Sonoma County, CA'],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '17:00',
      },
    ],
  };

  return (
    // data-scroll-behavior lets Next.js switch smooth scrolling off while it changes page,
    // so navigation jumps straight to the top instead of animating.
    <html lang="en" className={`${heading.variable} ${body.variable}`} data-scroll-behavior="smooth">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-black focus:px-5 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <ScrollToTop />
        <NavigationSkeleton />
        <Navbar
          menu={chrome.menu}
          button={chrome.headerButton}
          logo={chrome.logo}
          phone={chrome.showPhoneInHeader ? { label: business.phone, href: business.phoneHref } : undefined}
        />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar
          phone={{ label: business.phone, href: business.phoneHref }}
          button={{ label: chrome.buttonLabels.conversation, href: chrome.headerButton.href }}
        />
        <ReviewBanner />
      </body>
    </html>
  );
}
