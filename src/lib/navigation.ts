import type { Link, MenuItem } from '@/content/types';

export type Crumb = { label: string; href?: string };

/** The menu dropdown a page belongs to, if any, so breadcrumbs and related links follow the dashboard menu. */
export function findMenuGroup(menu: MenuItem[], path: string) {
  const group = menu.find((item) => item.links?.some((l) => l.href === path));
  if (!group?.links) return null;
  return { label: group.label, current: group.links.find((l) => l.href === path)!, siblings: group.links.filter((l) => l.href !== path) };
}

/** Home / Services / Custom Cabinetry, or Home / page title for pages outside the menu. */
export function breadcrumbs(menu: MenuItem[], path: string, title: string, eyebrow?: string): Crumb[] {
  const group = findMenuGroup(menu, path);
  if (group) return [{ label: 'Home', href: '/' }, { label: group.label }, { label: group.current.label, href: path }];
  return [{ label: 'Home', href: '/' }, ...(eyebrow ? [{ label: eyebrow }] : []), { label: title, href: path }];
}

/** Search engines get only the crumbs that are real pages. */
export function breadcrumbJsonLd(crumbs: Crumb[], siteUrl: string) {
  const items = crumbs.filter((c): c is Crumb & Link => Boolean(c.href));
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: new URL(c.href, siteUrl).toString() })),
  };
}
