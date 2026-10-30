'use client';

// A red box at the top of every document listing what stops Publish, which tab it is on, and a link to the field.
// Sanity only marks the field itself, which is easy to miss when it sits on another tab.
import { Box, Button, Card, Flex, Stack, Text } from '@sanity/ui';
import { CircleAlert } from 'lucide-react';
import {
  getPublishedId,
  useValidationStatus,
  type InputProps,
  type ObjectInputProps,
  type ObjectSchemaType,
  type Path,
  type SchemaType,
  type ValidationMarker,
} from 'sanity';

type Located = { marker: ValidationMarker; label: string; tab?: string };

const titleOf = (type: SchemaType | undefined, fallback: string) => type?.title || fallback;

/** Turns a path like meta.title into "Search engine listing › Title", and finds the tab it sits on. */
function locate(root: ObjectSchemaType, value: unknown, marker: ValidationMarker): Located {
  const labels: string[] = [];
  let type: SchemaType | undefined = root;
  let current: unknown = value;
  let tab: string | undefined;

  marker.path.forEach((segment, i) => {
    if (!type) return;
    if (typeof segment === 'string' && type.jsonType === 'object') {
      const field = (type as ObjectSchemaType).fields.find((f) => f.name === segment);
      if (i === 0) {
        const group = (field as { group?: string | string[] } | undefined)?.group;
        const name = Array.isArray(group) ? group[0] : group;
        tab = root.groups?.find((g) => g.name === name)?.title;
      }
      labels.push(titleOf(field?.type, segment));
      type = field?.type;
      current = (current as Record<string, unknown> | undefined)?.[segment];
    } else if (type.jsonType === 'array') {
      const items = Array.isArray(current) ? current : [];
      const item =
        typeof segment === 'number'
          ? items[segment]
          : items.find((it) => typeof segment === 'object' && segment && '_key' in segment && it?._key === segment._key);
      const of = (type as { of?: SchemaType[] }).of ?? [];
      type = of.length === 1 ? of[0] : of.find((t) => t.name === item?._type);
      const position = items.indexOf(item);
      labels.push(position >= 0 ? `${titleOf(type, 'Item')} ${position + 1}` : titleOf(type, 'Item'));
      current = item;
    }
  });

  return { marker, label: labels.join(' › ') || 'This page', tab };
}

function Blockers(props: ObjectInputProps & { documentId: string }) {
  const { documentId, schemaType, value, onPathFocus } = props;
  const { validation } = useValidationStatus(getPublishedId(documentId), schemaType.name, false);
  const errors = validation.filter((m) => m.level === 'error').map((m) => locate(schemaType, value, m));

  if (!errors.length) return null;
  return (
    <Card tone="critical" padding={4} radius={3} border marginBottom={5}>
      <Stack gap={4}>
        <Flex gap={3} align="center">
          <CircleAlert size={18} strokeWidth={1.75} />
          <Text size={2} weight="semibold">
            {errors.length === 1 ? '1 thing to fix before you can publish' : `${errors.length} things to fix before you can publish`}
          </Text>
        </Flex>
        <Stack gap={3}>
          {errors.map(({ marker, label, tab }, i) => (
            <Flex key={i} gap={3} align="center" justify="space-between" wrap="wrap">
              <Box flex={1} style={{ minWidth: 220 }}>
                <Stack gap={2}>
                  <Text size={1} weight="semibold">
                    {tab ? `${tab} tab › ` : ''}
                    {label}
                  </Text>
                  <Text size={1} muted>
                    {marker.message}
                  </Text>
                </Stack>
              </Box>
              <Button text="Go to field" mode="ghost" tone="critical" fontSize={1} onClick={() => onPathFocus(marker.path as Path)} />
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}

/** Wraps the top level of every document form; nested inputs render unchanged. */
export function DocumentInput(props: InputProps) {
  const documentId = (props.value as { _id?: string } | undefined)?._id;
  if (props.id !== 'root' || props.schemaType.jsonType !== 'object' || !documentId) return props.renderDefault(props);
  return (
    <>
      <Blockers {...(props as ObjectInputProps)} documentId={documentId} />
      {props.renderDefault(props)}
    </>
  );
}
