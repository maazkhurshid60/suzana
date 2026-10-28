// Three ways to build the site, set with NEXT_PUBLIC_SITE_MODE:
//   review   (default) every copy-document flag shown inline, for working through the open items
//   preview  clean, for showing the client: flags hidden, but projects still awaiting permission and
//            placeholder photos are shown so the pages look finished
//   public   the launch build: only approved content, no placeholders
// The older NEXT_PUBLIC_REVIEW_MODE=false still means public.
type SiteMode = 'review' | 'preview' | 'public';

function readMode(): SiteMode {
  const mode = process.env.NEXT_PUBLIC_SITE_MODE;
  if (mode === 'review' || mode === 'preview' || mode === 'public') return mode;
  return process.env.NEXT_PUBLIC_REVIEW_MODE === 'false' ? 'public' : 'review';
}

export const SITE_MODE = readMode();

/** Copy-document flags, unanswered questions and empty photo slots are visible. */
export const REVIEW_MODE = SITE_MODE === 'review';

/** Content still awaiting approval (permission, placeholder photos) is shown. Never true in public. */
export const SHOW_UNAPPROVED = SITE_MODE !== 'public';

/** Only the public build may be indexed by search engines. */
export const INDEXABLE = SITE_MODE === 'public';

/** Named projects and testimonials reach the public site only with written permission on file. */
export const isPublishable = (item: { permissionOnFile: boolean }) => SHOW_UNAPPROVED || item.permissionOnFile;

/** A photo is shown if it is real, or if it is a placeholder and this is not the public build. */
export const hasPhoto = (slot?: { src?: string; placeholder?: boolean }) =>
  Boolean(slot?.src && (!slot.placeholder || SHOW_UNAPPROVED));
