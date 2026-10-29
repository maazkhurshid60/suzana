'use client';

// The dashboard's front page: a welcome, what needs doing, and shortcuts to the things editors change most.
import { useEffect, useState, type ComponentType } from 'react';
import { Box, Button, Card, Flex, Grid, Heading, Inline, Stack, Text } from '@sanity/ui';
import { useClient, useCurrentUser, type Tool } from 'sanity';
import { useRouter } from 'sanity/router';
import {
  ArrowUpRight,
  Building2,
  CircleAlert,
  FileText,
  Hammer,
  House,
  Mail,
  MessageSquareQuote,
  PanelsTopLeft,
} from 'lucide-react';
import { apiVersion } from './env';
import { PAGE_HAS_NOTES } from './structure';

type Counts = { pages: number; projects: number; testimonials: number; unapproved: number; pagesWithNotes: number };

const COUNTS = `{
  "pages": count(*[_type == "page" && !(_id in path("drafts.**"))]),
  "projects": count(*[_type == "project" && !(_id in path("drafts.**"))]),
  "testimonials": count(*[_type == "testimonial" && !(_id in path("drafts.**"))]),
  "unapproved": count(*[_type in ["project", "testimonial"] && !(_id in path("drafts.**")) && permissionOnFile != true]),
  "pagesWithNotes": count(*[${PAGE_HAS_NOTES} && !(_id in path("drafts.**"))])
}`;

const shortcuts: { title: string; text: string; path: string; icon: ComponentType<{ size?: number; strokeWidth?: number }> }[] = [
  { title: 'Pages', text: 'Headings, text, sections and questions on every page.', path: 'pages', icon: FileText },
  { title: 'Projects', text: 'Add a build, its photo and summary, and tick permission.', path: 'projects', icon: Hammer },
  { title: 'Testimonials', text: 'Client quotes, shown once permission is on file.', path: 'testimonials', icon: MessageSquareQuote },
  { title: 'Contact page', text: 'Contact wording and the project-stage choices.', path: 'contact-page', icon: Mail },
  { title: 'Header and footer', text: 'Menu, buttons, logo, homepage film and footer links.', path: 'header-and-footer', icon: PanelsTopLeft },
  { title: 'Business details', text: 'Phone, address, hours and licence, used site-wide.', path: 'business-details', icon: Building2 },
];

function greeting() {
  const hour = new Date().getHours();
  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
}

function Stat({ label, value, tone = 'default', onClick }: { label: string; value?: number; tone?: 'default' | 'caution'; onClick?: () => void }) {
  return (
    <Card padding={4} radius={3} shadow={1} tone={tone} as={onClick ? 'button' : 'div'} onClick={onClick} style={{ textAlign: 'left', cursor: onClick ? 'pointer' : 'default' }}>
      <Stack gap={3}>
        <Text size={1} muted weight="medium">
          {label}
        </Text>
        <Heading size={4} as="p">
          {value ?? '–'}
        </Heading>
      </Stack>
    </Card>
  );
}

function HomeScreen() {
  const client = useClient({ apiVersion });
  const user = useCurrentUser();
  const router = useRouter();
  const [counts, setCounts] = useState<Counts>();

  useEffect(() => {
    client.fetch<Counts>(COUNTS).then(setCounts).catch(() => undefined);
  }, [client]);

  const go = (path: string) => router.navigateUrl({ path: `/admin/structure/${path}` });
  const firstName = user?.name?.split(' ')[0];
  const attention = counts ? counts.unapproved + counts.pagesWithNotes : undefined;

  return (
    <Box padding={[4, 5, 6]} style={{ maxWidth: 1080, margin: '0 auto', width: '100%' }}>
      <Stack gap={6}>
        <Card padding={[5, 5, 6]} radius={4} tone="primary" shadow={1}>
          <Flex direction={['column', 'column', 'row']} gap={5} align={['flex-start', 'flex-start', 'center']} justify="space-between">
            <Stack gap={4}>
              <Text size={1} weight="semibold" style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                Gar Rector &amp; Associates
              </Text>
              <Heading size={[3, 4, 5]} as="h1" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400 }}>
                {greeting()}
                {firstName ? `, ${firstName}` : ''}
              </Heading>
              <Text size={2} muted>
                Everything a visitor reads on the website is edited here. Change it, press Publish, and it goes live.
              </Text>
            </Stack>
            <Button
              as="a"
              href="/"
              target="_blank"
              rel="noreferrer"
              text="View website"
              iconRight={ArrowUpRight}
              tone="primary"
              mode="default"
              padding={4}
              fontSize={2}
            />
          </Flex>
        </Card>

        <Grid gridTemplateColumns={[2, 2, 4]} gap={4}>
          <Stat label="Pages" value={counts?.pages} onClick={() => go('pages')} />
          <Stat label="Projects" value={counts?.projects} onClick={() => go('projects')} />
          <Stat label="Testimonials" value={counts?.testimonials} onClick={() => go('testimonials')} />
          <Stat label="Needs attention" value={attention} tone={attention ? 'caution' : 'default'} onClick={() => go('needs-attention')} />
        </Grid>

        <Stack gap={4}>
          <Heading size={1} as="h2" muted>
            Edit the website
          </Heading>
          <Grid gridTemplateColumns={[1, 2, 3]} gap={4}>
            {shortcuts.map(({ title, text, path, icon: Icon }) => (
              <Card key={path} as="button" padding={4} radius={3} shadow={1} onClick={() => go(path)} style={{ textAlign: 'left', cursor: 'pointer' }}>
                <Flex gap={4} align="flex-start">
                  <Card padding={3} radius={2} tone="primary" style={{ flexShrink: 0, display: 'flex' }}>
                    <Icon size={20} strokeWidth={1.75} />
                  </Card>
                  <Stack gap={3} flex={1}>
                    <Text size={2} weight="semibold">
                      {title}
                    </Text>
                    <Text size={1} muted>
                      {text}
                    </Text>
                  </Stack>
                </Flex>
              </Card>
            ))}
          </Grid>
        </Stack>

        <Card padding={5} radius={3} border>
          <Stack gap={4}>
            <Inline gap={2}>
              <CircleAlert size={16} strokeWidth={1.75} />
              <Text size={2} weight="semibold">
                Good to know
              </Text>
            </Inline>
            <Stack gap={3}>
              <Text size={1} muted>
                Nothing changes on the website until you press Publish. Until then your edits are a private draft.
              </Text>
              <Text size={1} muted>
                Projects and testimonials only appear on the public site once &ldquo;Written permission on file&rdquo; is ticked.
              </Text>
              <Text size={1} muted>
                A yellow warning on a field means the wording breaks the house style. Fix it before publishing.
              </Text>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

export const homeTool: Tool = {
  name: 'home',
  title: 'Home',
  icon: House,
  component: HomeScreen,
};
