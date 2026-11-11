import { ContactForm } from '@/components/ContactForm';
import { Flags } from '@/components/Flags';
import { Section, SectionHeading, SectionNumber } from '@/components/blocks/Section';
import { PageHero } from '@/components/Heroes';
import { getBusiness, getChrome, getContactPage } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return pageMetadata(await getContactPage());
}

export default async function ContactPage() {
  const [contact, business, chrome] = await Promise.all([getContactPage(), getBusiness(), getChrome()]);

  const intro = Boolean(contact.whatHappens.heading || contact.whatHappens.body.length);

  const details = [
    {
      label: 'Phone',
      value: (
        <a href={business.phoneHref} className="transition-colors hover:text-bronze">
          {business.phone}
        </a>
      ),
    },
    ...(business.email
      ? [
          {
            label: 'Email',
            value: (
              <a href={`mailto:${business.email}`} className="transition-colors hover:text-bronze">
                {business.email}
              </a>
            ),
          },
        ]
      : []),
    {
      label: 'Office and shop',
      value: (
        <>
          {business.street}
          <br />
          {business.locality}, {business.region} {business.postalCode}
        </>
      ),
    },
    {
      label: 'Hours',
      value: (
        <>
          {business.hours}
          <br />
          {business.weekends}
        </>
      ),
    },
    { label: 'License', value: business.license },
  ];

  return (
    <>
      <PageHero
        hero={{ h1: contact.h1, sub: contact.sub, ctas: [], image: contact.heroImage }}
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact', href: contact.path }]}
        labels={chrome.buttonLabels}
        logo={chrome.logo}
      />
      <Flags flags={contact.review} className="mx-auto max-w-3xl px-4" />

      <Section tone="light">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
          <div>
            {/* Only shown while the dashboard has wording for it. Clearing both fields removes the section. */}
            {intro && (
              <div className="mb-16">
                <SectionNumber n={1} className="mb-7" />
                {contact.whatHappens.heading && <SectionHeading>{contact.whatHappens.heading}</SectionHeading>}
                {contact.whatHappens.body.map((para) => (
                  <p key={para} className="mt-6 text-base leading-[1.75] text-muted md:text-[17px]">
                    {para}
                  </p>
                ))}
              </div>
            )}

            <SectionNumber n={intro ? 2 : 1} className="mb-7" />
            <h2 className="text-[2.25rem] font-light leading-tight text-ink md:text-[2.75rem]">{contact.getInTouchHeading}</h2>
            <dl className="mt-8 border-t border-ink/80">
              {details.map(({ label, value }) => (
                <div key={label} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[160px_1fr] sm:gap-8">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-bronze sm:pt-1">{label}</dt>
                  <dd className="text-base leading-relaxed text-ink">{value}</dd>
                </div>
              ))}
            </dl>
            {!business.email && <Flags flags={contact.detailsFlags} className="mt-6" />}
          </div>

          <div>
            <SectionNumber n={intro ? 3 : 2} className="mb-7" />
            <h2 className="mb-8 text-[2.25rem] font-light leading-tight text-ink md:text-[2.75rem]">{contact.formHeading}</h2>
            <ContactForm stages={contact.stages} phone={business.phone} />
            <Flags flags={contact.formFlags} className="mt-4" />
          </div>
        </div>
      </Section>

      <Flags flags={contact.directionsFlags} className="mx-auto max-w-3xl px-4 pb-16" />
    </>
  );
}
