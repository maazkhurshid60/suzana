// The copy document's house style, checked as editors type. Shown as a warning on the field, the
// same rules scripts/check-copy.mjs enforces on the built site.
import type { StringRule, TextRule } from 'sanity';

const rules: [RegExp, string][] = [
  [/—/, 'an em dash (use a full stop or a comma)'],
  [/;/, 'a semicolon'],
  [/!/, 'an exclamation point'],
  [/\bluxury\b/i, 'the word "luxury" (allowed only in page addresses and search listings)'],
  [/\$\s?\d/, 'a price (no pricing appears anywhere)'],
  [/\b(since|founded in|established in)\s+(19|20)\d{2}\b/i, 'a founding year (not confirmed yet)'],
];

export function checkCopy(value: unknown): true | string {
  if (typeof value !== 'string' || !value) return true;
  const found = rules.filter(([re]) => re.test(value)).map(([, label]) => label);
  return found.length ? `House style: remove ${found.join(', ')}.` : true;
}

/** Adds the house-style warning to a string or text field's validation. */
export const houseStyle = <R extends StringRule | TextRule>(rule: R) => rule.custom(checkCopy).warning();
