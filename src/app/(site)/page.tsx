import { notFound } from 'next/navigation';
import { ContentPage } from '@/components/ContentPage';
import { getPage } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export async function generateMetadata() {
  const page = await getPage('/');
  return page ? pageMetadata({ ...page, absoluteTitle: true }) : {};
}

export default async function HomePage() {
  const page = await getPage('/');
  if (!page) notFound();
  return <ContentPage page={page} variant="home" />;
}
