// Skeleton of a page while it loads: the hero and one section in their final positions,
// so the layout does not jump when the content arrives.

function Bar({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse bg-ink/[0.07] motion-reduce:animate-none ${className}`} />;
}

export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading page" className="bg-paper">
      <section className="pt-[84px]">
        <div className="mx-auto grid w-full max-w-site gap-12 px-5 pb-16 pt-12 md:px-10 md:pb-16 md:pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-20">
          <div>
            <Bar className="h-3 w-40" />
            <Bar className="mt-10 h-14 w-[90%] md:h-20" />
            <Bar className="mt-4 h-14 w-[60%] md:h-20" />
            <Bar className="mt-10 h-4 w-[85%] max-w-xl" />
            <Bar className="mt-3 h-4 w-[65%] max-w-md" />
            <Bar className="mt-12 h-12 w-56" />
          </div>
          <Bar className="aspect-[4/3] w-full lg:aspect-auto lg:h-[clamp(420px,calc(100svh-240px),640px)]" />
        </div>
      </section>
      <section className="mx-auto grid w-full max-w-site gap-10 border-t border-line px-5 py-20 md:px-10 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <div>
          <Bar className="h-3 w-16" />
          <Bar className="mt-7 h-12 w-[80%]" />
          <Bar className="mt-3 h-12 w-[50%]" />
        </div>
        <div className="space-y-4">
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-[95%]" />
          <Bar className="h-4 w-[88%]" />
          <Bar className="h-4 w-[60%]" />
        </div>
      </section>
      <span className="sr-only">Loading</span>
    </div>
  );
}
