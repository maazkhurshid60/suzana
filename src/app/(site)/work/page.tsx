import { CtaBand } from '@/components/CtaBand';
import { ProjectTile } from '@/components/ProjectTile';
import { Reveal } from '@/components/Reveal';
import { getProjects } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import { isPublishable } from '@/lib/review';

const meta = {
  title: 'Our Work | Custom Homes in Napa Valley',
  description: 'Selected custom homes, rebuilds and estates built by Gar Rector & Associates across Napa Valley and Sonoma County.',
};

export function generateMetadata() {
  return pageMetadata({ path: '/work/', meta });
}

/** Every project with written permission on file, each opening to its own page. */
export default async function WorkPage() {
  const projects = (await getProjects()).filter(isPublishable);
  return (
    <>
      <section className="bg-paper pt-[84px]">
        <div className="mx-auto w-full max-w-site px-5 pb-14 pt-14 md:px-10 md:pb-20 md:pt-20">
          <p className="eyebrow">Selected work</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
            <h1 className="text-[clamp(3rem,6.5vw,6rem)] font-light leading-[1] text-ink">Our work.</h1>
            <p className="max-w-md text-base leading-relaxed text-muted md:text-lg">
              Custom homes, rebuilds and estates across Napa Valley and Sonoma County, each built from the architect’s drawings.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto w-full max-w-site border-t border-line px-5 py-16 md:px-10 md:py-24">
          {projects.length ? (
            <Reveal className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, i) => (
                <ProjectTile key={project.id} project={project} index={i} />
              ))}
            </Reveal>
          ) : (
            <p className="text-muted">Projects will appear here once they are cleared for publication.</p>
          )}
        </div>
      </section>

      <CtaBand heading="Start a conversation" text="Discuss your architectural drawings and site conditions directly with Gar Rector." />
    </>
  );
}
