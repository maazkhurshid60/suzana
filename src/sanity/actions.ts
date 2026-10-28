import type { DocumentActionComponent } from 'sanity';
import { ExternalLink } from 'lucide-react';

/**
 * "Open on site" for pages and the contact page. Opens the published page in a new tab.
 * Publishing refreshes the site within seconds when the webhook is set up, otherwise within the hour.
 */
export const openOnSite: DocumentActionComponent = (props) => {
  const doc = (props.published ?? props.draft) as { path?: string } | null;
  const path = props.type === 'contactPage' ? '/contact/' : doc?.path;
  return {
    label: 'Open on site',
    icon: ExternalLink,
    disabled: !path || !props.published,
    title: props.published ? 'Opens the published page in a new tab' : 'Publish the page first',
    onHandle: () => {
      if (path) window.open(path, '_blank', 'noopener');
      props.onComplete();
    },
  };
};
