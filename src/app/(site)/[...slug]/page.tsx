import { notFound } from 'next/navigation';
import { ContentPage } from '@/components/ContentPage';
import { getPage, getPagePaths } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

// Every page except the homepage and Contact. Pages added in the dashboard work without new code:
// they render on first visit and are cached, and publishing refreshes them through the webhook.
type Props = { params: Promise<{ slug: string[] }> };

const toPath = (slug: string[]) => `/${slug.join('/')}/`;

export async function generateStaticParams() {
  return (await getPagePaths())
    .filter((path) => path !== '/')
    .map((path) => ({ slug: path.split('/').filter(Boolean) }));
}

export async function generateMetadata({ params }: Props) {
  const page = await getPage(toPath((await params).slug));
  return page ? pageMetadata(page) : {};
}

export default async function Page({ params }: Props) {
  const page = await getPage(toPath((await params).slug));
  if (!page) notFound();
  return <ContentPage page={page} />;
}
