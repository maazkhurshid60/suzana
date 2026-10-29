import { Clock, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { ContactForm } from '@/components/ContactForm';
import { Flags } from '@/components/Flags';
import { Section, SectionHeading } from '@/components/blocks/Section';
import { PageHero } from '@/components/Heroes';
import { getBusiness, getChrome, getContactPage } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  return pageMetadata(await getContactPage());
}

export default async function ContactPage() {
  const [contact, business, chrome] = await Promise.all([getContactPage(), getBusiness(), getChrome()]);

  const details = [
    {
      icon: Phone,
      label: 'Phone',
      value: (
        <a href={business.phoneHref} className="transition-colors hover:text-black">
          {business.phone}
        </a>
      ),
    },
    ...(business.email
      ? [
          {
            icon: Mail,
            label: 'Email',
            value: (
              <a href={`mailto:${business.email}`} className="transition-colors hover:text-black">
                {business.email}
              </a>
            ),
          },
        ]
      : []),
    {
      icon: MapPin,
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
      icon: Clock,
      label: 'Hours',
      value: (
        <>
          {business.hours}
          <br />
          {business.weekends}
        </>
      ),
    },
    { icon: ShieldCheck, label: 'License', value: business.license },
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
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHeading>{contact.whatHappens.heading}</SectionHeading>
            {contact.whatHappens.body.map((para) => (
              <p key={para} className="mt-5 text-base leading-relaxed text-neutral-600 md:text-lg">
                {para}
              </p>
            ))}

            <h2 className="mt-14 text-3xl text-neutral-950 md:text-4xl">{contact.getInTouchHeading}</h2>
            <dl className="mt-6 space-y-6 border-t border-neutral-200 pt-8">
              {details.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-700">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <dt className="font-label text-xs uppercase tracking-[0.2em] text-neutral-500">{label}</dt>
                    <dd className="mt-1 text-base leading-relaxed text-neutral-800">{value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            {!business.email && <Flags flags={contact.detailsFlags} className="mt-6" />}
          </div>

          <div>
            <h2 className="mb-6 text-3xl text-neutral-950 md:text-4xl">{contact.formHeading}</h2>
            <ContactForm stages={contact.stages} phone={business.phone} />
            <Flags flags={contact.formFlags} className="mt-4" />
          </div>
        </div>
      </Section>

      <Flags flags={contact.directionsFlags} className="mx-auto max-w-3xl px-4 pb-16" />
    </>
  );
}
