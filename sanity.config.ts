'use client';

// The editing dashboard, served by the site itself at /admin.
import { createElement } from 'react';
import { buildLegacyTheme, defineConfig, useColorSchemeValue } from 'sanity';
import { structureTool } from 'sanity/structure';
import { openOnSite } from './src/sanity/actions';
import { apiVersion, dataset, projectId } from './src/sanity/env';
import { homeTool } from './src/sanity/HomeTool';
import { DocumentInput } from './src/sanity/PublishBlockers';
import { schemaTypes, singletons } from './src/sanity/schemaTypes';
import { structure } from './src/sanity/structure';

// The logo is a black line drawing, so it is reversed to white on the dark theme.
function StudioLogo() {
  const dark = useColorSchemeValue() === 'dark';
  return createElement('img', {
    src: '/media/logo.webp',
    alt: '',
    style: { height: '100%', width: 'auto', objectFit: 'contain', filter: dark ? 'invert(1)' : undefined },
  });
}

// The site's charcoal and white, with a warm bronze accent taken from timber and millwork.
const theme = buildLegacyTheme({
  '--black': '#161514',
  '--white': '#ffffff',
  '--gray-base': '#161514',
  '--gray': '#77736d',
  '--component-bg': '#ffffff',
  '--component-text-color': '#161514',
  '--brand-primary': '#9a7446',
  '--default-button-color': '#77736d',
  '--default-button-primary-color': '#9a7446',
  '--default-button-success-color': '#4f7a5a',
  '--default-button-warning-color': '#c08a2e',
  '--default-button-danger-color': '#b4473b',
  '--state-info-color': '#9a7446',
  '--state-success-color': '#4f7a5a',
  '--state-warning-color': '#c08a2e',
  '--state-danger-color': '#b4473b',
  '--main-navigation-color': '#161514',
  '--main-navigation-color--inverted': '#ffffff',
  '--focus-color': '#9a7446',
});

export default defineConfig({
  name: 'gar-rector',
  title: 'Gar Rector & Associates',
  icon: StudioLogo,
  theme,
  basePath: '/admin',
  projectId: projectId || 'not-configured',
  dataset,
  apiVersion,
  plugins: [structureTool({ structure })],
  // Home opens first: a welcome, what needs attention, and shortcuts.
  tools: (tools) => [homeTool, ...tools],
  schema: {
    types: schemaTypes,
    // Business details, Header and footer, and the Contact page exist once, so "New document" leaves them out.
    templates: (templates) => templates.filter(({ schemaType }) => !singletons.includes(schemaType)),
  },
  // Lists anything blocking Publish at the top of the form, with the tab it is on.
  form: { components: { input: DocumentInput } },
  document: {
    actions: (actions, { schemaType }) => {
      const kept = singletons.includes(schemaType)
        ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions;
      return schemaType === 'page' || schemaType === 'contactPage' ? [...kept, openOnSite] : kept;
    },
  },
});
