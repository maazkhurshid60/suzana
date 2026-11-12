import { CtaBand } from '@/components/CtaBand';
import { ProjectTile } from '@/components/ProjectTile';
import { Reveal } from '@/components/Reveal';
import { getProjects } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { hasPhoto, isPublishable } from '@/lib/review';

function GroupHeading({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
      <h2 className="text-[clamp(2rem,3.4vw,3rem)] font-light leading-tight text-ink">{title}</h2>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">{note}</p>
    </div>
  );
}

const meta = {
  title: 'Our Work | Custom Homes in Napa Valley',
  description: 'Selected custom homes, rebuilds and estates built by Gar Rector & Associates across Napa Valley and Sonoma County.',
};

export function generateMetadata() {
  return pageMetadata({ path: '/work/', meta });
}

/** Every project with written permission on file, each opening to its own page. */
export default async function WorkPage() {
  // Projects with photos lead; the first three are featured.
  const projects = (await getProjects()).filter(isPublishable).sort((a, b) => Number(hasPhoto(b.photo)) - Number(hasPhoto(a.photo)));
  const featured = projects.slice(0, 3);
  const rest = projects.slice(3);
  return (
    <>
      <section className="bg-paper pt-[84px]">
        <div className="mx-auto w-full max-w-site px-5 pb-14 pt-14 md:px-10 md:pb-20 md:pt-20">
          <p className="eyebrow">Our work</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
            <h1 className="text-[clamp(3rem,6.5vw,6rem)] font-light leading-[1] text-ink">Custom homes, built as drawn.</h1>
            <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
              Custom homes, rebuilds and estates across Napa Valley and Sonoma County, each built from the architect’s drawings.
            </p>
          </div>
        </div>
      </section>

      {projects.length ? (
        <>
          {/* Featured work: the first project full width, the next two side by side. */}
          <section className="bg-paper">
            <div className="mx-auto w-full max-w-site border-t border-line px-5 py-16 md:px-10 md:py-24">
              <GroupHeading title="Featured work" note={`${String(featured.length).padStart(2, '0')} · Full project pages`} />
              <div className="mt-12 grid gap-x-10 gap-y-20 md:grid-cols-2 md:gap-y-24">
                {featured.map((project, i) => (
                  <Reveal key={project.id} className={i === 0 ? 'md:col-span-2' : ''}>
                    <ProjectTile project={project} wide={i === 0} priority={i === 0} />
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          {/* Select work: everything else as tall plates, three to a row. */}
          {rest.length > 0 && (
            <section className="bg-paper">
              <div className="mx-auto w-full max-w-site border-t border-line px-5 py-16 md:px-10 md:py-24">
                <GroupHeading title="Select work" note={`${rest.length} ${rest.length === 1 ? 'property' : 'properties'} · Tap to view`} />
                <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((project) => (
                    <Reveal key={project.id}>
                      <ProjectTile project={project} tall />
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className="bg-paper">
          <p className="mx-auto max-w-site px-5 py-16 text-muted md:px-10">Projects will appear here once they are cleared for publication.</p>
        </section>
      )}

      <CtaBand heading="Start a conversation" text="Discuss your architectural drawings and site conditions directly with Gar Rector." />
    </>
  );
}
