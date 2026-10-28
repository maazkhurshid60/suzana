'use client';

// The editing dashboard, served by the site itself at /admin.
import { createElement } from 'react';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { openOnSite } from './src/sanity/actions';
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { schemaTypes, singletons } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

const StudioLogo = () =>
  createElement('img', { src: '/media/logo.webp', alt: '', style: { height: '100%', width: 'auto', objectFit: 'contain' } });

export default defineConfig({
  name: 'gar-rector',
  title: 'Gar Rector & Associates',
  icon: StudioLogo,
  basePath: '/admin',
  projectId: projectId || 'not-configured',
  dataset,
  apiVersion,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // Business details, Header and footer, and the Contact page exist once, so "New document" leaves them out.
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) => {
      const kept = singletons.includes(schemaType)
        ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions;
      return schemaType === 'page' || schemaType === 'contactPage' ? [...kept, openOnSite] : kept;
    },
  },
});
