// Skeleton of a page while it loads: the hero panel and two sections in their final positions,
// so the layout does not jump when the content arrives.

function Bar({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-full motion-reduce:animate-none ${className}`} />;
}

export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading page">
      <section className="bg-neutral-50 px-3 pb-10 pt-[90px] md:px-5 md:pb-14 lg:px-6">
        <div className="mx-auto w-full rounded-[28px] bg-neutral-950 md:rounded-[36px]">
          <div className="mx-auto w-full max-w-7xl px-6 py-20 md:px-12 md:py-28 lg:py-32">
            <Bar className="h-3 w-24 bg-white/10" />
            <Bar className="mt-10 h-12 w-[85%] max-w-3xl bg-white/15 md:h-16" />
            <Bar className="mt-4 h-12 w-[55%] max-w-xl bg-white/15 md:h-16" />
            <Bar className="mt-10 h-4 w-[90%] max-w-2xl bg-white/10" />
            <Bar className="mt-3 h-4 w-[70%] max-w-xl bg-white/10" />
            <Bar className="mt-12 h-12 w-56 bg-white/20" />
          </div>
        </div>
      </section>

      {[0, 1].map((i) => (
        <section key={i} className={`${i === 0 ? 'bg-neutral-100' : 'bg-neutral-50'} py-20 md:py-28`}>
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
            <div>
              <Bar className="h-10 w-[80%] bg-neutral-200 md:h-12" />
              <Bar className="mt-3 h-10 w-[50%] bg-neutral-200 md:h-12" />
            </div>
            <div className="space-y-4">
              <Bar className="h-4 w-full bg-neutral-200" />
              <Bar className="h-4 w-[95%] bg-neutral-200" />
              <Bar className="h-4 w-[88%] bg-neutral-200" />
              <Bar className="h-4 w-[60%] bg-neutral-200" />
              <div className="pt-6" />
              <Bar className="h-4 w-full bg-neutral-200" />
              <Bar className="h-4 w-[80%] bg-neutral-200" />
            </div>
          </div>
        </section>
      ))}
      <span className="sr-only">Loading</span>
    </div>
  );
}
