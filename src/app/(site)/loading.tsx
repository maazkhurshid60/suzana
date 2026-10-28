import { PageSkeleton } from '@/components/PageSkeleton';

// Shown while the server renders a page, for example a page newly added in the dashboard.
export default function Loading() {
  return <PageSkeleton />;
}
