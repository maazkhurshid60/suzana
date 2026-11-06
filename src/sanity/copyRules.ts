// The copy document's house style, checked as editors type. Shown as a warning on the field, the
// same rules scripts/check-copy.mjs enforces on the built site. The November 2026 copy confirms the
// 1991 founding year and uses semicolons, so neither is flagged any more.
import type { StringRule, TextRule } from 'sanity';

const rules: [RegExp, string][] = [
  [/—/, 'an em dash (use a full stop or a comma)'],
  [/!/, 'an exclamation point'],
  [/\bluxury\b(?! home remodeling)/i, 'the word "luxury" (allowed only in the service name, Luxury Home Remodeling)'],
  [/\$\s?\d/, 'a price (no pricing appears anywhere)'],
];

export function checkCopy(value: unknown): true | string {
  if (typeof value !== 'string' || !value) return true;
  const found = rules.filter(([re]) => re.test(value)).map(([, label]) => label);
  return found.length ? `House style: remove ${found.join(', ')}.` : true;
}

/** Adds the house-style warning to a string or text field's validation. */
export const houseStyle = <R extends StringRule | TextRule>(rule: R) => rule.custom(checkCopy).warning();
