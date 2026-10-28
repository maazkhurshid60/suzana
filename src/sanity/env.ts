// Sanity connection settings. Until NEXT_PUBLIC_SANITY_PROJECT_ID is set, the site runs
// from the local content files in src/content and /admin shows setup steps instead of the dashboard.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
export const apiVersion = '2025-10-01';

export const isSanityConfigured = /^[a-z0-9-]+$/.test(projectId);
