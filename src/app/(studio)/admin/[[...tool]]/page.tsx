import { NextStudio } from 'next-sanity/studio';
import { isSanityConfigured } from '@/sanity/env';
import config from '../../../../../sanity.config';
import { SetupSteps } from './SetupSteps';

export const dynamic = 'force-static';

export { viewport } from 'next-sanity/studio';

export default function AdminPage() {
  if (!isSanityConfigured) return <SetupSteps />;
  return <NextStudio config={config} />;
}
