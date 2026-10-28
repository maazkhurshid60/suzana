// Used by the Sanity command line (`npx sanity ...`), for example the one-time content import.
// The Sanity CLI does not read Next.js env files, so load .env.local the same way Next.js does.
import { loadEnvConfig } from '@next/env';
import { defineCliConfig } from 'sanity/cli';

loadEnvConfig(process.cwd());

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  },
});
